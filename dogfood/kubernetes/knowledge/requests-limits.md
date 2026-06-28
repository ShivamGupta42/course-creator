---
type: Concept
title: Requests and Limits
sources:
  - https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
prerequisites: [./pod.md]
timestamp: 2026-06-28T10:00:00Z
---
A request is the amount of CPU/memory a container is guaranteed and that the
scheduler reserves for it; a limit is the ceiling the container may not exceed.

Plain definition: the request is your reservation (used for seating you on a
node); the limit is the cap the kernel enforces while you run.

Precise: CPU is compressible — over the limit the container is throttled. Memory
is not — over the limit the container is OOM-killed. Requests drive scheduling
and QoS class (`Guaranteed` when request==limit for all resources, `Burstable`
when set but unequal, `BestEffort` when unset). Under-requesting overcommits a
node; over-requesting wastes it. Taught by [Module 11](../guide/content/11-requests-limits.html).
