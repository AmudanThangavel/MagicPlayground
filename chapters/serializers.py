from rest_framework import serializers

from users.models import code_submit


class CodeSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_submit
        fields = '__all__'
