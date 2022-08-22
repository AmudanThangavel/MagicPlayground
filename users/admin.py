from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
# Register your models here.

from .models import user_info, chapter_info, code_submit



class user_info_extend(admin.StackedInline):
    model = user_info
    can_delete: False
    verbose_name_plural = 'User Details'


class CustomizeUserAdmin(UserAdmin):
    inlines = (user_info_extend,)


admin.site.unregister(User)
admin.site.register(User, CustomizeUserAdmin)
admin.site.register(user_info)
admin.site.register(chapter_info)
admin.site.register(code_submit)