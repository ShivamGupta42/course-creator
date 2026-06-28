---
type: Concept
title: ConfigMap and Secret
sources:
  - https://kubernetes.io/docs/concepts/configuration/configmap/
  - https://kubernetes.io/docs/concepts/configuration/secret/
prerequisites: [./pod.md]
timestamp: 2026-06-28T10:00:00Z
---
A ConfigMap holds non-confidential configuration as key/value pairs; a Secret
holds confidential data (tokens, passwords, keys) in the same shape but treated
specially by the API and stored base64-encoded.

Plain definition: both are external config you mount into a Pod so the same
image runs in dev, staging, and prod by swapping the data, not rebuilding.

Precise: either can be injected as environment variables or mounted as files.
Secrets are NOT encrypted by default at the object level (base64 is encoding, not
encryption); confidentiality depends on encryption-at-rest and RBAC. Env-injected
config does not update live; file-mounted config does, eventually. Taught by
[Module 12](../guide/content/12-config-secrets.html).
