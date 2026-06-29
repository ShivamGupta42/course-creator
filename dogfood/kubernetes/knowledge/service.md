---
type: Concept
title: Service
sources:
  - https://kubernetes.io/docs/concepts/services-networking/service/
prerequisites: [./pod.md, ./deployment.md]
timestamp: 2026-06-28T10:00:00Z
---
A Service is a stable virtual address (a fixed name and ClusterIP) that load-
balances traffic across the set of Pods matching a label selector, so clients
never need to know individual Pod IPs.

Plain definition: Pods come and go and change IP; the Service is the phone number
that always reaches whichever Pods are currently alive.

Precise: a Service selects Pods by label, and the endpoints controller keeps an
EndpointSlice of ready Pod IPs behind the ClusterIP. Types: `ClusterIP`
(internal), `NodePort`, `LoadBalancer`. Only Pods that pass their readiness probe
are added to the rotation. Taught by [Module 04](../course.md).
