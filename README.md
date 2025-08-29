# BFHL REST API (POST /bfhl)

A minimal Node.js implementation for the BFHL assignment. You can run it locally with Express **or** deploy to Vercel (serverless).

## 1) Configure identity
Set these environment variables (locally or on your hosting provider):
- `FULL_NAME` — e.g. `john doe`
- `DOB_DDMMYYYY` — e.g. `17091999`
- `EMAIL` — e.g. `john@xyz.com`
- `ROLL_NUMBER` — e.g. `ABCD123`

> The `user_id` will be built as `full_name_ddmmyyyy` in lowercase.

## 2) Run locally (Express)
```bash
npm install
npm start
# App runs on http://localhost:3000
```

### Test
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d "{\"data\":[\"a\",\"1\",\"334\",\"4\",\"R\",\"$\"]}"
```

## 3) Deploy to Render/Railway
- Push the project to a public GitHub repo.
- Create a **Web Service** from the repo.
- Set start command to `node index.js` (already in Procfile).
- Add environment variables.
- Deploy and use POST `/<your-host>/bfhl`.

## 4) Deploy to Vercel
- Push the project to a GitHub repo.
- Import into Vercel. It will detect the `api/bfhl.js` function.
- Add environment variables in Vercel project settings.
- Your POST endpoint will be `https://<your-app>.vercel.app/bfhl`.

## Payload & Response
Send:
```json
{ "data": ["a","1","334","4","R","$"] }
```
Response includes:
- `is_success` (boolean)
- `user_id` (`full_name_ddmmyyyy`)
- `email`, `roll_number`
- `odd_numbers`, `even_numbers`
- `alphabets` (uppercase only)
- `special_characters`
- `sum` (string)
- `concat_string` (reverse token order, reverse each token's chars, then alternating caps over entire string)
```
