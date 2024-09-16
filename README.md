# Server Monitoring Frontend

Server Monitoring Frontend using ReactJs.

## Usage

1. Clone project
2. Create `.env` file, copy content from [.env.example](./.env.example) to `.env` file and config in `.env`:
  
- Config Runtime Environment

```
# development or documention
VITE_ENV=local
VITE_API_URL=http://localhost:3001

# secret key to decrypt data
VITE_SECRET_KEY=
```

3. Install package & setup

```bash
npm install
```

4. Runs the app

- On `Local`

```bash
npm run dev
```

- On `development` or `documention`

```bash
npm run build
```