---
type: Concept
title: Workload Debugging and Failure Modes
sources:
  - https://kubernetes.io/docs/tasks/debug/debug-application/
prerequisites: [./pod.md, ./probes.md, ./requests-limits.md]
timestamp: 2026-06-28T10:00:00Z
---
Debugging a Kubernetes workload means reading Pod status, events, and logs to map
a symptom (`CrashLoopBackOff`, `Pending`, `OOMKilled`, `ImagePullBackOff`) to its
cause, then changing the manifest or cluster to fix it.

Plain definition: the cluster tells you what is wrong through Pod phase, container
state, and events; debugging is learning to read those signals instead of
guessing.

Precise: `kubectl describe pod` surfaces the events and last-terminated reason;
`kubectl logs --previous` shows the crashed container's output; `Pending` is
almost always unschedulable (no node fits the requests) and `OOMKilled` is a
memory limit too low. The status field is the diagnostic, not the application
log. Taught by [Module 23](../course.md).
