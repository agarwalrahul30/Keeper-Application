# Docker Containerized Keeper-Application

## Features -
- Two Applications :
    - Offers a to-do list with dynamic routing and automatic date change
    - Offers a credential keeping interface on a secure network (custom bridge network)
- Both of which uses isolated MongoDB storage 
- Implemented Volumes for persisting storage data
- Multi-stage build for optimizing image size and build time
- Effective usage of .dockerignore file
- Auto-Restarts containers unless they are stopped manually.

