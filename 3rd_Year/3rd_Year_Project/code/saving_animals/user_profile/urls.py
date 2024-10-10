
from django.urls import path

from .views import GetUserProfileView, UpdateUserProfileView, UpdateUserLocationView, GetTimes, GetAvailableBookings, GetBookings, MakeVetSchedule, QueryVetDistanceView, DeleteBooking, MakeBooking, CancelBooking, UpdateVetProfileView, UpdateOrgProfileView, MakeOrgReport, UpdateVetLocationView, UpdateOrgLocationView, GetUserBookings, GetUserReports, ChangeScheduleTime,  QueryVet, GetFreeTimes, MakeVetSchedules, MakeReport,GetAvailableBookingsUser, GetAllBookings, QueryOrgDistanceView, GetAllReport



urlpatterns = [
    path('user', GetUserProfileView.as_view()), #redux done
    path('update', UpdateUserProfileView.as_view()), #redux done
    path('location', UpdateUserLocationView.as_view()), #redux done
    path('times', GetTimes.as_view()), #redux not needed for flask
    path('available', GetAvailableBookings.as_view()), #redux done
    path('booked', GetBookings.as_view()), #redux done
    path('make_schedule', MakeVetSchedule.as_view()), #redux done
    path('vets', QueryVetDistanceView.as_view()), #redux not needed for flask
    path('orgs', QueryOrgDistanceView.as_view()), #redux not needed for flask
    path('vets/<int:id>', QueryVet.as_view()),
    path('delete_booking', DeleteBooking.as_view()), #redux done
    path('make_booking', MakeBooking.as_view()), #redux done
    path('cancel_booking', CancelBooking.as_view()), #redux done
    path('update_vet', UpdateVetProfileView.as_view()), #redux done
    path('update_org', UpdateOrgProfileView.as_view()), #redux maybe done
    path('make_org_report', MakeOrgReport.as_view()),
    path('vet_location', UpdateVetLocationView.as_view()), #redux done
    path('org_location', UpdateOrgLocationView.as_view()), #redux done
    path('user_bookings', GetUserBookings.as_view()), #redux done
    path('user_reports', GetUserReports.as_view()),#redux done
    path('schedule_time', ChangeScheduleTime.as_view()), #might not work
    path('free_times', GetFreeTimes.as_view()), #redux done
    path('make_schedules', MakeVetSchedules.as_view()), #redux done
    path('make_report', MakeReport.as_view()), #redux done
    path('available_user', GetAvailableBookingsUser.as_view()),#redux done
    path('booked_all', GetAllBookings.as_view()), #redux done
    path('reports_all', GetAllReport.as_view()), #redux done

]