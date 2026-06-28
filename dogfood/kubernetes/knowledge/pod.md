---
type: Concept
title: Pod
sources:
  - https://kubernetes.io/docs/concepts/workloads/pods/
prerequisites: []
timestamp: 2026-06-28T10:00:00Z
---
A Pod is the smallest deployable unit in Kubernetes: one or more containers that
share a network namespace (one IP, one port space) and can share storage
volumes, scheduled together onto a single node and started/stopped as a unit.

Plain definition: the wrapper Kubernetes actually schedules and runs. You do not
hand it a container; you hand it a Pod, and the Pod holds the container.

Precise: a Pod has a single cluster-internal IP shared by its containers, a
lifecycle (`Pending` → `Running` → `Succeeded`/`Failed`), and is ephemeral — a
Pod is never rescheduled, it is replaced. Its name and IP do not survive a
restart. Taught by [Module 02](../guide/content/02-pods.html).
