import os
from app import create_app
from dotenv import load_dotenv
load_dotenv()

app = create_app()
# Explicitly load the .env file from the correct directory
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Debugging prints
# print(f"HOST_ENV: {os.getenv('HOST_ENV')}")

if __name__ == "__main__":
    app.run(debug=True, host=os.getenv('HOST_ENV'), port=5000)