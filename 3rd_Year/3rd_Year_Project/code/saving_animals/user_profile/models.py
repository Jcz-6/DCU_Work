from django.db import models
from django.contrib.gis.db import models
from django.contrib.gis.geos import *
from django.contrib.auth.models import User
from datetime import date
# Create your models here.


class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, default='')
    first_name = models.CharField(max_length=255, default='')
    second_name = models.CharField(max_length=255, default='')
    age = models.IntegerField(blank=True, null=True, default=0)
    location = models.PointField(null=True, blank=True)


    def get_latitude(self):
        if self.location:
            return self.location.y
        return None

    def get_longitude(self):
        if self.location:
            return self.location.x
        return None

    def __str__(self):
        return self.first_name


class Time(models.Model):
    id = models.AutoField(primary_key=True)
    time = models.CharField(max_length=60)

    def __str__(self):
        return "{}".format(self.time)


class VetProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="")
    specialty = models.CharField(max_length=255, default='')
    bio = models.TextField(blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    location = models.PointField(null=True, blank=True)

    
    def get_latitude(self):
        if self.location:
            return self.location.y
        return None

    def get_longitude(self):
        if self.location:
            return self.location.x
        return None

    def __str__(self):
        return f'{self.user.username} lat: {self.get_latitude()} lon: {self.get_longitude()} id: {self.id}'

class Report(models.Model):
    id = models.AutoField(primary_key=True)
    species = models.CharField(max_length=255, default='')
    breed = models.CharField(max_length=255, default='')
    location_found = models.PointField(null=True, blank=True)
    reporter = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    description = models.TextField(default='')

    def get_latitude(self):
        if self.location:
            return self.location.y
        return None

    def get_longitude(self):
        if self.location:
            return self.location.x
        return None
    
    def __str__(self):
        return f'{self.species} - {self.location_found}'

class VetSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(default="")
    time = models.ForeignKey(Time, on_delete=models.CASCADE)
    vet_profile = models.ForeignKey(VetProfile, on_delete=models.CASCADE)
    booked = models.BooleanField(default=False)
    report = models.ForeignKey(Report, blank=True, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.date)


class OrgProfile(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="")
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=255, default='')
    bio = models.TextField(blank=True)
    location = models.PointField(null=True, blank=True)
    
    def get_latitude(self):
        if self.location:
            return self.location.y
        return None

    def get_longitude(self):
        if self.location:
            return self.location.x
        return None

    def __str__(self):
        return f'{self.name} lat: {self.get_latitude()} lon: {self.get_longitude()}'
    
class OrgReport(models.Model):
    id = models.AutoField(primary_key=True)
    org = models.ForeignKey(OrgProfile, on_delete=models.CASCADE)
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

