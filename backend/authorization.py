from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized
from backend.models import LogIn
from django.core.exceptions import ObjectDoesNotExist


class UserAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            session_key = bundle.request.GET["session_key"]
            user = bundle.request.GET["user"]
            user_name=bundle.request.GET["user_name"]
            LogIn.objects.all().get(user_name=user, session_key=session_key[:-1])
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list.filter(user_name=user_name)

    def read_detail(self, object_list, bundle):
        # Is the requested object owned by the user?
        print(str(bundle.obj) + " " + str(bundle.request))
        try:
            session_key = bundle.request.GET["session_key"]
            user_name = bundle.request.GET["user_name"]
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return bundle.obj.user == bundle.request.user

    def create_list(self, object_list, bundle):
        # Assuming they're auto-assigned to ``user``.
        return object_list

    def create_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def update_list(self, object_list, bundle):
        raise Unauthorized("Sorry, no updates.")

    def update_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no updates.")

    def delete_list(self, object_list, bundle):
        # Sorry user, no deletes for you!
        raise Unauthorized("Sorry, no deletes.")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")
