from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=30, unique=True)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Driver(models.Model):
    name = models.CharField(max_length=30, unique=True)
    phone_number = models.CharField(max_length=10)
    vehicle_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name
class Ride(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='user')
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, verbose_name='driver',null=True)
    date_time = models.DateTimeField(auto_now=True)
    ride_choices = [

        ('rq', 'Request'),
        ('ac', 'Accept'),
        ('dn', 'Done'),

    ]
    ride_type = models.CharField(choices=ride_choices, default='Request',max_length=20,
                                 help_text='is can take only one choice at a time')

    def __str__(self):
        return str(self.user)