from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .models import User,Driver,Ride
import json,re
from rest_framework import serializers
from .serializer import RideSerializer
from django.db import connection
from collections import OrderedDict 
from html import escape,unescape
from django.db.models import Q
from decimal import Decimal

def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()
    if isinstance(o, (datetime.time, datetime.datetime)):
        return o.isoformat()
    if isinstance(o, Decimal):
        return str(o)
    
def make_query(stmt):
    cursor = connection.cursor() 
    try:
        cursor.execute(stmt)
    except:
        return "syntax error"
    det=cursor.fetchall()
    # print(det)
    header=[]
    for val in cursor.description:
        header.append(val[0])
    header_arr=[]
    mylist=[]
    c=0
    for val in det:          
        try:
            c=0
            list1=OrderedDict()
            for value in val:
                orig_val=unescape(str(value))
                if re.search("^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}(.\d{1,6})?$",orig_val):
                    orig_val=utc_to_ist(re.search("\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}", orig_val).group(0))
                list1.update(OrderedDict({cursor.description[c][0]: orig_val}))
                c+=1
            mylist.append(list1)
        except Exception as e:
            print(str(e))  
    return str(json.dumps(mylist,sort_keys=False,indent=1,default=default))


# Create your views here.

@csrf_exempt
def adduser(request):
    if  request.method == 'POST' and "name" in request.POST:
        try:
            name=request.POST.get("name").strip().lower()
            if name=="":
                return HttpResponse("Incomplete  data",content_type="text")
            user=User()
            user.name=name
            user.phone_number=request.POST.get("mobile").strip()
            user.save()
            if user!=None:
                return HttpResponse("Registered successfully",content_type="text")
            else:
                return HttpResponse("Registration Failed",content_type="text")
        except Exception as e:
            print(str(e))
            return HttpResponse("Failed",content_type="text")
    else:
        return HttpResponse("Invalid request type",content_type="text")



@csrf_exempt
def adddriver(request):
    if  request.method == 'POST' and "name" in request.POST:        
        try:
            name=request.POST.get("name").strip().lower()
            if name=="":
                return HttpResponse("Incomplete  data",content_type="text")
            driver=Driver()
            driver.name=name
            driver.phone_number=request.POST.get("mobile").strip()
            driver.vehicle_number=request.POST.get("vehicle_number").strip()
            driver.save()
            if driver!=None:
                return HttpResponse("Registered successfully",content_type="text")
            else:
                return HttpResponse("Registration Failed",content_type="text")
        except Exception as e:
            print(str(e))
            return HttpResponse("Failed",content_type="text")
    else:
        return HttpResponse("Invalid request type",content_type="text")


@csrf_exempt
def get_ride_details(request):
    where="where True"
    if "user" not in request.session and "driver" not in request.session:
        if "user" in request.GET:
            where+=" and us.name='"+request.GET.get("user")+"'"
        if "driver" in request.GET:
            where+=" and dr.name='"+request.GET.get("driver")+"'"
        if "status" in request.GET:
            where+=" and ride.ride_type='"+request.GET.get("status")+"'"
    if "user" in request.session:
        where+=" and us.name='"+request.session.get("user")+"'"
    if "driver" in request.session:
        where+=" and ride_type='rq' or (dr.name='"+request.session.get("driver")+"' and ride_type!='rq')"
    query='SELECT ride.id,us.name AS user,dr.name AS driver,date_time,ride_type,vehicle_number from "cabApi_ride" AS ride INNER JOIN "cabApi_user" AS us ON ride.user_id=us.id LEFT JOIN "cabApi_driver" AS dr ON ride.driver_id=dr.id '+where
    print(query)
    return HttpResponse(make_query(query),content_type="text/json")
    

