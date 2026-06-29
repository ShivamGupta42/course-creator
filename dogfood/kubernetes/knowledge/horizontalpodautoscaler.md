---
type: Concept
title: HorizontalPodAutoscaler
sources:
  - https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
prerequisites: [./deployment.md, ./requests-limits.md]
timestamp: 2026-06-28T10:00:00Z
---
A HorizontalPodAutoscaler (HPA) is a controller that changes a Deployment's
replica count to keep an observed metric (commonly CPU utilization as a percent
of request) near a target.

Plain definition: a thermostat for replicas. Set "keep CPU at 60% of request";
the HPA adds Pods when the average runs hot and removes them when it runs cool.

Precise: desired replicas = ceil(current × currentMetric / targetMetric). CPU
utilization is measured against the **request**, so an HPA on a Pod with no CPU
request cannot compute a percentage and does nothing. It needs a metrics source
(metrics-server) and has a stabilization window to avoid flapping. Taught by
[Module 18](../course.md).
