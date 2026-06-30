---
type: LearningRecord
covers: [../../knowledge/requests-limits.md, ../../knowledge/rollout.md]
timestamp: 2026-06-29T21:15:00Z
---
Session two. Worked Module 11 (requests/limits) and Module 19 (rollouts) against
the staging Deployment.

Requests/limits: the compressible-vs-incompressible split landed well. They
predicted correctly that a CPU limit throttles and a memory limit OOM-kills, and
the lab where they set a 64Mi limit on the Node web tier and watched it get
`OOMKilled` made it concrete. QoS class is still guessed rather than reasoned:
they did not reliably name `Guaranteed` vs `Burstable` from a manifest. Leave at
`shaky`, push a faded QoS-classification rung next time.

Rollouts: ran a RollingUpdate on the web Deployment with maxSurge=1,
maxUnavailable=0 and watched old/new ReplicaSet replica counts shift. The
"readiness gates the rollout" idea connected to last session's Service gap, which
was a nice reinforcement. They have NOT done a rollback unaided yet; we ran out
of time before `kubectl rollout undo`. That is the next independent task, and it
is on the critical path for the Q3 zero-downtime goal.

Open gaps: QoS classification, rollback unaided, and they still want probes
before they will trust a production rollout. Next session: probes (Module 13),
then a rollback drill.
