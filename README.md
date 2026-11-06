# StreamBox React

StreamBox is the React + Vite version of the video-streaming project. It is
organized into two simple modules:

- **User module:** create an account, log in, browse and search videos, watch
  videos, like them, save a watchlist, and view a profile.
- **Admin module:** log in, view dashboard totals and registered users, and add,
  edit, or delete videos.

## Run on your computer

Open a terminal in this `react` folder and run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Create a user account on the sign-up
screen to try the user module.

The classroom admin account is:

- Email: `admin@gmail.com`
- Password: `admin123`

## Deploy on Vercel

1. Push the project to GitHub.
2. In Vercel, import the GitHub repository.
3. Set **Root Directory** to `react`.
4. Use `npm run build` as the build command and `dist` as the output directory.
5. Deploy, then open the Vercel URL and test both modules.

Vite's single-page app uses hash navigation, so its pages work on Vercel without
extra route-rewrite settings.

## Local Storage note

This is a beginner classroom demo, not production authentication. Account
passwords and the demo admin check are stored or checked in browser code. Do
not use real passwords or sensitive information. A real application needs a
secure server and database.
