# Generated by Django 3.2.12 on 2024-04-10 07:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApp', '0007_delete_assets'),
    ]

    operations = [
        migrations.AlterField(
            model_name='costcenter',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cost_center', to='SocietyApp.costcenter', verbose_name='cost_center_parent'),
        ),
    ]
