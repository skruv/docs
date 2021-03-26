variable "region" {}
variable "password" {}
variable "rage4_token" {}
variable "rage4_email" {}

resource "digitalocean_droplet" "skruv_cdn" {
  image = "ubuntu-20-10-x64"
  name = "skruv-cdn-${var.region}"
  region = var.region
  size = "s-1vcpu-1gb-intel"
  private_networking = false
  ssh_keys = [
    data.digitalocean_ssh_key.terraform.id,
    data.digitalocean_ssh_key.skruv_server.id
  ]
  connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      "DEBIAN_FRONTEND=noninteractive apt-get -o Dpkg::Options::=--force-confold -o Dpkg::Options::=--force-confdef -y --allow-downgrades --allow-remove-essential --allow-change-held-packages update",
      "DEBIAN_FRONTEND=noninteractive apt-get -o Dpkg::Options::=--force-confold -o Dpkg::Options::=--force-confdef -y --allow-downgrades --allow-remove-essential --allow-change-held-packages install git",
      "mkdir -p /etc/nginx/certs/skruv.io"
    ]
  }
  provisioner "file" {
    source      = "./certs/skruv.io/cert.pem"
    destination = "/etc/nginx/certs/skruv.io/cert.pem"
  }
  provisioner "file" {
    source      = "./certs/skruv.io/key.pem"
    destination = "/etc/nginx/certs/skruv.io/key.pem"
  }
  provisioner "file" {
    source      = "./certs/skruv.io/fullchain.pem"
    destination = "/etc/nginx/certs/skruv.io/fullchain.pem"
  }
  provisioner "file" {
    source      = "./keys/id_ed25519.pub"
    destination = "/root/.ssh/id_ed25519.pub"
  }
  provisioner "file" {
    source      = "./keys/id_ed25519"
    destination = "/root/.ssh/id_ed25519"
  }
  provisioner "remote-exec" {
    inline = [
      "chmod 600 /root/.ssh/id_ed25519",
      "eval \"$(ssh-agent -s)\"",
      "ssh-add /root/.ssh/id_ed25519"
    ]
  }
  provisioner "remote-exec" {
    inline = [
      "export LEXICON_RAGE4_TOKEN=${var.rage4_token}",
      "export LEXICON_RAGE4_USERNAME=${var.rage4_email}",
      "git clone https://github.com/skruv/docs.git /var/www/docs",
      "/var/www/docs/deploy/build_server.sh",
    ]
  }
}

output "ipv4_address" {
  value = digitalocean_droplet.skruv_cdn.ipv4_address
}
