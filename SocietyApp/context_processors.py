from SocietyApi.models import SocietyCreation



def global_context(request):
    society_exists = SocietyCreation.objects.exists()
    return {'society_exists': society_exists}