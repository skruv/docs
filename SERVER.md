EU=Europe
AS=Asia
US=United states
DO=Digital ocean
OC=Oceania

Layout:
    hetzner;
        dedicated DB (39€) (manual setup) (OVH failover/readonly)
        dedicated FS? (manual setup) (OVH failover/readonly)
        EU edge (Failover US)
    gcorelabs:
        south africa edge (Failover EU)
        south america edge (Failover US)
        sydney(OC) edge (Failover AS)
        KO edge (failover AS)
    DO:
        Singapore(AS) edge (Failover OC)
        US east edge (Failover EU)
        US west edge (Failover OC)
    DNS:
        rage4: 20€

cost: (8 * 7€) + 20€ + (39€ * 2)
failovers: ((2 * 56€) * 2)

In each:
    keycloak
    postgrest
    goaccess
    netdata
    minio?

Edge nodes:
    Cache/compute only

DB nodes:
    Patroni

FS nodes:
    Minio

TODO:
 * [ ] Include more data in goaccess like:
   * [ ] Latency for DNS etc. (check Performance)
   * [ ] Rendering (check Performance)
 * [ ] Add auth to goaccess
 * [ ] Automate rage4 DNS
   * [ ] Update terraform module?
   * [ ] Add ipv6
 * [ ] Use ssh tailing in separate unit files and logrotate
 * [ ] Switch to use coordinates instead of continents
 * [ ] Add failover IPs
 * [ ] Setup DB server (hetzner dedicated)
 * [ ] Setup postgrest
 * [ ] use sshfs back to DB server for cert management
 * [ ] Add cache policy for dynamic routes

password = "8OrbxrJgvgG8XYzzO3TeLRKEuzSQIdP2xY5r98X06QnxFMBESb0a7RwUBUKqAeC3HU7KowheNJraMbEVagP0Um2yxM7ckITP20y5eYcDcRIQG06SPfKrfUCpDkFkFZbS"

ams3_ip = "68.183.7.97"
sfo3_ip = "161.35.230.167"
sgp1_ip = "128.199.193.13"

creds="rage4@richter.id:ab8ecc6ed283cffb10155f9f652f8241"

SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSXXXXXXXXXSSS
SSSXXXXXXXXXSSS
SSSXXXXXXXXXSSS
SSSXXXXXXXXXSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS


4*4
3 around
3 high



((3 * 4) * 4) + ((3 * 3) * 4)
