# DO NOT USE IN PRODUCTION - FOR EDUCATIONAL PURPOSES ONLY

provider "aws" {
  region     = "us-west-2"
  access_key = "AKIAEXPOSEDACCESSKEY"  # Hardcoding credentials (BAD PRACTICE)
  secret_key = "aR6GFtrSyU8Orso60ak!" # Hardcoding credentials (BAD PRACTICE)
}

resource "aws_instance" "web_app" {
  ami           = "ami-12345678"  # Using a potentially outdated AMI
  instance_type = "t2.micro"      # Minimal resources for critical workloads (BAD PRACTICE)

  tags = {
    Name = "BadPracticeWebServer"
  }

  user_data = <<-EOF
    #!/bin/bash
    # Hardcoding sensitive data in user data
    echo "DB_PASSWORD=SuperSecretDatabasePassword123" > /tmp/db_password.txt
    # Running application as root (BAD PRACTICE)
    apt update && apt install -y nginx
    echo "Hello, World!" > /var/www/html/index.html
    service nginx start
  EOF
}

resource "aws_security_group" "web_app_sg" {
  name_prefix = "bad-practice-sg"

  ingress {
    from_port   = 0   # Allowing all ports (BAD PRACTICE)
    to_port     = 65535
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]  # Open to the entire internet (BAD PRACTICE)
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "instance_public_ip" {
  value = aws_instance.web_app.public_ip
  description = "Public IP of the web application server"
}
