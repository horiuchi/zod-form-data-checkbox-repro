# zod-form-data-checkbox-repro

Minimal reproduction of unexpected `zfd.checkbox()` behavior in `zod-form-data`.

## Run

```sh
npm install
npm run dev
```

## Run with Docker

```sh
docker build -t zod-form-data-checkbox-repro .
docker run --rm -p 5173:5173 zod-form-data-checkbox-repro
```

Open the local Vite URL, toggle the `accepted` checkbox, and submit the form.
The page shows both the raw `FormData` entries and the result of parsing the same
payload with:

```ts
zfd.formData({
  accepted: zfd.checkbox(),
});
```
