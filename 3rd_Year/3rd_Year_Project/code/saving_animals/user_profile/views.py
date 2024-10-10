from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework import permissions
from rest_framework import generics
from .models import UserProfile, VetProfile, OrgProfile, Time, VetSchedule, Report, OrgReport
from .serializers import UserProfileSerializer, VetProfileSerializer, OrgProfileSerializer, VetLocationSerializer, TimeSerializer, VetScheduleSerializer, OrgReportSerializer
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import GEOSGeometry
from datetime import date
#import geocoder
# Create your views here.


#******
# ,make Update Vet Schedule, time wise
#********

class GetAvailableBookingsUser(APIView):
    def get(self, request, format=None):
        data = self.request.data
        date = self.request.query_params.get('date', None)
        id = self.request.query_params.get('id', None)

        
        vet_profile = VetProfile.objects.get(id=id)


        try:

            vet_schedules = VetSchedule.objects.filter(vet_profile=vet_profile, booked=False, date=date)

            vet_schedules = VetScheduleSerializer(vet_schedules, many=True)

            return Response({'vet_schedules':vet_schedules.data})

        except:
            return Response({'error': 'something went wrong getting available bookings'})

class ChangeScheduleTime(APIView):
    def put(self, request, format=None):
        data = self.request.data

        vet_schedule_id = data['vet_schedule_id']
        time = data["time"]

        try:

            VetSchedule.objects.filter(id=vet_schedule_id).update(booked=True, time=time)

            vet_schedule = VetSchedule.objects.get(id=vet_schedule_id)
            vet_schedule = VetScheduleSerializer(vet_schedule)
            
            return Response({'vet_schedule':vet_schedule.data})
        
        except:
            return Response({'error': 'something went wrong updating user profile'})

class GetUserReports(APIView):
    def get(self, request, format=None):
        data = self.request.data
        user = self.request.user


        try:
            user_profile = UserProfile.objects.get(user=user)

            reports = OrgReport.objects.filter(user=user_profile)
            reports = OrgReportSerializer(reports, many=True)

            return Response({'user_reports':reports.data})
        
        except:
            return Response({'error': 'something went wrong getting reports'})

class GetUserBookings(APIView):
    def get(self, request, format=None):
        user = self.request.user
        data = self.request.data


        try:
            user_profile = UserProfile.objects.get(user=user)

            bookings = VetSchedule.objects.filter(user=user_profile)
            
            bookings = VetScheduleSerializer(bookings, many=True)

            return Response({'user_bookings':bookings.data})
        
        except:
            return Response({'error': 'something went wrong getting bookings'})

class UpdateOrgLocationView(APIView):
    def put(self, request, format=None):

        user = self.request.user #always put user first because yes
        data = self.request.data

        location = data['location']

        try:

            OrgProfile.objects.filter(user=user).update(location=location)

            org_profile = OrgProfile.objects.get(user=user)
            org_profile = OrgProfileSerializer(org_profile)

            return Response({'org_profile':org_profile.data})
        except:
            return Response({'error': 'something went wrong updating vet profile location'})

class UpdateVetLocationView(APIView):
    def put(self, request, format=None):

        user = self.request.user
        data = self.request.data

        location = data['location']

        try:

            VetProfile.objects.filter(user=user).update(location=location)

            vet_profile = VetProfile.objects.get(user=user)
            vet_profile = VetProfileSerializer(vet_profile)

            return Response({'vet_profile':vet_profile.data})
        except:
            return Response({'error': 'something went wrong updating vet profile location'})

