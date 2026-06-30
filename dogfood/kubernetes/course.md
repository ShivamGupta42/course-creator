---
type: Course
title: Kubernetes Operations
timestamp: 2026-06-28T10:30:00Z
profile: ./PROFILE.md
audience: A software engineer who can run a single container with Docker but has never operated a cluster.
promise: Deploy, scale, observe, and debug real workloads on Kubernetes, and read the cluster when they break.
verification_mode: estimate + rubric, with some runnable (a kubectl manifest you can apply)
size: 25 modules, 3 tracks (9 / 9 / 7)
---

# Kubernetes Operations

Guiding question: how do you take one container you can run on your laptop and
make it survive, scale, and stay observable on a cluster you do not babysit?

The map below is the prerequisite graph. Each module links the canonical
concepts it teaches in `knowledge/`; the teaching prose lives only in `guide/`.

## Track 1 — Foundations: get one workload running and reachable (9 modules)

1. **From one container to a cluster** — what Kubernetes adds over `docker run`, the control loop idea.
   - teaches: (orientation; links [Pod](./knowledge/pod.md))
2. **Pods: the thing that actually runs** — one IP, shared lifecycle, why a Pod is ephemeral.
   - teaches: [Pod](./knowledge/pod.md)
3. **Deployments: keep N copies alive** — replicas, self-healing, the desired-state loop.
   - teaches: [Deployment](./knowledge/deployment.md)
4. **Services: a stable address for moving Pods** — selectors, ClusterIP, endpoints.
   - teaches: [Service](./knowledge/service.md)
5. **Labels and selectors** — how Deployments and Services find their Pods.
   - teaches: [Service](./knowledge/service.md), [Deployment](./knowledge/deployment.md)
6. **kubectl as your cluster console** — get/describe/logs/apply, reading status fields.
   - teaches: [Pod](./knowledge/pod.md)
7. **Namespaces and the object model** — scoping, the API as the source of truth.
   - teaches: (orientation; links [Pod](./knowledge/pod.md))
8. **Declarative manifests vs imperative commands** — why YAML and `apply` win for ops.
   - teaches: [Deployment](./knowledge/deployment.md)
9. **Foundations checkpoint: a reachable, self-healing app** — wire Pod+Deployment+Service.
   - teaches: [Pod](./knowledge/pod.md), [Deployment](./knowledge/deployment.md), [Service](./knowledge/service.md)

## Track 2 — Core toolkit: schedule, configure, expose, and store (9 modules)

10. **Scheduling: how a Pod lands on a node** — filtering and scoring, requests not usage.
    - teaches: [kube-scheduler](./knowledge/kube-scheduler.md)
11. **Requests and limits** — guarantees, throttling, OOM kills, QoS classes.
    - teaches: [Requests and Limits](./knowledge/requests-limits.md)
12. **Config and Secrets** — external config, env vs file mounts, what Secrets do and don't protect.
    - teaches: [ConfigMap and Secret](./knowledge/configmap-secret.md)
13. **Readiness and liveness probes** — two different questions, two different consequences.
    - teaches: [Readiness and Liveness Probes](./knowledge/probes.md)
14. **Cluster networking basics** — Pod-to-Pod, DNS, how a Service name resolves.
    - teaches: [Service](./knowledge/service.md)
15. **Ingress: one front door for many Services** — host/path routing, the controller, TLS.
    - teaches: [Ingress](./knowledge/ingress.md)
16. **Persistent storage** — PV/PVC, StorageClass, access modes and where they pin a Pod.
    - teaches: [PersistentVolume and PersistentVolumeClaim](./knowledge/persistentvolume.md)
17. **StatefulSets and stable identity** — when a Deployment is the wrong controller.
    - teaches: [PersistentVolume and PersistentVolumeClaim](./knowledge/persistentvolume.md), [Deployment](./knowledge/deployment.md)
18. **Autoscaling with the HPA** — the thermostat, metric vs request, why it needs requests.
    - teaches: [HorizontalPodAutoscaler](./knowledge/horizontalpodautoscaler.md)

## Track 3 — Operating in production: ship, observe, survive (7 modules)

19. **Rollouts and rollbacks** — RollingUpdate math, probes gating progress, the undo button.
    - teaches: [Rollout and Rollback](./knowledge/rollout.md)
20. **Zero-downtime deploys in practice** — maxSurge/maxUnavailable, PodDisruptionBudgets, graceful shutdown.
    - teaches: [Rollout and Rollback](./knowledge/rollout.md), [Readiness and Liveness Probes](./knowledge/probes.md)
21. **Observability: logs, events, metrics** — the three signals and what each answers.
    - teaches: [Workload Debugging and Failure Modes](./knowledge/debugging.md)
22. **Capacity planning and headroom** — bin-packing requests onto nodes, leaving slack for spikes.
    - teaches: [kube-scheduler](./knowledge/kube-scheduler.md), [Requests and Limits](./knowledge/requests-limits.md)
23. **Debugging failing workloads** — CrashLoopBackOff, Pending, OOMKilled, ImagePullBackOff.
    - teaches: [Workload Debugging and Failure Modes](./knowledge/debugging.md)
24. **Node failure and eviction** — what happens when a node dies, drains, or runs out of memory.
    - teaches: [kube-scheduler](./knowledge/kube-scheduler.md), [Pod](./knowledge/pod.md)
25. **Capstone: a resilient cluster for the Q3 launch** — capacity estimate + manifests + a survival drill.
    - teaches: [Deployment](./knowledge/deployment.md), [Service](./knowledge/service.md), [HorizontalPodAutoscaler](./knowledge/horizontalpodautoscaler.md), [Rollout and Rollback](./knowledge/rollout.md), [Workload Debugging and Failure Modes](./knowledge/debugging.md)

## Concept index

- [Pod](./knowledge/pod.md)
- [Deployment](./knowledge/deployment.md)
- [Service](./knowledge/service.md)
- [kube-scheduler](./knowledge/kube-scheduler.md)
- [Requests and Limits](./knowledge/requests-limits.md)
- [ConfigMap and Secret](./knowledge/configmap-secret.md)
- [Readiness and Liveness Probes](./knowledge/probes.md)
- [Ingress](./knowledge/ingress.md)
- [PersistentVolume and PersistentVolumeClaim](./knowledge/persistentvolume.md)
- [HorizontalPodAutoscaler](./knowledge/horizontalpodautoscaler.md)
- [Rollout and Rollback](./knowledge/rollout.md)
- [Workload Debugging and Failure Modes](./knowledge/debugging.md)

The two fully authored sample modules in this dogfood bundle are
[Module 11 — Requests and limits](./guide/content/11-requests-limits.html) and
[Module 19 — Rollouts and rollbacks](./guide/content/19-rollouts.html).
