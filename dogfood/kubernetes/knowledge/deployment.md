---
type: Concept
title: Deployment
sources:
  - https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
prerequisites: [./pod.md]
timestamp: 2026-06-28T10:00:00Z
---
A Deployment is a controller that keeps a declared number of identical Pod
replicas running, and manages safe rollouts of new Pod versions through a
ReplicaSet it owns.

Plain definition: you declare "I want 3 copies of this Pod template"; the
Deployment makes reality match that and re-creates Pods that die.

Precise: a Deployment owns a ReplicaSet, which owns Pods. A spec change creates a
new ReplicaSet and shifts replicas from old to new under a rollout strategy
(`RollingUpdate` by default, bounded by `maxSurge`/`maxUnavailable`). It is the
reconciliation loop — desired state in, observed state continuously corrected.
Taught by [Module 03](../guide/content/03-deployments.html).
