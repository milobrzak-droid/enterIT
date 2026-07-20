# Homepage animation plans

| # | Title | Severity | Status |
|---|---|---|---|
| 001 | Replace generic homepage reveals with purposeful choreography | HIGH | COMPLETE |
| 002 | Make homepage scroll motion unmistakable | HIGH | COMPLETE |
| 003 | Remove text raster snaps and loading-line motion | HIGH | COMPLETE |
| 004 | Ship motion without stale cache or fallback flash | HIGH | COMPLETE |
| 005 | Preserve counter typography exactly | HIGH | COMPLETE |
| 006 | Keep reference metrics on one line | HIGH | COMPLETE |
| 007 | Stabilize every shared subpage scroll reveal | HIGH | COMPLETE |

## Recommended execution order

1. Plan 001 is complete and establishes the baseline motion runtime.
2. Execute plan 002. It supersedes the baseline scroll reveal amplitudes with visible View Timeline motion, counters and structural lines while preserving the working interaction fixes.
3. Execute plan 003. It preserves the visible motion from plan 002 while removing text scaling, counter completion snaps and loading-like line drawing.
4. Execute plan 004. It guarantees the corrected assets load and removes fallback initialization flashes and unnecessary layer promotion.
5. Execute plan 005. It prevents nested counter layers from inheriting label typography and ships the fix with a fresh cache key.
6. Execute plan 006. It keeps every localized reference metric on one line across responsive breakpoints.
7. Execute plan 007. It fixes the shared 56-page reveal lifecycle, removes nested motion owners and adds fail-open preparation before intersection.

## Dependencies

- Plan 001 has no external dependency and adds no package.
- Plan 002 depends on plan 001 and adds no package.
- Plan 003 depends on plan 002 and adds no package.
- Plan 004 depends on plan 003 and adds no package.
- Plan 005 depends on plan 004 and adds no package.
- Plan 006 depends on plan 005 and adds no package.
- Plan 007 is independent of homepage Plans 001–006 and adds no package. It regenerates only the 56 EnterIT subpages.
- Regenerate the four localized homepage files only after the shared homepage CSS and JavaScript are complete.
