---
type: Mission
title: Staging app to a resilient cluster before Q3 launch
timestamp: 2026-06-28T09:00:00Z
---
Runs a Node.js + Postgres app that today lives on a single VM behind nginx. The
team is launching a marketing push in Q3 and expects request volume to jump from
~40 req/s steady to spikes near 400 req/s. The single VM falls over under load
and any deploy means a few seconds of downtime.

Goal: move the app to a Kubernetes cluster that survives a node dying, scales the
web tier under load, deploys with no dropped requests, and is observable enough
to debug at 2am. Has roughly five weeks, two evenings a week.

Success = can stand up the staging app on a 3-node cluster with a Deployment +
Service + HPA + Ingress, demonstrate a zero-downtime rollout and a rollback, and
correctly diagnose a `Pending` and an `OOMKilled` Pod from `kubectl` output
alone, unaided.

Anchors for this learner specialize to: the Node web tier, the Postgres data
tier, the 40→400 req/s spike, the 3-node cluster, and the Q3 deploy window. Use
those instead of generic examples.
