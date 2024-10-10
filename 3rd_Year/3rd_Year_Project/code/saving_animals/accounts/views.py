from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from user_profile.models import UserProfile, VetProfile, OrgProfile
from django.contrib import auth
from .serializers import UserSerializer
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        user = self.request.user
        user_profile = UserProfile.objects.get(user=user)
        type = user_profile.type
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success', 'u_type': str(type)})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'something went wrong checking authentication'})



# Create your views here.
@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format = None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']
        user_type = data['user_type']


        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response({'error': 'Password too short'})
                    else:
                        
                        user = User.objects.create_user(username=username, password=password)

                        user = User.objects.get(id=user.id)

                        user_profile = UserProfile.objects.create(user=user, first_name='', second_name='', type=user_type)

                        if user_type == "vet":

                            vet_profile = VetProfile.objects.create(user=user, bio="Put your bio here")

                            return Response({'success': 'Vet created succesfully'})

                        elif user_type == "org":
                            
                            org_profile = OrgProfile.objects.create(user=user, bio="Put your bio here")

                            return Response({'success': 'Org created succesfully'})
                        

                        return Response({'success': 'User created succesfully'})

        except:
            return Response({'error': 'something went wrong registering'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user=auth.authenticate(username=username, password=password)

            if User is not None:
                auth.login(request, user)
                user_profile = UserProfile.objects.get(user=user)
                type = user_profile.type
                return Response({'success': 'user authenticated', 'u_type':type})
            else:
                return Response({'error': 'user not authenticated'})
        except:
            return Response({'error': 'something went wrong logging in'})

class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'logged out'})
        except:
            return Response({'error': 'log out failed'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


class GetUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        users= User.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id = user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'something went wrong deleting user'})
