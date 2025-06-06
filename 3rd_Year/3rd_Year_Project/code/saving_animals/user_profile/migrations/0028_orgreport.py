# Generated by Django 5.0.1 on 2024-02-15 15:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0027_orgprofile_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrgReport',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('org', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.orgprofile')),
                ('report', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.report')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile')),
            ],
        ),
    ]
