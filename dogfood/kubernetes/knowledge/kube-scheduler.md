---
type: Concept
title: kube-scheduler
sources:
  - https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/
prerequisites: [./pod.md, ./requests-limits.md]
timestamp: 2026-06-28T10:00:00Z
---
The kube-scheduler is the control-plane component that assigns each unscheduled
Pod to a node by filtering nodes that cannot fit it, then scoring the survivors
and binding the Pod to the best one.

Plain definition: the seating host. A Pod walks in; the scheduler finds a node
with a free seat that meets the Pod's constraints and sits it there.

Precise: scheduling is two phases — filtering (predicates: does the node have
enough allocatable CPU/memory for the Pod's requests, do taints/affinity/
nodeSelector permit it) then scoring (spread, least-loaded). It schedules on
**requests**, not usage; a node with high real load but unreserved requests still
looks empty. Taught by [Module 10](../course.md).
