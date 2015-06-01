'''
Created on May 10, 2015

@author: Jon
'''
from django.shortcuts import render_to_response
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.core.context_processors import csrf
from database import models
from django.contrib import auth
import ast
from django.forms.models import model_to_dict
from emails import email as emails


def get_refs():
	return {"Bob Johnson":"Assistant Director", "Hugh Jackman":"Software Engineer", 
	"Bill Gates":"Microsoft", "Katy Perry":"Singer"}
	
def add_reference(request):
	return render_to_response("student_ref.html")


def send_email(request):
        x = {}
        x.update(csrf(request))
        #emails.sendEmail("emailaddress", "Hey there", "Yo")
        return render_to_response("student_ref.html",x)
                
def view_references(request):
    x = {}
    x.update(csrf(request))
    send_email(request)
    references = get_refs()
    first_time = False
    if not models.StudReferenceMain.objects.filter(Username=request.user.get_username()):
        first_time = True
    else:
        s = models.StudReferenceMain.objects.get(Username=request.user.get_username())
    if request.method == "POST":
        if first_time:
            s = models.StudReferenceMain(Username=request.user.get_username())
        try:
            results = ast.literal_eval(request.POST.get("results"))
        except:
            results = request.POST.get("results")
        i = 1
        for r in results:
            setattr(s, "Choice"+str(i), r)
            i += 1
        s.save()
        if first_time:
            if kind == "student":
                response = HttpResponse(HttpResponseRedirect("/internmatch/student/view_ref/", x))
                response['Location'] = "/internmatch/student/view_ref/"
                return response
            else:
                response = HttpResponse(HttpResponseRedirect("/internmatch/employer/homepage/", x))
                response['Location'] = "/internmatch/employer/homepage/"
                return response
        else:
            response = HttpResponse(HttpResponseRedirect("/internmatch/"+ kind + "/homepage/", x))
            response['Location'] = "/internmatch/"+ kind + "/homepage/"
            return response
    x['references']=references
    return render_to_response("view_ref.html", x)

def get_user_references(username):
	reference_nums = model_to_dict(models.StudReferenceMain.objects.get(Username=username))
	references = get_refs()
	return references
