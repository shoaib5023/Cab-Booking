from django.contrib import admin

from .models import User,Driver,Ride 



class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone_number']
admin.site.register(User, UserAdmin)


class DriverAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone_number', 'vehicle_number']
admin.site.register(Driver, DriverAdmin)


class RideAdmin(admin.ModelAdmin):
    list_display = ['user','driver','date_time','ride_type']
admin.site.register(Ride,RideAdmin)