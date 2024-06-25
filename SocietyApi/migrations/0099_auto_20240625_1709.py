# Generated by Django 3.2.12 on 2024-06-25 17:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0098_generalledger'),
    ]

    operations = [
        migrations.AddField(
            model_name='generalledger',
            name='from_ledger',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='from_ledger', to='SocietyApi.ledger'),
        ),
        migrations.AlterField(
            model_name='generalledger',
            name='credit',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='generalledger',
            name='debit',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='generalledger',
            name='particulars',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='particulars', to='SocietyApi.ledger'),
        ),
    ]
