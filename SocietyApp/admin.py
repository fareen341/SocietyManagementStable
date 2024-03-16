from django.contrib import admin
from .models import *

# Register your models here.
class AssetsAdmin(admin.ModelAdmin):
    list_display=['asset_name','written_by']

admin.site.register(Assets, AssetsAdmin)
admin.site.register(Childs)