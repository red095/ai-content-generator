from rest_framework import serializers
from .models import ContentRequest

class ContentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentRequest
        fields = '__all__'

        read_only_fields = ["generated_text","created_at"]
        