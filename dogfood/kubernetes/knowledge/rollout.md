---
type: Concept
title: Rollout and Rollback
sources:
  - https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment
prerequisites: [./deployment.md, ./probes.md]
timestamp: 2026-06-28T10:00:00Z
---
A rollout is the controlled replacement of old Pods with new ones when a
Deployment's template changes; a rollback returns the Deployment to a previous
known-good ReplicaSet.

Plain definition: shipping a new version without taking the app down, and the
undo button when the new version is bad.

Precise: a `RollingUpdate` shifts replicas old→new bounded by `maxSurge` (extra
Pods allowed above desired) and `maxUnavailable` (Pods allowed missing).
Readiness probes gate progress: a new Pod that never becomes Ready stalls the
rollout instead of serving errors. `kubectl rollout undo` re-activates the prior
ReplicaSet. Taught by [Module 19](../course.md).
