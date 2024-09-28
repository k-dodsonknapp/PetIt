FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install --dev -r dev-requirements.txt && pip install -r requirements.txt
RUN pip install psycopg2

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=development


# Define the default command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
