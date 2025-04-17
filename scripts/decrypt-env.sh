#!/bin/bash
set -e

# very basic help message
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Usage: $(basename "$0") [KEY_FILE] [INPUT_FILE] [OUTPUT_FILE]"
  echo "Decrypt environment file using SOPS with Age encryption."
  echo "Defaults: KEY_FILE=\$SOPS_AGE_KEY_FILE, INPUT_FILE=env.sops, OUTPUT_FILE=.env"
  exit 0
fi

# Path to private key (customize or allow override)
KEY_FILE=${1:-$SOPS_AGE_KEY_FILE}

# override the default if needed
INPUT_FILE=${2:-env.sops}
OUTPUT_FILE=${3:-.env}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "❌ Error: Required command '$1' not found in PATH." >&2
    echo "ℹ️  Please refer to $2 for installation instructions." >&2
    exit 1
  fi
}

require_command age https://github.com/FiloSottile/age
require_command sops https://github.com/getsops/sops

# Make sure key exists
if [ ! -f "$KEY_FILE" ]; then
  echo "❌ Private key not found: $KEY_FILE"
  echo "Set SOPS_AGE_KEY_FILE to override."
  exit 1
fi

# Make sure input file exists
if [ ! -f "$INPUT_FILE" ]; then
  echo "❌ Encrypted input file not found: $INPUT_FILE"
  exit 1
fi

# Make sure the output file does not exist
if [ -f "$OUTPUT_FILE" ]; then
  echo "❌ Output file already exists: $OUTPUT_FILE"
  echo "Please remove or rename this file."
  exit 1
fi

# Decrypt
SOPS_AGE_KEY="$(cat "$KEY_FILE")" sops decrypt --input-type dotenv --output-type dotenv "$INPUT_FILE" > "$OUTPUT_FILE"
chmod 600 "$OUTPUT_FILE"

echo "✅ Decrypted $INPUT_FILE to $OUTPUT_FILE"
