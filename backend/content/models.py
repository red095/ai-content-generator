from django.db import models

# Create your models here.
class ContentRequest(models.Model):
    CONTENT_TYPES=[
        ('social_post','Social Media Post'),
        ("blog_outline",'Blog Outline'),
        ("ad_copy",'Ad Copy'),
        
    ]
    topic=models.CharField(max_length=255)
    content_type=models.CharField(max_length=50,choices=CONTENT_TYPES)
    tone=models.CharField(max_length=50,blank=True,null=True)
    generated_text=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.topic} - {self.content_type}"
    