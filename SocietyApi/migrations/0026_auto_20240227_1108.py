# Generated by Django 3.2.12 on 2024-02-27 11:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SocietyApi', '0025_alter_attendance_meeting_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='suggestion',
            name='meeting',
        ),
        migrations.AddField(
            model_name='suggestion',
            name='flat_id',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.wingflatunique'),
        ),
        migrations.AddField(
            model_name='suggestion',
            name='meeting_id',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.meetings'),
        ),
        migrations.AddField(
            model_name='suggestion',
            name='user_id',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
