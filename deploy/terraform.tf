resource "random_password" "password" {
  length  = 128
  special = false
}

module "ams3" {
  source = "./modules/server"
  region = "ams3"
  do_token = var.do_token
  pvt_key  = var.pvt_key
  password = random_password.password.result
  rage4_token = var.rage4_token
  rage4_email = var.rage4_email
}

output "ams3_ip" {
  value = module.ams3.ipv4_address
}

module "sfo3" {
  source = "./modules/server"
  region = "sfo3"
  do_token = var.do_token
  pvt_key  = var.pvt_key
  password = random_password.password.result
  rage4_token = var.rage4_token
  rage4_email = var.rage4_email
}

output "sfo3_ip" {
  value = module.sfo3.ipv4_address
}

module "sgp1" {
  source = "./modules/server"
  region = "sgp1"
  do_token = var.do_token
  pvt_key  = var.pvt_key
  password = random_password.password.result
  rage4_token = var.rage4_token
  rage4_email = var.rage4_email
}

output "sgp1_ip" {
  value = module.sgp1.ipv4_address
}

output "password" {
  value = random_password.password.result
}
