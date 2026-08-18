#!/usr/bin/env bash
set -euo pipefail

: "${POSTGRES_HOST:?POSTGRES_HOST is required}"
: "${POSTGRES_USER:?POSTGRES_USER is required}"
: "${POSTGRES_PASSWORD:?POSTGRES_PASSWORD is required}"
: "${POSTGRES_DB:?POSTGRES_DB is required}"
: "${GCS_BUCKET:?GCS_BUCKET is required}"

FILENAME="backup-$(date +%Y%m%d-%H%M%S).sql"
TMPFILE="/tmp/${FILENAME}"

echo "Dumping ${POSTGRES_DB} from ${POSTGRES_HOST}..."

PGPASSWORD="$POSTGRES_PASSWORD"
export PGPASSWORD
pg_dump -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" > "$TMPFILE"

echo "Dump complete: $(du -h "$TMPFILE" | cut -f1)"

echo "Uploading to gs://${GCS_BUCKET}/${FILENAME}..."
gcloud storage cp "$TMPFILE" "gs://${GCS_BUCKET}/${FILENAME}"

rm -f "$TMPFILE"
echo "Backup complete: ${FILENAME}"