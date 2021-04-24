from django.test import TestCase


class SupplementsGetAllowAnyTest(TestCase):
    def test_get_supplements(self):
        response = self.client.get('/api/supplements/')
        self.assertEqual(response.status_code, 200)


class DietsGetAllowAnyTest(TestCase):
    def test_get_diets(self):
        response = self.client.get('/api/diets/')
        self.assertEqual(response.status_code, 200)


class ExCategoryAllowAny(TestCase):
    def test_get_excat(self):
        response = self.client.get('/api/exercise_categories/')
        self.assertEqual(response.status_code, 200)


class LoginTest(TestCase):
    def test_logination(self):
        data = {
            'username': 'A_Khalyk',
            'password': 'ROBERTO'
        }
        response = self.client.post('/api/login/', data)
        self.assertEqual(response.status_code, 200, 'ok')