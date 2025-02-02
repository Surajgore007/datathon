import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GROQ_API_KEY = os.getenv('GROQ_API_KEY', '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')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = os.getenv('FLASK_ENV') == 'development'