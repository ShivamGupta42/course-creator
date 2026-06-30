---
type: Concept
title: PersistentVolume and PersistentVolumeClaim
sources:
  - https://kubernetes.io/docs/concepts/storage/persistent-volumes/
prerequisites: [./pod.md]
timestamp: 2026-06-28T10:00:00Z
---
A PersistentVolume (PV) is a piece of cluster storage; a PersistentVolumeClaim
(PVC) is a Pod's request for storage of a given size and access mode. Binding a
PVC to a PV gives a Pod storage that outlives the Pod.

Plain definition: a Pod's own disk is erased when it dies. A PVC is how a Pod
rents a disk that survives, so a database keeps its data across restarts.

Precise: a StorageClass enables dynamic provisioning so a PVC creates a PV on
demand. Access modes (`ReadWriteOnce`, `ReadWriteMany`, `ReadWriteOncePod`)
constrain how many nodes/Pods can mount it; `ReadWriteOnce` ties the volume to
one node, which shapes where the Pod can schedule. Taught by
[Module 16](../course.md).
