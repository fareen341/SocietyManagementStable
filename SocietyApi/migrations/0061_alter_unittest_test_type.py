# Generated by Django 3.2.12 on 2024-04-07 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0060_unittest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unittest',
            name='test_type',
            field=models.CharField(choices=[('bug', 'Bug'), ('add_feature', 'Add Feature')], max_length=200),
        ),
    ]
