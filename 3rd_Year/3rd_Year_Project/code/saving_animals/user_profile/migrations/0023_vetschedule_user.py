# Generated by Django 5.0.1 on 2024-02-15 13:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0022_vetschedule_booked_vetschedule_report_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vetschedule',
            name='user',
            field=models.ForeignKey(default=15, on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile'),
            preserve_default=False,
        ),
    ]
