# Generated by Django 3.2 on 2021-04-24 07:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_task_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 24, 13, 26, 41, 595185)),
        ),
    ]