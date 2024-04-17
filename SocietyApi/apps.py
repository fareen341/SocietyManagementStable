from django.apps import AppConfig


class SocietyapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'SocietyApi'

    def ready(self):
        import SocietyApi.signals