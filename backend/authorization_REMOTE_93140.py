from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized
from backend.models import LogIn, StudentAssignment, Assignment, User
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
        try:
            session_key = bundle.request.GET["key"]
            user = bundle.request.GET["user"]
            LogIn.objects.all().get(user_name=user, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def update_list(self, object_list, bundle):
        try:
            session_key = bundle.request.GET["key"]
            user = bundle.request.GET["user"]
            LogIn.objects.all().get(user_name=user, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def update_detail(self, object_list, bundle):
        return True

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Sorry no deletes for you")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry no deletes for you")


class StudentAssignmentAuthorization(Authorization):

    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            session_key = bundle.request.GET["key"]
            user = bundle.request.GET["user"]
            user_name = User.objects.all().get(user_name=user)
            if user_name.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def create_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def update_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def update_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def delete_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        # TODO filter on student
        return object_list

    def delete_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'professor':
                raise Unauthorized("Must be student")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    class AssignmentAuthorization(Authorization):

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
            # This assumes a ``QuerySet`` from ``ModelResource``.
            try:
                user_name = bundle.data.get('user_name')
                session_key = bundle.data.get('session_key')
                user = User.objects.all().get(user_name=user_name)
                if user.role.lower() == 'student':
                    raise Unauthorized("Must be professor")
                LogIn.objects.all().get(user_name=user_name, session_key=session_key)
            except (KeyError, ObjectDoesNotExist):
                raise Unauthorized("Need valid session key and username")
            return object_list

        def create_detail(self, object_list, bundle):
            # This assumes a ``QuerySet`` from ``ModelResource``.
            try:
                user_name = bundle.data.get('user_name')
                session_key = bundle.data.get('session_key')
                user = User.objects.all().get(user_name=user_name)
                if user.role.lower() == 'student':
                    raise Unauthorized("Must be professor")
                LogIn.objects.all().get(user_name=user_name, session_key=session_key)
            except (KeyError, ObjectDoesNotExist):
                raise Unauthorized("Need valid session key and username")
            return True

        def update_list(self, object_list, bundle):
            # This assumes a ``QuerySet`` from ``ModelResource``.
            try:
                user_name = bundle.data.get('user_name')
                session_key = bundle.data.get('session_key')
                user = User.objects.all().get(user_name=user_name)
                if user.role.lower() == 'student':
                    raise Unauthorized("Must be professor")
                LogIn.objects.all().get(user_name=user_name, session_key=session_key)
            except (KeyError, ObjectDoesNotExist):
                raise Unauthorized("Need valid session key and username")
            return object_list

        def update_detail(self, object_list, bundle):
            # This assumes a ``QuerySet`` from ``ModelResource``.
            try:
                user_name = bundle.data.get('user_name')
                session_key = bundle.data.get('session_key')
                user = User.objects.all().get(user_name=user_name)
                if user.role.lower() == 'student':
                    raise Unauthorized("Must be professor")
                LogIn.objects.all().get(user_name=user_name, session_key=session_key)
            except (KeyError, ObjectDoesNotExist):
                raise Unauthorized("Need valid session key and username")
            return True

        def delete_list(self, object_list, bundle):
            # This assumes a ``QuerySet`` from ``ModelResource``.
            try:
                user_name = bundle.data.get('user_name')
                session_key = bundle.data.get('session_key')
                user = User.objects.all().get(user_name=user_name)
                if user.role.lower() == 'student':
                    raise Unauthorized("Must be professor")
                LogIn.objects.all().get(user_name=user_name, session_key=session_key)
            except (KeyError, ObjectDoesNotExist):
                raise Unauthorized("Need valid session key and username")
            # TODO filter on professor
            return object_list

        def delete_detail(self, object_list, bundle):
            # This assumes a ``QuerySet`` from ``ModelResource``.
            try:
                user_name = bundle.data.get('user_name')
                session_key = bundle.data.get('session_key')
                user = User.objects.all().get(user_name=user_name)
                if user.role.lower() == 'student':
                    raise Unauthorized("Must be professor")
                LogIn.objects.all().get(user_name=user_name, session_key=session_key)
            except (KeyError, ObjectDoesNotExist):
                raise Unauthorized("Need valid session key and username")
            return True


class StudentCourseAuthorization(Authorization):

    def read_list(self, object_list, bundle):
        raise Unauthorized("Nope")

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        raise Unauthorized("Nope")

    def create_detail(self, object_list, bundle):
        raise Unauthorized("Nope")

    def update_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def update_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Nope")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Nope")


class CourseAuthorization(Authorization):

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
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def create_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def update_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def update_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def delete_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        #TODO filter on professor
        return object_list

    def delete_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True


class AssignmentAuthorization(Authorization):

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
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def create_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def update_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return object_list

    def update_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True

    def delete_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        #TODO filter on professor
        return object_list

    def delete_detail(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        try:
            user_name = bundle.data.get('user_name')
            session_key = bundle.data.get('session_key')
            user = User.objects.all().get(user_name=user_name)
            if user.role.lower() == 'student':
                raise Unauthorized("Must be professor")
            LogIn.objects.all().get(user_name=user_name, session_key=session_key)
        except (KeyError, ObjectDoesNotExist):
            raise Unauthorized("Need valid session key and username")
        return True


