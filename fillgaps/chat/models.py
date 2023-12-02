from django.db import models


class ChannelType(models.TextChoices):
    PUBLIC = 'PUBLIC'
    GROUP = 'GROUP'
    PRIVATE = 'PRIVATE'


# Create your models here.
class ChatChannel(models.Model):
    # Options for channel
    channel_name = models.CharField(max_length=50, unique=True)
    open_date = models.DateTimeField(auto_now_add=True)
    # channel_banner = models.CharField(max_length=1000)
    channel_description = models.CharField(max_length=1000)
    chat_type = models.CharField(max_length=30, choices=ChannelType.choices, default=ChannelType.PUBLIC)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.channel_name


class ChannelMessage(models.Model):
    message_content = models.CharField(max_length=1000)
    send_date = models.DateTimeField(auto_now_add=True)
    drop_date = models.DateTimeField(blank=True, null=True)
    document = models.CharField(max_length=1000, blank=True, null=True)
    channel = models.ForeignKey(ChatChannel, on_delete=models.PROTECT)
    sender = models.ForeignKey('common.Employee', on_delete=models.PROTECT)

    def __str__(self):
        return ("[" + str(self.send_date) + "]" + self.sender.user.first_name + ' ' +
                self.sender.user.last_name + ' | ' + self.channel.channel_name)


class ChannelAdmin(models.Model):
    channel = models.ForeignKey(ChatChannel, on_delete=models.PROTECT)
    admin = models.ForeignKey('common.Employee', on_delete=models.PROTECT)

    def __str__(self):
        return self.channel.channel_name + ' - ' + self.admin.user.first_name + ' ' + self.admin.user.last_name


class ChannelEmployee(models.Model):
    channel = models.ForeignKey(ChatChannel, on_delete=models.PROTECT)
    employee = models.ForeignKey('common.Employee', on_delete=models.PROTECT)

    def __str__(self):
        return self.channel.channel_name + ' - ' + self.employee.user.first_name + ' ' + self.employee.user.last_name
