#!/bin/bash
set -e

# very basic help message
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Usage: $(basename "$0") [INPUT_FILE] [OUTPUT_FILE]"
  echo "Encrypt environment file using SOPS with Age encryption."
  echo "Defaults: INPUT_FILE=.env, OUTPUT_FILE=.env.sops"
  exit 0
fi

# Default input file
INPUT_FILE=${1:-.env}
OUTPUT_FILE=${2:-.env.sops}

# Check if input exists
if [ ! -f "$INPUT_FILE" ]; then
  echo "❌ Input file not found: $INPUT_FILE"
  echo "Usage: $0 [input-file] [output-file]  # defaults are .env and .env.sops"
  exit 1
fi

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "❌ Error: Required command '$1' not found in PATH." >&2
    echo "ℹ️  Please refer to $2 for installation instructions." >&2
    exit 1
  fi
}

require_command age https://github.com/FiloSottile/age
require_command sops https://github.com/getsops/sops


# Check for sops.yaml file
if [ ! -f .sops.yaml ]; then
  echo "⚠️  Warning: .sops.yaml not found. Using default SOPS config."
fi

# Encrypt using SOPS (output to new file)
sops encrypt --input-type dotenv --output-type dotenv "$INPUT_FILE" > "$OUTPUT_FILE"

echo "✅ Encrypted $INPUT_FILE to $OUTPUT_FILE"
