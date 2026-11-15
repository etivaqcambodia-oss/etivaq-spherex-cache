# ETIVAQ SPHEREx cache (temporary)

This public repository is intended to hold **previously downloaded, unmodified or clearly identified processed NASA SPHEREx FITS cutouts** for ETIVAQ Global research. This is not a complete SPHEREx archive and does not replace IRSA.

## Intended structure

- `manifest.json`: validated per-file records (observation ID, source URI, target coordinates, cutout size, SHA-256, FITS extensions and provenance).
- `frames/`: previously cached IRSA discovery metadata, with source and retrieval dates where known.
- `cutouts/`: cached FITS cutouts, retained under their original hashed filenames.
- `scripts/`: validation and reproducible cache-generation tools.

## Access and migration

The ETIVAQ server should read a configurable `ETIVAQ_CACHE_URL` and use the same manifest format whether the base URL points to GitHub or future object storage. Cache lookup must verify matching observation and cutout parameters before use. Missing or invalid cache entries must fall back to the existing IRSA SIA/TAP discovery and IBE retrieval. A cached result must never be presented as proof that the live archive contains no other observations.

## Data integrity and limitations

- Never claim cached data is complete sky coverage.
- Preserve original FITS metadata, including spatial and wavelength WCS, flags, variance and units.
- Verify filenames and SHA-256 hashes before public serving.
- Treat cached cutouts separately from full original FITS frames.
- This repository is temporary; public object storage is the preferred long-term home.

## Current status

Repository initialized; dataset upload and manifest verification are pending.
