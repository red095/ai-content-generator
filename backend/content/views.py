from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContentRequestSerializer
from .models import ContentRequest
from .services.openai_service import generate_ai_content

class GenerateContentView(APIView):
    def post(self,request):
        serializer=ContentRequestSerializer(data=request.data)

        if serializer.is_valid():
            topic=serializer.validated_data['topic']
            content_type=serializer.validated_data['content_type']
            tone=serializer.validated_data.get("tone","")

            generated_text=generate_ai_content(topic,content_type,tone)

            content_obj=ContentRequest.objects.create(
                topic=topic,
                content_type=content_type,
                tone=tone,
                generated_text=generated_text
            )

            return Response({"generated_text":generated_text},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
