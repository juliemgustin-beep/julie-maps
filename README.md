# Julie Maps

Simple mobile-first web app for launching Apple Maps directions from large iPhone-friendly buttons.

## Files

- `index.html` - main single-page app
- `styles.css` - dark mode minimalist styling
- `script.js` - destination data and button generation

## Edit Destinations

Open `script.js` and update the `destinations` array at the top of the file.

Each destination is converted into an Apple Maps driving directions link using:

`https://maps.apple.com/?daddr=DESTINATION&dirflg=d`

## Deploy To GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your main branch and the `/ (root)` folder.
6. Save the settings and wait for GitHub Pages to publish the site.

## Notes

- Keep `index.html` in the repository root for GitHub Pages.
- The app uses relative file paths, so no path changes are needed for deployment.
- For the best iPhone experience, open the deployed site in Safari and choose `Add to Home Screen`.
