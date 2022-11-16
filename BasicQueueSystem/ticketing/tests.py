from rest_framework.test import APITestCase


from .models import Customer, Counter

# Customer API Tests
class CustomerCreateTestCase(APITestCase):
    def test_create_product(self):
        initial_customer_count = Customer.objects.count()
        customer_attrs = {
            'status': Customer.PENDING,
        }
        response =  self.client.post('/api/v1/customers/new', customer_attrs)
        if response.status_code != 201: 
            print(response.data)
        self.assertEqual(
            Customer.objects.count(),
            initial_customer_count + 1,
        )
        for attr, expected_value in customer_attrs.items():
            self.assertEqual(response.data[attr], expected_value)

class CustomersListTestCase(APITestCase):
    def test_list_customers(self):
        customer_count = Customer.objects.count()
        response = self.client.get('/api/v1/customers/')
        self.assertIsNone(response.data['next'])
        self.assertIsNone(response.data['previous'])
        self.assertEqual(response.data['count'], customer_count)
        self.assertEqual(len(response.data['results']), customer_count)

# class CustomerUpdateTestCase(APITestCase):
#     def test_update_product(self):
#         customer = Customer.objects.first()
#         response = self.client.patch(
#             '/api/v1/customers/{}/'.format(customer.id),
#             {
#                 'status': Customer.SERVING
#             },
#             format='json',
#         )
#         updated = Customer.objects.get(id=customer.id)
#         self.assertEqual(updated.status, Customer.SERVING)

class CustomerDestroyTestCase(APITestCase):
    def test_delete_customer(self):
        initial_customer_count = Customer.objects.count()
        customer_id = Customer.objects.first().id
        self.client.delete('/api/v1/customers/{}/'.format(customer_id))
        self.assertEqual(
            Customer.objects.count(),
            initial_customer_count - 1,
        )
        self.assertRaises(
            Customer.DoesNotExist,
            Customer.objects.get, id=customer_id,
        )



# Counter API Tests
# TODO 