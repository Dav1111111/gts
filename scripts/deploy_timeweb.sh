#!/usr/bin/env bash

set -euo pipefail

SERVER_IP="${SERVER_IP:-46.149.67.209}"
SERVER_USER="${SERVER_USER:-root}"
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/gts_timeweb_deploy}"
REMOTE_APP_DIR="${REMOTE_APP_DIR:-/var/www/gts}"
REMOTE_TMP_DIR="${REMOTE_TMP_DIR:-/tmp/gts-deploy}"
LOCAL_BUILD_DIR="${LOCAL_BUILD_DIR:-build}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new -i "$SSH_KEY_PATH")

echo "==> Building project"
cd "$ROOT_DIR"
npm run build

if [[ ! -d "$LOCAL_BUILD_DIR" ]]; then
  echo "Build directory '$LOCAL_BUILD_DIR' was not created"
  exit 1
fi

echo "==> Preparing remote directories on ${SERVER_USER}@${SERVER_IP}"
ssh "${SSH_OPTS[@]}" "${SERVER_USER}@${SERVER_IP}" "mkdir -p '${REMOTE_APP_DIR}' '${REMOTE_TMP_DIR}'"

echo "==> Uploading static build"
scp "${SSH_OPTS[@]}" -r "${ROOT_DIR}/${LOCAL_BUILD_DIR}/." "${SERVER_USER}@${SERVER_IP}:${REMOTE_APP_DIR}/"

echo "==> Uploading nginx config"
scp "${SSH_OPTS[@]}" "${ROOT_DIR}/deploy/nginx/gts.conf" "${SERVER_USER}@${SERVER_IP}:${REMOTE_TMP_DIR}/gts.conf"

echo "==> Configuring nginx"
ssh "${SSH_OPTS[@]}" "${SERVER_USER}@${SERVER_IP}" "\
  apt-get update && \
  apt-get install -y nginx && \
  cp '${REMOTE_TMP_DIR}/gts.conf' /etc/nginx/sites-available/gts && \
  ln -sf /etc/nginx/sites-available/gts /etc/nginx/sites-enabled/gts && \
  rm -f /etc/nginx/sites-enabled/default && \
  nginx -t && \
  systemctl enable nginx --now && \
  systemctl reload nginx"

echo "==> Deployment completed"
echo "Open: http://${SERVER_IP}/"
