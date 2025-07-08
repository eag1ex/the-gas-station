#!/bin/bash

INPUT="sql/create.sql"
OUTPUT="sql/create-sqlite.sql"

cat "$INPUT" \
  | sed 's/AUTO_INCREMENT//g' \
  | sed 's/INT(/INTEGER(/g' \
  | sed 's/ int / integer /g' \
  | sed 's/on update CURRENT_TIMESTAMP//g' \
  | sed 's/CHARACTER SET utf8 COLLATE utf8_unicode_ci//g' \
  > "$OUTPUT"

echo "✅ Converted MySQL SQL to SQLite-compatible SQL at $OUTPUT"
