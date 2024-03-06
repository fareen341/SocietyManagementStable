# Generated by Django 3.2.12 on 2024-02-25 09:14

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0013_househelp_househelpallocationmaster_tenantallocation_tenantmaster'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meetings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_meeting', models.DateField(blank=True, null=True)),
                ('time_of_meeting', models.CharField(blank=True, max_length=200, null=True)),
                ('place_of_meeting', models.CharField(blank=True, max_length=200, null=True)),
                ('agenda', models.FileField(blank=True, null=True, upload_to='files/')),
                ('financials', models.FileField(blank=True, null=True, upload_to='files/')),
                ('other', models.FileField(blank=True, null=True, upload_to='files/')),
                ('content', ckeditor_uploader.fields.RichTextUploadingField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suggestions', models.TextField()),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.meetings')),
            ],
        ),
    ]