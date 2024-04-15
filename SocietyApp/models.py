from django.db import models


class Childs(models.Model):
    name = models.CharField(max_length=100, unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    # class Meta:
    #     unique_together = ('name', 'parent')

    def __str__(self):
        return self.name


class CostCenter(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='cost_center')

    class Meta:
        unique_together = ('name', 'parent')

    def __str__(self):
        return self.name
