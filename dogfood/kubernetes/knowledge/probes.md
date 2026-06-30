---
type: Concept
title: Readiness and Liveness Probes
sources:
  - https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
prerequisites: [./pod.md, ./service.md]
timestamp: 2026-06-28T10:00:00Z
---
A liveness probe decides whether a container should be restarted; a readiness
probe decides whether a Pod should receive traffic. A startup probe gates the
other two while a slow process boots.

Plain definition: liveness asks "is it wedged, kill it?"; readiness asks "is it
ready for customers, send traffic?". They are different questions with different
consequences.

Precise: failing readiness removes the Pod from its Service endpoints (traffic
stops, Pod keeps running). Failing liveness restarts the container. A liveness
probe pointed at a dependency causes restart storms when the dependency is slow;
readiness is the right probe for "temporarily can't serve". Taught by
[Module 13](../course.md).