class MakeReport(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user

        species = data['species']
        breed = data['breed']
        description = data['description']
        schedule_id = data['schedule_id']


        user_profile = UserProfile.objects.get(user=user)
        print(user_profile.location)
        location_found = user_profile.location

        try:

            report = Report.objects.create(description=description, location_found=location_found, reporter=user_profile, breed=breed, species=species)
            vet_schedule = VetSchedule.objects.filter(id=schedule_id).update(booked = True, report=report, user=user_profile)
            
            return Response({'success': 'Booking made'})
            
        except:
            return Response({'error': 'something went wrong making booking'})

      


class MakeOrgReport(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user

        species = data['species']
        breed = data['breed']
        description = data['description']
        id = data['id']


        user_profile = UserProfile.objects.get(user=user)
        org = OrgProfile.objects.get(id=id)
        location_found = user_profile.location

        try:

            report = Report.objects.create(description=description, location_found=location_found, reporter=user_profile, breed=breed, species=species)
            org_report = OrgReport.objects.create(org=org,report=report, user=user_profile)
            
            return Response({'success': 'Org report made'})
            
        except:
            return Response({'error': 'something went wrong making org report'})

      

class UpdateOrgProfileView(APIView):
    def put(self, request, format=None):

        data = self.request.data
        user = self.request.user

        name = data['name']
        specialty = data['specialty']
        bio = data['bio']

        try:

            OrgProfile.objects.filter(user=user).update(name=name, specialty=specialty, bio=bio)

            org_profile = OrgProfile.objects.get(user=user)
            org_profile = OrgProfileSerializer(org_profile)

            return Response({'org_profile':org_profile.data})
        except:
            return Response({'error': 'something went wrong updating vet profile'})


class UpdateVetProfileView(APIView):
    def put(self, request, format=None):

        data = self.request.data #
        user = self.request.user

        name = data['name']
        specialty = data['specialty']
        bio = data['bio']

        try:

            VetProfile.objects.filter(user=user).update(name=name, specialty=specialty, bio=bio)

            vet_profile = VetProfile.objects.get(user=user)
            vet_profile = VetProfileSerializer(vet_profile)

            return Response({'vet_profile':vet_profile.data})
        except:
            return Response({'error': 'something went wrong updating vet profile'})


class MakeBooking(APIView):
    def put(self, request, format=None):
        data = self.request.data

        vet_schedule_id = data['vet_schedule_id']
        report_id = data['report_id']
        user_profile_id = data['user_profile_id']

        try:
            report = Report.objects.get(id=report_id)
            user_profile = UserProfile.objects.get(id=user_profile_id)

            VetSchedule.objects.filter(id=vet_schedule_id).update(booked=True, report=report, user=user_profile)

            vet_schedule = VetSchedule.objects.get(id=vet_schedule_id)
            vet_schedule = VetScheduleSerializer(vet_schedule)
            
            return Response({'vet_schedule':vet_schedule.data})
        
        except:
            return Response({'error': 'something went wrong updating user profile'})

class CancelBooking(APIView):
    def put(self, request, format=None):
        data = self.request.data

        vet_schedule_id = data['vet_schedule_id']

        try:

            VetSchedule.objects.filter(id=vet_schedule_id).update(booked=False, report=None, user=None)

            vet_schedule = VetSchedule.objects.get(id=vet_schedule_id)
            vet_schedule = VetScheduleSerializer(vet_schedule)
            
            return Response({'vet_schedule':vet_schedule.data})
        
        except:
            return Response({'error': 'something went wrong updating user profile'})


class GetTimes(APIView):
    def get(self, request, format=None):
        try:
            times = Time.objects.all()
            times = TimeSerializer(times, many=True)

            return Response({'times':times.data})
        
        except:
            return Response({'error': 'something went wrong getting time'})

class GetFreeTimes(APIView):
    def get(self, request, format=None):

        user = self.request.user
        date = self.request.query_params.get('date', None)
        times = Time.objects.all()
        free_times = []
        i = 0
        try:
            vet_profile = VetProfile.objects.get(user=user)
            for time in times:
                if not VetSchedule.objects.filter(vet_profile=vet_profile, date=date, time=time).exists():
                    free_times.append({"time":str(time)})
                    i += 1

            return Response({'free_times':free_times})
        
        except:
            return Response({'error': 'something went wrong getting time'})

class DeleteBooking(APIView):
    def delete(self, request, format=None):
        data = self.request.data
        id = self.request.query_params.get('id', None)

        try:
            vet_schedule = VetSchedule.objects.get(id=id).delete()

            return Response({'success': 'Schedule deleted successfully'})
        except:
            return Response({'error': 'something went wrong deleting schedule'})

class MakeVetSchedules(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user

        date = data['date']
        print(data)
        try:

            vet_profile = VetProfile.objects.get(user=user)
            times = Time.objects.all()

            if VetSchedule.objects.filter(date=date, vet_profile=vet_profile).exists():
                return Response({'error': 'time for this day and vet profile already exists, try adding seperate times'})
            
            for time in times:
                VetSchedule.objects.create(vet_profile=vet_profile, time=time, date=date)
            
            return Response({'success': 'vet schedule created'})
            
        except:
            return Response({'error': 'something went wrong creating vet'})  

class MakeVetSchedule(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user

        date = data['date']
        time = data['time']

        try:

            vet_profile = VetProfile.objects.get(user=user)
            time = Time.objects.get(time=time)

            if VetSchedule.objects.filter(time=time, date=date, vet_profile=vet_profile).exists():
                return Response({'error': 'time for this day and vet profile already exists, try updating it'})

            vet_schedule = VetSchedule.objects.create(vet_profile=vet_profile, time=time, date=date)
            
            return Response({'success': 'vet schedule created'})
            
        except:
            return Response({'error': 'something went wrong creating vet'})
        
class GetAvailableBookings(APIView):
    def get(self, request, format=None):
        data = self.request.data

        user = self.request.user
        date = self.request.query_params.get('date', None)
        
        vet_profile = VetProfile.objects.get(user=user)


        try:

            vet_schedules = VetSchedule.objects.filter(vet_profile=vet_profile, booked=False, date=date)

            vet_schedules = VetScheduleSerializer(vet_schedules, many=True)

            return Response({'vet_schedules':vet_schedules.data})

        except:
            return Response({'error': 'something went wrong getting available bookings'})

class GetAllBookings(APIView):
    def get(self, request, format=None):
        data = self.request.data

        user = self.request.user
        
        vet_profile = VetProfile.objects.get(user=user)

        try:

            vet_schedules = VetSchedule.objects.filter(vet_profile=vet_profile, booked=True)

            vet_schedules = VetScheduleSerializer(vet_schedules, many=True)

            return Response({'vet_schedules':vet_schedules.data})

        except:
            return Response({'error': 'something went wrong getting available bookings'})

class GetAllReport(APIView):
    def get(self, request, format=None):
        data = self.request.data

        user = self.request.user
        
        org_profile = OrgProfile.objects.get(user=user)
        try:

            org_reports = OrgReport.objects.filter(org=org_profile)

            org_reports = OrgReportSerializer(org_reports, many=True)

            return Response({'org_reports':org_reports.data})

        except:
            return Response({'error': 'something went wrong getting org reports'})
        

class GetBookings(APIView):
    def get(self, request, format=None):
        data = self.request.data

        user = self.request.user
        date = self.request.query_params.get('date', None)

        try:
            vet_profile = VetProfile.objects.get(user=user)

            vet_schedules = VetSchedule.objects.filter(vet_profile=vet_profile, booked=True, date=date)

            vet_schedules = VetScheduleSerializer(vet_schedules, many=True)

            return Response({'vet_schedules': vet_schedules.data})

        except:
            return Response({'error': 'something went wrong getting bookings'})


class GetAllSchedules(APIView):
    def get(self, request, format=None):
        data = self.request.data

        user = self.request.user
        try:
            vet_profile = VetProfile.objects.get(user=user)
            vet_schedules = VetSchedule.objects.filter(vet_profile=vet_profile)

            vet_schedules = VetScheduleSerializer(vet_schedules, many=True)

            return Response({'vet_schedules': vet_schedules.data})
        except:
            return Response({'error': 'something went wrong getting bookings'})
        

class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user

            username = user.username

            user_profile = UserProfile.objects.get(user=user)
            
            type = user_profile.type

            user_profile = UserProfileSerializer(user_profile)


            if type == "vet":
                
                vet_profile = VetProfile.objects.get(user=user)

                vet_profile = VetProfileSerializer(vet_profile)

                return Response({'vet_profile':vet_profile.data, 'username': str(username), 'type':type})
            
            elif type == "org":

                org_profile = OrgProfile.objects.get(user=user)

                org_profile = OrgProfileSerializer(org_profile)

                return Response({'org_profile':org_profile.data, 'username': str(username), 'type':type})

            return Response({'profile':user_profile.data, 'username': str(username), 'type':type})
        except:
            return Response({'error': 'something went wrong getting user profiles'})


class UpdateUserLocationView(APIView):
    def put(self, request, format=None):
        user = request.user
        username = user.username

        data = request.data

        location = data['location']
        try:

            UserProfile.objects.filter(user=user).update(location=location)

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile':user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'something went wrong updating user profile'})


class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        username = user.username

        data = self.request.data

        first_name = data['first_name']
        second_name = data['second_name']
        age = data['age']

        try:

            UserProfile.objects.filter(user=user).update(first_name=first_name, second_name=second_name, age=age)

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile':user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'something went wrong updating user profile'})
        

class QueryVetDistanceView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = VetProfile.objects.all()
    serializer_class = VetProfileSerializer
    
    def get_queryset(self):
        sd = super().get_queryset()
        latitude = self.request.query_params.get('lat', None)
        longitude = self.request.query_params.get('lng', None)
        
        qs = sd  # Initialize qs
        
        if latitude and longitude:
            pnt = GEOSGeometry("POINT (" + str(longitude) + " " + str(latitude)  + ")", srid=4326)
            qs = sd.annotate(distance=Distance('location', pnt)).order_by('distance')
            
        return qs 

class QueryOrgDistanceView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = OrgProfile.objects.all()
    serializer_class = OrgProfileSerializer
    
    def get_queryset(self):
        sd = super().get_queryset()
        latitude = self.request.query_params.get('lat', None)
        longitude = self.request.query_params.get('lng', None)
        
        qs = sd  # Initialize qs
        
        if latitude and longitude:
            pnt = GEOSGeometry("POINT (" + str(longitude) + " " + str(latitude)  + ")", srid=4326)
            qs = sd.annotate(distance=Distance('location', pnt)).order_by('distance')
            
        return qs 

class QueryVet(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = VetProfile.objects.all()
    serializer_class = VetProfileSerializer
    lookup_field = 'id'

    def get_object(self):
        vet_id = self.kwargs.get('id')
        
        # Retrieve the vet by ID
        vet = VetProfile.objects.filter(id=vet_id).first()
        
        if vet:
            # If latitude and longitude are provided, annotate with distance
            latitude = self.request.query_params.get('lat', None)
            longitude = self.request.query_params.get('lng', None)
            if latitude and longitude:
                pnt = GEOSGeometry("POINT (" + str(longitude) + " " + str(latitude)  + ")", srid=4326)
                vet.distance = vet.location.distance(pnt)
            else:
                vet.distance = None

        return vet