# Generated by Django 3.2.12 on 2024-02-26 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0016_alter_tenantallocation_no_of_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='meetings',
            name='meeting_type',
            field=models.CharField(choices=[('first_general_meeting', 'First General Meeting'), ('annual_general_meeting', 'Annual General Meeting'), ('managing_committee_meeting', 'Managing Committee Meeting'), ('special_general_body_meeting', 'Special General Body Meeting'), ('last_general_meeting', 'Last General Meeting')], default='', max_length=200),
        ),
    ]
