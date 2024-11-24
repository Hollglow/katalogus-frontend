# DO NOT USE IN PRODUCTION - FOR EDUCATIONAL PURPOSES ONLY

resource "aws_key_pair" "web_app_key" {
  key_name   = "bad_practice_key"
  public_key = file("~/.ssh/id_rsa.pub") # Using an insecure key management process
}
