from django.urls import path
from.import views

urlpatterns = [
    path("adduser/",views.adduser),
    path("adddriver/",views.adddriver),
    path("get_ride_details/",views.get_ride_details),
    path("login_user/",views.login_user),
    path("login_user/",views.login_user),
    path("login_driver/",views.login_driver),
    path("login_status/",views.get_session_details),
    path("logout_user/",views.logout_user),
    path("add_ride/",views.add_ride),
    path("accept_ride/",views.accept_ride),
    path("end_ride/",views.end_ride),
]