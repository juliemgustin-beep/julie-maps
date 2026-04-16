# Julie's Map

A simple mobile-friendly Maps launcher. The public frontend contains only destination labels and keys. Real addresses live only in a private Cloudflare Worker secret.

## Why This Changed

The old GitHub Pages version kept real addresses in `script.js`. That made the app easy to host, but every address was visible to anyone who could view the public site files.

When the repository was made private, the GitHub Pages site stopped being publicly usable because GitHub Pages is tied to repository visibility and account Pages settings. A public frontend needs public files, so the safe pattern is:

- GitHub Pages hosts the public UI.
- The UI links to safe routes like `/go/home`.
- A Cloudflare Worker privately maps each route key to a real address.
- The Worker redirects to Apple Maps.

## Public Files

Safe to publish:

- `index.html`
- `styles.css`
- `script.js`
- `julies-map-icon.png` or your app icon file
- `worker/index.js`
- `wrangler.jsonc`
- `destinations.example.json`
- `README.md`

Do not publish real addresses in any file.

## How Destinations Work

The frontend in `script.js` contains only labels and route keys:

```js
{ key: "home", name: "Home" }
```

Buttons point to:

```text
/go/home
```

The Worker reads the real address from the private `DESTINATIONS_JSON` secret and redirects to:

```text
https://maps.apple.com/?daddr=ENCODED_ADDRESS&dirflg=d
```

## 1. Deploy The Cloudflare Worker

Install Wrangler through `npx` and log in:

```sh
npx wrangler login
```

Deploy the Worker from this folder:

```sh
npx wrangler deploy
```

Cloudflare will print a Worker URL, usually like:

```text
https://julies-map-redirects.YOUR_SUBDOMAIN.workers.dev
```

## 2. Add Private Addresses As A Worker Secret

Open `destinations.example.json`, copy it somewhere private, and replace each placeholder with the real address.

Then set the secret:

```sh
npx wrangler secret put DESTINATIONS_JSON
```

Paste the full JSON when Wrangler asks for the secret value.

Cloudflare's Wrangler secret command stores the value as a secret and deploys a new Worker version. The secret value is hidden from the public repo and Cloudflare dashboard views.

## 3. Point The Frontend At The Worker

Open `script.js` and set `WORKER_BASE_URL` to your deployed Worker URL:

```js
const WORKER_BASE_URL = "https://julies-map-redirects.YOUR_SUBDOMAIN.workers.dev";
```

If you later put the Worker and frontend on the same domain, you can leave it blank:

```js
const WORKER_BASE_URL = "";
```

## 4. Publish The Frontend On GitHub Pages

Upload or push these public files to a public GitHub repository:

- `index.html`
- `styles.css`
- `script.js`
- your icon PNG
- `README.md`

In GitHub:

1. Open repository Settings.
2. Open Pages.
3. Choose `Deploy from a branch`.
4. Select your main branch and `/ (root)`.
5. Save.

## 5. Test

Test the Worker directly:

```text
https://YOUR_WORKER_URL/go/home
```

It should redirect to Apple Maps.

Test the GitHub Pages app:

1. Open the public GitHub Pages URL.
2. Tap a destination.
3. Confirm it opens Apple Maps.

## Updating Destinations

To add a new destination:

1. Add a safe key and label in `script.js`.
2. Add the same key with the private address to the `DESTINATIONS_JSON` secret.
3. Run `npx wrangler secret put DESTINATIONS_JSON` again with the updated JSON.

Never put real addresses in `script.js`, `README.md`, or any public file.
