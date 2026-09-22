# eps-fdsudm-api
Repository for FDS UDM API

## Backend deployment (Azure App Service)

### 1) GitHub workflow
This repository includes:
- `.github/workflows/build-deploy.yml`
- `.github/workflows/deploy.yml`

Trigger deployment by:
- push to `main`, or
- manual run of **Build & Deploy** workflow.

### 2) Required GitHub secrets
Set these repository secrets:
- `ARM_CLIENT_ID`
- `ARM_SUBSCRIPTION_ID`
- `ARM_TENANT_ID`

### 3) App Service configuration
In Azure Portal -> App Service -> Configuration, set:
- `ASPNETCORE_ENVIRONMENT` = `Production`
- `ConnectionStrings__UDM_2` = SQL connection string for the UDM database

### 4) CORS (frontend access)
Set allowed frontend origins using:
- `Cors__AllowedOrigins__0` = deployed frontend URL (for example `https://fds-udm-ui-dev.azurewebsites.net`)

You can add more origins with:
- `Cors__AllowedOrigins__1`
- `Cors__AllowedOrigins__2`

### 5) Verify after deploy
Check:
- `https://<api-app-name>.azurewebsites.net/ping`
- `https://<api-app-name>.azurewebsites.net/ping/db`

If both pass, configure frontend `VITE_BE_URL` to the deployed API base URL and redeploy frontend.
