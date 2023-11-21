import json

from django.core.serializers import serialize
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import sync_to_async, async_to_sync
from channels.db import database_sync_to_async
from .models import ChatChannel, ChannelMessage, ChannelAdmin, ChannelEmployee
from common.models import Employee


class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        # In a success connection
        # 1. Client sends its employee_id
        # 1.1 If employee_id is not valid, refuse the connection
        # 2. Get channels where employee belongs to
        # 3. Connect employee to general group
        # 4. Connect employee to every channel group      
        employee_id = self.scope["url_route"]["kwargs"]["employee_id"]
        employee_channels = self.get_channels_for(employee_id)
        messages_for = self.connect_employee_to_channels(employee_channels)
        async_to_sync(self.channel_layer.group_add)(f"channel_listing", self.channel_name)
        directory = self.get_employee_s_directory()
        print(self.channel_name)
        self.accept()
        channels = []
        for channel in employee_channels:
            channels.append({
                "channel_id": channel.channel.id,
                "channel_name": channel.channel.channel_name,
                "description": channel.channel.channel_description,
                "channel_type": channel.channel.chat_type
            })
        self.send_json({
            "type": "CHANNELS",
            "employee_id": employee_id,
            "channels": channels
        })
        messages = []
        for message_query in messages_for:
            for message in message_query:
                messages.append({
                    "message_id": message.id,
                    "content": message.message_content,
                    "sender": message.sender.id,
                    "channel": message.channel.channel_name,
                    "date": message.send_date.timestamp()
                })
        self.send_json({
            "type": "MESSAGES",
            "employee_id": employee_id,
            "messages": messages
        })
        employees = []
        for employee in directory:
            employees.append({
                "employee_id": employee.id,
                "name": employee.user.first_name + ' ' + employee.user.last_name,
                "email": employee.user.email,
                "role": employee.role,
                "department": employee.department,
                "photo_link": employee.photo_link
            })
        self.send_json({
            "type": "DIRECTORY",
            "employee_id": employee_id,
            "employees": employees
        })

    def disconnect(self, close_code):
        pass

    def receive(self, text_data=None, **kwargs):
        # Basic format:
        # - employee_id
        # - type
        # Allowed types
        # - SEND_MESSAGE
        # - DELETE_MESSAGE
        # - CREATE_CHANNEL
        # - UPDATE_CHANNEL
        # - DELETE_CHANNEL
        # - JOIN_TO_CHANNEL
        # - SYNC_MESSAGES
        # - SYNC_DIRECTORY
        # - SYNC_CHANNELS
        text_data_json = json.loads(text_data)
        type = text_data_json["type"]
        self.employee_id = text_data_json["employee_id"]
        if (type == "SEND_MESSAGE"):
            # 1. Receive SEND_MESSAGE instruction
            # 2. Verify if source (employee) belongs to the channel
            # 2.1 If source does not belong, return error_denied
            # 3. Update database
            # 4. Propagate the message throughout channel group
            self.message = text_data_json["message"]
            self.send_message()
        elif (type == "DELETE_MESSAGE"):
            # 1. Verify if source (employee) belong to the channel and the message_id
            # 2. Verify if source (employee) is the sender of the message_id
            # 3. Update database
            # 4. Propagate the state throughout channel group
            self.message_id = text_data_json["message_id"]
            self.delete_message()
        elif (type == "CREATE_CHANNEL"):
            # 1. Verify source type (employee role)
            # 1.1 If employee role is manager, employee list is allowed
            # 2. Verify if channel does exist
            # 3. If channel is 1 to 1, verify if members are related in the channel
            # 4. Verify if members can join to channel
            # 5. Update database
            # 6. Propagate the state throughout general group
            self.channel = text_data_json["channel"]
            self.employees = text_data_json["employees"]
            self.employees.append(self.employee_id)
            self.create_channel()
        elif (type == "UPDATE_CHANNEL"):
            # 1. Verify source type(employee role)
            # 1.1 If employee role is not manager, refuse request
            # 2. Verify if employee is owner of the channel
            # 3. Update database
            # 4. Propagate the state throughout general group and channel group
            self.channel = text_data_json["channel"]
            self.update_channel()
        elif (type == "DELETE_CHANNEL"):
            # 1. Verify source type(employee role)
            # 1.1 If employee role is not manager, refuse request
            # 2. Verify if employee is owner of the channel
            # 3. Update database
            # 4. Propagate the state throughout general group and channel group
            self.channel_id = text_data_json["channel_id"]
            self.delete_channel()
        elif (type == "JOIN_TO_CHANNEL"):
            # 1. Verify if employee belongs to channel
            # 1.1 Refuse request if employee does not belong to channel
            # 2. Join the employee to the channel group
            self.channel_id = text_data_json["channel_id"]
            employee_channel = ChannelEmployee.objects.get(channel_id=self.channel_id, employee_id=self.employee_id)
            self.connect_employee_to_channel(employee_channel)
        elif (type == "SYNC_MESSAGES"):
            self.employee = text_data_json["employee_id"];
        elif (type == "SYNC_DIRECTORY"):
            self.employee = text_data_json["employee_id"];
        elif (type == "SYNC_CHANNELS":
            self.employee = text_data_json["employee_id"];
        else:
            self.send_json({
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "Invalid request"
            })

    def send_message(self):
        # Validate message, if valid, send to channel
        # sender must be in channel
        print(self.message)
        if ChannelEmployee.objects.filter(channel_id=self.message["channel"],
                                          employee_id=self.message["sender"]).exists():
            embed_channel = ChatChannel.objects.get(id=self.message["channel"])
            sender = Employee.objects.get(id=self.message["sender"])
            self.to_confirm = ChannelMessage.objects.create(message_content=self.message["message_content"],
                                                            channel=embed_channel,
                                                            sender=sender)
            self.confirm_message_sent()
        else:
            self.send_json({
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "You are not in this channel"
            })

    def delete_message(self):
        pass

    def create_channel(self):
        # Employee must be "Manager" role
        # Channel must not exist
        print(self.channel)
        if ChatChannel.objects.filter(channel_name=self.channel["channel_name"]).exists():
            self.send_json({
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "Channel already exists"
            })
        else:
            embed_channel = ChatChannel.objects.create(channel_name=self.channel["channel_name"],
                                                       channel_description=self.channel["description"],
                                                       chat_type=self.channel["channel_type"])
            ChannelAdmin.objects.create(channel=embed_channel,
                                        admin=Employee.objects.get(id=self.employee_id))
            for employee in self.employees:
                print(employee)
                ChannelEmployee.objects.create(channel=embed_channel,
                                               employee=Employee.objects.get(id=employee))
            self.confirm_channel_created()

    def update_channel(self):
        pass

    def delete_channel(self):
        pass

    def confirm_message_sent(self):
        channel_id = self.message["channel"]
        channel_name = ChatChannel.objects.get(id=channel_id).channel_name
        print(f"{channel_id}_{channel_name}")
        print(self.channel_layer)
        async_to_sync(self.channel_layer.group_send)(f"{channel_id}_{channel_name.replace(' ', '_')}", {
            "type": "chat.message",
            "data": {
                "type": "MESSAGE_SENT",
                "message_id": self.to_confirm.id,
                "content": self.to_confirm.message_content,
                "sender": self.to_confirm.sender.id,
                "channel": self.to_confirm.channel.channel_name,
                "date": self.to_confirm.send_date.timestamp()
            }
        })

    # Send a message to user (message is not a chat message)
    def chat_message(self, event):
        data = event["data"]
        print(data)
        self.send_json(data)

    def confirm_message_deleted(self):
        pass

    def confirm_channel_created(self):
        channel_id = ChatChannel.objects.get(channel_name=self.channel["channel_name"]).id
        print(self.channel_layer)
        async_to_sync(self.channel_layer.group_send)(f"channel_listing", {
            "type": "chat.message",
            "data": {
                "type": "CHANNEL_CREATED",
                "channel_id": channel_id,
                "channel_name": self.channel["channel_name"],
                "description": self.channel["description"],
                "channel_type": self.channel["channel_type"]
            }
        })
        initial_msg = ChannelMessage.objects.create(message_content="Welcome to the channel!",
                                                    channel_id=channel_id, sender_id=self.employee_id)
        async_to_sync(self.channel_layer.group_send)(f"{channel_id}_{self.channel['channel_name'].replace(' ', '_')}", {
            "type": "chat.message",
            "data": {
                "type": "MESSAGE_SENT",
                "message_id": initial_msg.id,
                "content": initial_msg.message_content,
                "sender": initial_msg.sender.id,
                "channel": initial_msg.channel.channel_name,
                "date": initial_msg.send_date.timestamp()
            }
        })

    def confirm_channel_updated(self):
        pass

    def confirm_channel_deleted(self):
        pass

    @staticmethod
    def get_channels_for(employee_id):
        channels = ChannelEmployee.objects.filter(employee_id=employee_id)
        return channels

    @staticmethod
    def get_messages_for(channel_employee):
        messages = ChannelMessage.objects.filter(channel_id=channel_employee.channel.id)
        return messages

    def connect_employee_to_channel(self, channel_employee):
        print(f"{channel_employee.channel.id}_{channel_employee.channel.channel_name}")
        async_to_sync(self.channel_layer.group_add)(
            f"{channel_employee.channel.id}_{channel_employee.channel.channel_name.replace(' ', '_')}",
            self.channel_name)

    def connect_employee_to_channels(self, employee_channels):
        messages_for = []
        for channel in employee_channels:
            self.connect_employee_to_channel(channel)
            messages_for.append(ChatConsumer.get_messages_for(channel))
        return messages_for

    @staticmethod
    def get_employee_s_directory():
        employees = Employee.objects.all()
        return employees

    @staticmethod
    def serialize(data):
        to_serialize = serialize("json", list(data))
        return json.loads(to_serialize)
