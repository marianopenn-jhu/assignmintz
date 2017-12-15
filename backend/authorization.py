from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized
from backend.models import LogIn, StudentAssignment, Assignment
from django.core.exceptions import ObjectDoesNotExist


class UserAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            session_key = bundle.request.GET["key"]
            user = bundle.request.GET["user"]
            LogIn.objects.all().get(user_name=user, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list.filter(user_name=user)

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        # Assuming they're auto-assigned to ``user``.
        return object_list

    def create_detail(self, object_list, bundle):
        return True

    def update_list(self, object_list, bundle):
        return object_list

    def update_detail(self, object_list, bundle):
        return True

    def delete_list(self, object_list, bundle):
        # Sorry user, no deletes for you!
        raise Unauthorized("Sorry, no deletes for you.")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")


class GeneralAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            session_key = bundle.request.GET["key"]
            user = bundle.request.GET["user"]
            LogIn.objects.all().get(user_name=user, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        # Assuming they're auto-assigned to ``user``.
        return object_list

    def create_detail(self, object_list, bundle):
        return True

    def update_list(self, object_list, bundle):
        return object_list

    def update_detail(self, object_list, bundle):
        return True

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Sorry no deletes for you")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry no deletes for you")

class StudentAssignmentAuthorization(Authorization):
    print('auth got called')
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            session_key = bundle.request.GET["key"]
            user = bundle.request.GET["user"]
            LogIn.objects.all().get(user_name=self.user, session_key=self.session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def read_detail(self, object_list, bundle):
        try:
            StudentAssignment.objects.all().get(student=bundle.data.get('student').split('/')[4], assignment=bundle.data.get('assignment').split('/')[5])
        except (KeyError, ObjectDoesNotExist):
            return False
        return True

    def create_list(self, object_list, bundle):
        try:
            StudentAssignment.objects.all().get(student=bundle.data.get('student').split('/')[4], assignment=bundle.data.get('assignment').split('/')[5])
        except (KeyError, ObjectDoesNotExist):
            return True
        return False

    def create_detail(self, object_list, bundle):
        try:
            StudentAssignment.objects.all().get(student=bundle.data.get('student').split('/')[4], assignment=bundle.data.get('assignment').split('/')[5])
        except (KeyError, ObjectDoesNotExist):
            return True
        return False

    def update_list(self, object_list, bundle):
        return object_list

    def update_detail(self, object_list, bundle):
        try:
            StudentAssignment.objects.all().get(student_id=bundle.data.get('student').split('/')[4], assignment_id=bundle.data.get('assignment').split('/')[5])
        except (KeyError, ObjectDoesNotExist):
            return False
        return True

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Sorry no deletes for you")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry no deletes for you")
