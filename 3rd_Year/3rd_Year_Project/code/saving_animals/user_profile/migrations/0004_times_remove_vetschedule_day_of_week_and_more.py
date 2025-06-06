# Generated by Django 5.0.1 on 2024-02-10 15:41

import django.contrib.gis.db.models.fields
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_userprofile_location'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Times',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.RemoveField(
            model_name='vetschedule',
            name='day_of_week',
        ),
        migrations.RemoveField(
            model_name='vetschedule',
            name='end_time',
        ),
        migrations.RemoveField(
            model_name='vetschedule',
            name='start_time',
        ),
        migrations.RemoveField(
            model_name='vetschedule',
            name='vet',
        ),
        migrations.AlterField(
            model_name='vetschedule',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='OrgProfile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('specialty', models.CharField(default='', max_length=255)),
                ('bio', models.TextField(blank=True)),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='vetschedule',
            name='times',
            field=models.ManyToManyField(to='user_profile.times'),
        ),
    ]
