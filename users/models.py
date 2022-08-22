from configparser import MAX_INTERPOLATION_DEPTH
from sre_constants import SUCCESS
from statistics import mode
from tkinter import CASCADE
from django.db import models

# Create your models here.


class user_info(models.Model):
    user = models.OneToOneField(
        'auth.User', related_name='user_info', on_delete=models.CASCADE)
    standard = models.CharField(max_length=10, blank=True, default='')
    country = models.CharField(max_length=20)
    school = models.CharField(max_length=80)

    def __str__(self):
        return self.user.username


class chapter_info(models.Model):
    chapter_id = models.CharField(primary_key=True, max_length=5)
    chapter_no = models.IntegerField()
    chapter_name = models.CharField(max_length=50)
    chapter_intro = models.BooleanField(default=False)


class code_submit(models.Model):
    user = models.ForeignKey(
        'auth.User', related_name='code_submit', on_delete=models.CASCADE)
    chapter_id = models.ForeignKey(chapter_info, on_delete=models.CASCADE, related_name='code_submit_chapID')
    submitted_code = models.CharField(max_length=1000)
    success_code = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    tries = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)