#!/bin/bash

# Log
log() {
  CYAN='\033[0;36m'
  NONE='\033[0m'
  echo "${CYAN}$1${NONE}"
}

# Check ssh connection
log "Checking ssh connection..."
ssh -T git@github.com

# Pull docker image
log "Pulling docker image..."
docker pull ethereum/solc:0.4.23

# Update colonyNetwork submodules
log "Updating colonyNetwork submodules..."
git submodule update --init --recursive

# Provision colonyNetwork submodules
log "Provisioning colonyNetwork contracts..."
yarn run provision:token:contracts

# Migrate colonyNetwork contracts
log "Migrating colonyNetwork contracts..."
./node_modules/truffle/build/cli.bundled.js migrate --reset
