# Generated by Django 3.2.12 on 2024-03-21 11:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='childs',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='childs',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='SocietyApp.childs', unique=True),
        ),
    ]
