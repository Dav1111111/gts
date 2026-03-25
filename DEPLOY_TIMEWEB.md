# Deploy To Timeweb

This project is a static Vite build and can be served by `nginx`.

## Prerequisites

- Public IPv4 on the server
- SSH access with the key `~/.ssh/gts_timeweb_deploy`
- The repository available locally on your Mac

## First deploy

Run from the project root:

```bash
chmod +x scripts/deploy_timeweb.sh
./scripts/deploy_timeweb.sh
```

By default the script deploys to:

- Server: `root@46.149.67.209`
- SSH key: `~/.ssh/gts_timeweb_deploy`
- Web root: `/var/www/gts`

## Custom values

You can override defaults:

```bash
SERVER_IP=46.149.67.209 \
SERVER_USER=root \
SSH_KEY_PATH=~/.ssh/gts_timeweb_deploy \
./scripts/deploy_timeweb.sh
```

## What the script does

1. Builds the project with `npm run build`
2. Uploads the `build/` folder to `/var/www/gts`
3. Installs `nginx` on the server if needed
4. Enables the bundled `nginx` config
5. Reloads `nginx`

## Result

After deploy the site should be available at:

```text
http://46.149.67.209/
```
