from django.contrib import admin
from .models import ChatChannel, ChannelMessage

# Register your models here.
admin.site.register(ChatChannel)
admin.site.register(ChannelMessage)
