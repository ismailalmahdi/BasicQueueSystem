from django.db import models

class Customer(models.Model):
    PENDING = 'PN'
    SERVING = 'SR'
    SERVED = 'SD'
    STATUS_CHOICES = [
        (PENDING, 'Waiting'),
        (SERVING, 'Serving'),
        (SERVED, 'Served'),
   
    ]
    id = models.AutoField(primary_key=True)
    status = models.name = models.CharField(max_length=2, choices=STATUS_CHOICES,default=PENDING)
    def __str__(self) -> str:
        return 'Customer {}'.format(self.id)

class Counter(models.Model):
    OFFLINE = 'OF'
    ONLINE = 'ON'
    SERVING = 'SR'
    STATUS_CHOICES = [
        (OFFLINE, 'Offline'),
        (ONLINE, 'Online'),
        (SERVING, 'Serving'),
    ]
    id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    status = models.name = models.CharField(max_length=2, choices=STATUS_CHOICES,default=ONLINE)
    def __str__(self) -> str:
        return 'Counter {}'.format(self.id)
 
