---
type: Concept
title: Ingress
sources:
  - https://kubernetes.io/docs/concepts/services-networking/ingress/
prerequisites: [./service.md]
timestamp: 2026-06-28T10:00:00Z
---
An Ingress is an API object that defines HTTP/HTTPS routing rules (host and path
to backend Service) for traffic entering the cluster; an Ingress controller is
the running proxy that implements those rules.

Plain definition: one front door for many Services. Instead of a LoadBalancer per
app, one Ingress routes `/api` and `/web` and `shop.example.com` to the right
Service.

Precise: the Ingress object is inert config; nothing happens without an Ingress
controller (nginx, Traefik, a cloud LB) watching it. It operates at L7 (host/path,
TLS termination), routes to Services not Pods, and is the layer where TLS certs
and external DNS meet the cluster. Taught by [Module 15](../guide/content/15-ingress.html).
