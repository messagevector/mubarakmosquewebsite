# Mubarak Mosque website

Modern, responsive site for [Mubarak Mosque](https://mubarakmosque.us) in Chantilly, Virginia.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live data

- **Prayer times** come from the Google Sheet Summary tab (`PRAYER_SHEET_ID`). The tab must remain viewable by anyone with the link.
- **Events** come from the public Google Calendar ICS feed for `mubarakmosque@gmail.com`.

Copy `.env.example` to `.env.local` if you need to change the contact form address.

## Pages

Public: `/` `/about` `/services` `/hall` `/gym` `/contact` `/calendar`

Unlisted kiosk/display: `/tawheed` `/tvin` `/tvout`

Legacy TV URLs `/tvinside` and `/tvoutside` redirect to the shorter slugs.
