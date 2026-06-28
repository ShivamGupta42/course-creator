---
type: LearnerState
title: Kubernetes Operations — learner state
timestamp: 2026-06-29T20:40:00Z
---
Where the learner stands per concept. The agent updates these rows from what it
observed in each session; nothing computes against them.

| Concept | Strength | Last seen | Review when | Note |
|---|---|---|---|---|
| [Pod](../knowledge/pod.md) | solid | 2026-06-27 | in two weeks | clean teach-back, got "Pods are replaced not repaired" |
| [Deployment](../knowledge/deployment.md) | solid | 2026-06-27 | in two weeks | understood the ReplicaSet ownership chain |
| [Service](../knowledge/service.md) | shaky | 2026-06-27 | next session | mixed up ClusterIP vs NodePort; readiness-gating still fuzzy |
| [Requests and Limits](../knowledge/requests-limits.md) | shaky | 2026-06-29 | next session | got CPU-throttle vs memory-OOM, still guesses at QoS class |
| [kube-scheduler](../knowledge/kube-scheduler.md) | new | — | after requests-limits | needed for capacity planning, not started |
| [ConfigMap and Secret](../knowledge/configmap-secret.md) | new | — | — | not started |
| [Readiness and Liveness Probes](../knowledge/probes.md) | new | — | before rollouts | not started; prerequisite for the zero-downtime goal |
| [Ingress](../knowledge/ingress.md) | new | — | — | not started |
| [PersistentVolume and PersistentVolumeClaim](../knowledge/persistentvolume.md) | new | — | — | needed for Postgres tier |
| [HorizontalPodAutoscaler](../knowledge/horizontalpodautoscaler.md) | new | — | after requests-limits | the 40→400 spike goal depends on this |
| [Rollout and Rollback](../knowledge/rollout.md) | shaky | 2026-06-29 | next session | applied a rollout, has not yet practiced a rollback unaided |
| [Workload Debugging and Failure Modes](../knowledge/debugging.md) | new | — | — | the Pending/OOMKilled diagnosis goal lives here |

Next session plan (agent's read of the above): re-teach [Service](../knowledge/service.md)
readiness-gating at lower load, then [Requests and Limits](../knowledge/requests-limits.md)
QoS at a faded rung, then introduce [Readiness and Liveness Probes](../knowledge/probes.md)
since it unblocks the rollout goal.
