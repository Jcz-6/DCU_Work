# Generated by Django 5.0.1 on 2024-02-13 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0013_alter_vetschedule_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vetschedule',
            name='date',
            field=models.DateField(default=''),
        ),
    ]