@csrf_exempt
def login_user(request):
    if  request.method == 'POST':
        print(request.POST)
        try:
            name = request.POST.get('user', None)
            if(User.objects.filter(name=name).count()):
                request.session["user"]=name
                return HttpResponse("pass",content_type="text")
            else:
                return HttpResponse("block",content_type="text")
        except Exception as e:
            print(str(e))
            return HttpResponse("block",content_type="text")        
    else:
        return HttpResponse("Invalid request type",content_type="text")

@csrf_exempt
def login_driver(request):
    if  request.method == 'POST':
        print(request.POST)
        try:
            name = request.POST.get('driver', None)
            if(Driver.objects.filter(name=name).count()):
                request.session["driver"]=name
                return HttpResponse("pass",content_type="text")
            else:
                return HttpResponse("block",content_type="text")
        except Exception as e:
            print(str(e))
            return HttpResponse("block",content_type="text")        
    else:
        return HttpResponse("Invalid request type",content_type="text")

@csrf_exempt
def logout_user(request):
    print("logout...")
    request.session.clear()
    return HttpResponse("done",content_type="text")


@csrf_exempt
def get_session_details(request):
    if "user" in request.POST and "user" in request.session:
        return HttpResponse(request.session.get("user"),content_type="text")
    elif "driver" in request.POST and "driver" in request.session:
        return HttpResponse(request.session.get("driver"),content_type="text")
    else:
        return HttpResponse("No data",content_type="text")
    
@csrf_exempt
def add_ride(request):
    if  request.method == 'POST':   
        if "user" in request.session:     
            # try:
            ride=Ride()
            user_id=User.objects.filter(name=request.session.get("user"))[0].id
            if Ride.objects.filter(Q(ride_type="rq")| Q(ride_type="ac"),user_id=user_id).count()!=0:
                return HttpResponse("Your previous request already in progress",content_type="text")
            ride.user_id=user_id
            # rider=None
            # print(Driver.objects.all()[0].id)
            # for driver in Driver.objects.all():
            #     if Ride.objects.filter(driver_id=driver.id).count()==0:
            #         rider=driver.id
            # if rider==None:
            #     if Ride.objects.filter(ride_type="ac").count()!=0:
            #         return HttpResponse("Currntly no rider is free",content_type="text")
            #     rider=Ride.objects.filter(~Q(ride_type="ac"))[0].driver_id  
            # print("rider",rider)     
            # ride.driver_id=rider
            ride.phone_number="0000000000"
            ride.ride_type="rq"
            ride.save()
            if ride!=None:
                return HttpResponse("success",content_type="text")
            else:
                return HttpResponse("Ride request Failed",content_type="text")
            # except Exception as e:
            #     # print(str(e))
            #     return HttpResponse("Failed",content_type="text")
        return HttpResponse("Not logged in",content_type="text")
    else:
        return HttpResponse("Invalid request type",content_type="text")

@csrf_exempt
def accept_ride(request):
    if  request.method == 'POST':   
        if "driver" in request.session:
            if Ride.objects.filter(ride_type="ac",driver_id=Driver.objects.filter(name=request.session.get("driver"))[0]).count()>0:
                return HttpResponse("You can't accept more than one ride",content_type="text")
            resp=Ride.objects.filter(id=request.POST.get("id")).update(driver_id=Driver.objects.filter(name=request.session.get("driver"))[0].id,ride_type="ac")
            return HttpResponse("updated",content_type="text")
        else:
           return HttpResponse("Not logged in",content_type="text")
    else:
        return HttpResponse("Invalid request type",content_type="text")

@csrf_exempt
def end_ride(request):
    if  request.method == 'POST':   
        if "user" in request.session:
            resp=Ride.objects.filter(id=request.POST.get("id"),user_id=User.objects.filter(name=request.session.get("user"))[0].id).update(ride_type="dn")
            return HttpResponse(str(resp),content_type="text")
        else:
           return HttpResponse("Not logged in",content_type="text")
    else:
        return HttpResponse("Invalid request type",content_type="text")