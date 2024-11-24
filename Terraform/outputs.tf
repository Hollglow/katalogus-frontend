# DO NOT USE IN PRODUCTION - FOR EDUCATIONAL PURPOSES ONLY

output "private_key" {
  value       = file("~/.ssh/id_rsa")  # Exposing the private key in output (BAD PRACTICE)
  sensitive   = false                 # Marking it non-sensitive (BAD PRACTICE)
  description = "Private SSH key to access the VM"
}
