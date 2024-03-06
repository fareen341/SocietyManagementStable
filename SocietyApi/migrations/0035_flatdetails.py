# Generated by Django 3.2.12 on 2024-03-02 03:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0034_alter_flathomeloan_unique_member_shares'),
    ]

    operations = [
        migrations.CreateModel(
            name='FlatDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_area', models.CharField(max_length=300)),
                ('unit_type', models.CharField(max_length=300)),
                ('unit_of_mesurement', models.CharField(max_length=300)),
                ('property_tax_no', models.CharField(max_length=300)),
                ('electricity_connection_no', models.CharField(max_length=300)),
                ('is_having_pet', models.BooleanField(default=False)),
                ('gas_connection_no', models.CharField(max_length=300)),
                ('water_connection_no', models.CharField(max_length=300)),
                ('flat_status', models.CharField(choices=[('occupied', 'Occupied'), ('not_occupied', 'Not Occupied'), ('rented', 'Rented'), ('japti', 'Japti'), ('builder_possession', 'Builder Possession')], max_length=200)),
                ('unique_member_shares', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flats', to='SocietyApi.members')),
                ('wing_flat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.wingflatunique')),
            ],
        ),
    ]
