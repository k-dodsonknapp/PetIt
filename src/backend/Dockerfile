# FROM python:3.9

# # Setup Flask environment
# ENV FLASK_APP=app
# ENV FLASK_ENV=production
# ENV SQLALCHEMY_ECHO=True

# EXPOSE 8000

# WORKDIR /app
# # WORKDIR /var/www
# # COPY . .
# # COPY --from=build-stage /react-app/build/* app/static/

# # Install Python Dependencies
# RUN pip install -r dev-requirements.txt 
# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# # Set environment variables for Flask
# ENV FLASK_APP=app.py
# ENV FLASK_ENV=development


# # Define the default command to run the Flask app
# CMD ["flask", "run", "--host=0.0.0.0"]

FROM python:3.9

# Set working directory inside the container
WORKDIR /app

# Copy files to the working directory
COPY . .

# Install Python dependencies
RUN pip install -r dev-requirements.txt
RUN pip install -r requirements.txt

# Install PostgreSQL client
RUN pip install psycopg2-binary

# Expose Flask port
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Define the default command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]