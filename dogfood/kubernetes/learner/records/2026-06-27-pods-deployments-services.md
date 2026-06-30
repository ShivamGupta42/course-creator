---
type: LearningRecord
covers: [../../knowledge/pod.md, ../../knowledge/deployment.md, ../../knowledge/service.md]
timestamp: 2026-06-27T21:30:00Z
---
Session one. Worked Modules 02–04 against a kind cluster on the laptop.

Pods landed fast: the "one IP shared by the containers, Pod is replaced not
repaired" framing clicked when they deleted a Pod and watched a new one come back
with a new name and IP. Used the single-VM-to-cluster mission to motivate it.

Deployments also solid. They drew the Deployment → ReplicaSet → Pod ownership
chain unprompted and predicted correctly that editing the Pod template spawns a
new ReplicaSet.

Service was the sticky one. They could create a ClusterIP and curl it from
another Pod, but conflated ClusterIP with NodePort and were surprised that a Pod
failing readiness silently drops out of the Service endpoints. We re-ran the
endpoints view (`kubectl get endpointslices`) after killing readiness on one Pod
and that started to land, but it is not automatic yet.

Open gap: readiness-gating of Service traffic. Leave Service at `shaky` and
re-teach it next session before probes. Did not touch requests/limits or
scheduling.
