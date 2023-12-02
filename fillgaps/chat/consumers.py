import datetime
import json

from django.core.serializers import serialize
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import ChatChannel, ChannelMessage, ChannelAdmin, ChannelEmployee
import common.models as common_models


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.employee_id = None

    def connect(self):
        # In a success connection
        # 1. Client sends its employee_id
        # 1.1 If employee_id is not valid, refuse the connection
        # 2. Get channels where employee belongs to
        # 3. Connect the employee to general group
        # 4. Connect the employee to every channel group.
        self.employee_id = self.scope["url_route"]["kwargs"]["employee_id"]
        if self.employee_id is None:
            self.send_json({
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "Employee ID is required"
            })
            self.close()
        employee_channels = self.get_channels_for(self.employee_id)
        print(f"Connecting employee {self.employee_id} to channels...")
        self.connect_employee_to_channels(employee_channels)
        async_to_sync(self.channel_layer.group_add)(f"channel_listing", self.channel_name)
        print(f"Employee {self.employee_id} connected in channel: {self.channel_name}")
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data=None, **kwargs):
        # text_data format:
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
        request_type = text_data_json["type"]
        # @TODO: Result debe de ser sustituido por NONE
        if request_type == "SEND_MESSAGE":
            message = text_data_json["message"]
            result = self.send_message(message)
            if not None:
                self.confirm_message_sent(result, message["channel"])
            else:
                self.send_error({
                    "type": "ERROR",
                    "employee_id": self.employee_id,
                    "error": "You are not in this channel"
                })
        elif request_type == "DELETE_MESSAGE":
            message_id = text_data_json["message_id"]
            result = self.delete_message(message_id)
            if None:
                self.confirm_message_deleted(message_id)
            else:
                self.send_error(result)
        elif request_type == "CREATE_CHANNEL":
            channel = text_data_json["channel"]
            employees = text_data_json["employees"]
            employees.append(self.employee_id)
            self.create_channel(channel, employees)
        elif request_type == "UPDATE_CHANNEL":
            channel = text_data_json["channel"]
            result = self.update_channel(channel)
            if result["type"] != "ERROR":
                self.confirm_channel_updated(channel)
            else:
                self.send_error(result)
        elif request_type == "DELETE_CHANNEL":
            channel_id = text_data_json["channel_id"]
            result = self.delete_channel(channel_id)
            if result["type"] != "ERROR":
                self.confirm_channel_deleted(channel_id)
            else:
                self.send_error(result)
        elif request_type == "JOIN_TO_CHANNEL":
            channel_id = text_data_json["channel_id"]
            employee_channel = ChannelEmployee.objects.get(channel_id=channel_id, employee_id=self.employee_id)
            if employee_channel is not None:
                self.connect_employee_to_channel(employee_channel)
                self.confirm_channel_connection(employee_channel, channel_id)
            else:
                self.send_json({
                    "type": "ERROR",
                    "employee_id": self.employee_id,
                    "error": "You are not in this channel"
                })
        elif request_type == "SYNC_MESSAGES":
            self.sync_messages()
        elif request_type == "SYNC_DIRECTORY":
            self.sync_directory()
        elif request_type == "SYNC_CHANNELS":
            self.sync_channels()
        else:
            self.send_json({
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "Invalid request"
            })

    def sync_messages(self):
        employee_channels = self.get_channels_for(self.employee_id)
        messages = []
        for channel in employee_channels:
            message_query = ChannelMessage.objects.filter(channel_id=channel.channel_id)
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
            "employee_id": self.employee_id,
            "messages": messages
        })

    def sync_directory(self):
        directory = self.get_employee_s_directory()
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
            "employee_id": self.employee_id,
            "employees": employees
        })

    def sync_channels(self):
        channels = self.get_channels_for(self.employee_id)
        channels_list = []
        for channel in channels:
            channels_list.append({
                "channel_id": channel.channel.id,
                "channel_name": channel.channel.channel_name,
                "description": channel.channel.channel_description,
                "channel_type": channel.channel.chat_type
            })
        self.send_json({
            "type": "CHANNELS",
            "employee_id": self.employee_id,
            "channels": channels_list
        })

    def send_message(self, message):
        # Validate message, if valid, send to channel
        # sender must be in channel
        print(message)
        if ChannelEmployee.objects.filter(channel_id=message["channel"],
                                          employee_id=message["sender"]).exists():
            embed_channel = ChatChannel.objects.get(id=message["channel"])
            sender = common_models.Employee.objects.get(id=message["sender"])
            to_confirm = ChannelMessage.objects.create(message_content=message["content"],
                                                       channel=embed_channel,
                                                       sender=sender)
            return to_confirm
        else:
            return None

    def delete_message(self, message_id):
        message = ChannelMessage.objects.get(id=message_id)
        if message.sender.id == self.employee_id or self.can_change_channel(message.channel):
            message.drop_date = datetime.datetime.now()
            message.status = False
            message.save()
            return message_id
        else:
            return {
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "You are not allowed to delete this message"
            }

    def create_channel(self, employees, channel):
        print(channel)
        if ChatChannel.objects.filter(channel_name=channel["channel_name"]).exists():
            self.send_json({
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "Channel already exists"
            })
        if not self.am_i_manager():
            if self.get_channel_for_employee(employees) is not None:
                return {
                    "type": "ERROR",
                    "employee_id": self.employee_id,
                    "error": "You are not allowed to create a channel with this employee"
                }
            embed_channel = ChatChannel.objects.create(channel_name=channel["channel_name"],
                                                       channel_description=channel["description"],
                                                       chat_type=channel["channel_type"])
            ChannelEmployee.objects.create(channel=embed_channel,
                                           employee=common_models.Employee.objects.get(id=self.employee_id))
            ChannelEmployee.objects.create(channel=embed_channel,
                                           employee=common_models.Employee.objects.get(id=employees))
            return embed_channel
        else:
            embed_channel = ChatChannel.objects.create(channel_name=channel["channel_name"],
                                                       channel_description=channel["description"],
                                                       chat_type=channel["channel_type"])
            ChannelAdmin.objects.create(channel=embed_channel,
                                        admin=common_models.Employee.objects.get(id=self.employee_id))
            for employee in employees:
                print(employee)
                ChannelEmployee.objects.create(channel=embed_channel,
                                               employee=common_models.Employee.objects.get(id=employee))
            return embed_channel

    def update_channel(self, channel_data):
        if not self.can_change_channel(channel_data["channel_id"]):
            return {
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "You are not admin of this channel"
            }
        channel = ChatChannel.objects.get(id=channel_data["channel_id"])
        channel.channel_name = channel_data["channel_name"]
        channel.channel_description = channel_data["description"]
        channel.chat_type = channel_data["channel_type"]
        for employee in channel_data["employees"]:
            if not ChannelEmployee.objects.filter(channel=channel, employee=employee).exists():
                ChannelEmployee.objects.create(channel=channel, employee=employee)
        channel.save()
        return channel

    def delete_channel(self, channel_id):
        if not self.can_change_channel(channel_id):
            return {
                "type": "ERROR",
                "employee_id": self.employee_id,
                "error": "You are not admin of this channel"
            }
        channel = ChatChannel.objects.get(id=channel_id)
        channel.status = False
        channel.save()
        return channel

    def confirm_message_sent(self, to_confirm, channel_id):
        channel_name = ChatChannel.objects.get(id=channel_id).channel_name
        print(f"{channel_id}_{channel_name}")
        print(self.channel_layer)
        async_to_sync(self.channel_layer.group_send)(f"{channel_id}_{channel_name.replace(' ', '_')}", {
            "type": "chat.message",
            "data": {
                "type": "MESSAGE_SENT",
                "employee_id": self.employee_id,
                "message_id": to_confirm.id,
                "content": to_confirm.message_content,
                "sender": to_confirm.sender.id,
                "channel": to_confirm.channel.channel_name,
                "date": to_confirm.send_date.timestamp()
            }
        })

    # Send a message to user (message is not a chat app message)
    def chat_message(self, event):
        data = event["data"]
        print(data)
        self.send_json(data)

    def confirm_message_deleted(self, message_id):
        async_to_sync(self.channel_layer.group_send)(f"channel_listing", {
            "type": "chat.message",
            "data": {
                "type": "MESSAGE_DELETED",
                "message_id": message_id
            }
        })

    def confirm_channel_created(self, channel):
        channel_id = ChatChannel.objects.get(channel_name=channel["channel_name"]).id
        print(self.channel_layer)
        async_to_sync(self.channel_layer.group_send)(f"channel_listing", {
            "type": "chat.message",
            "data": {
                "type": "CHANNEL_CREATED",
                "channel_id": channel_id,
                "channel_name": channel["channel_name"],
                "description": channel["description"],
                "channel_type": channel["channel_type"]
            }
        })

    def confirm_channel_updated(self, channel):
        async_to_sync(self.channel_layer.group_send)(f"channel_listing", {
            "type": "chat.message",
            "data": {
                "type": "CHANNEL_UPDATED",
                "channel_id": channel["channel_id"],
                "channel_name": channel["channel_name"],
                "description": channel["description"],
                "channel_type": channel["channel_type"]
            }
        })

    def confirm_channel_deleted(self, channel_id):
        async_to_sync(self.channel_layer.group_send)(f"channel_listing", {
            "type": "chat.message",
            "data": {
                "type": "CHANNEL_DELETED",
                "channel_id": channel_id
            }
        })

    def can_change_channel(self, channel):
        return ChannelAdmin.objects.filter(channel=channel, admin_id=self.employee_id).exists()

    def get_channel_for_employee(self, with_employee):
        channels = ChannelEmployee.objects.filter(employee_id=self.employee_id)
        for channel in channels:
            if ChannelEmployee.objects.filter(channel=channel, employee_id=with_employee).exists():
                return channel
        return None

    def is_one_to_one_channel(self, channel):
        if ChannelEmployee.objects.filter(channel=channel, employee_id=self.employee_id).exists():
            return ChannelEmployee.objects.filter(channel_id=channel.channel_id).count() == 2
        return False

    def am_i_manager(self):
        return common_models.Employee.objects.get(id=self.employee_id).role.contains("Manager")

    @staticmethod
    def get_channels_for(employee_id):
        channels = ChannelEmployee.objects.filter(employee_id=employee_id)
        return channels

    @staticmethod
    def get_messages_for(employee_id):
        messages = ChannelMessage.objects.filter(channel__in=ChannelEmployee.objects.filter(employee_id=employee_id))
        return messages

    def connect_employee_to_channel(self, channel_employee):
        print(
            f"Employee {self.employee_id} in {channel_employee.channel.id}_{channel_employee.channel.channel_name} channel")
        async_to_sync(self.channel_layer.group_add)(
            f"{channel_employee.channel.id}_{channel_employee.channel.channel_name.replace(' ', '_')}",
            self.channel_name)

    def connect_employee_to_channels(self, employee_channels):
        for channel in employee_channels:
            self.connect_employee_to_channel(channel)

    @staticmethod
    def get_employee_s_directory():
        employees = common_models.Employee.objects.all()
        return employees

    @staticmethod
    def serialize(data):
        to_serialize = serialize("json", list(data))
        return json.loads(to_serialize)

    def confirm_channel_connection(self, employee_channel, channel_id):
        channel = employee_channel.channel
        self.send_json({
            "type": "CHANNEL_JOINED",
            "employee_id": self.employee_id,
            "channel_id": channel_id,
            "channel_name": channel.channel_name,
            "description": channel.channel_description,
            "channel_type": channel.chat_type
        })

    def send_to_group(self, group_name, data):
        async_to_sync(self.channel_layer.group_send)(group_name, {
            "type": "chat.message",
            "data": data
        })

    def send_error(self, error):
        self.send_json(error)
