# COD I SII

Women's safety MVP for Somalia / Somaliland.

**Safety in your hands. Always.**

## Stack

- Expo + Expo Router
- React Native + TypeScript
- Zustand + AsyncStorage
- Expo Location, Sensors, SMS, Haptics
- React Native Maps

## Run in Expo Go

This project targets **Expo SDK 54**, which matches the App Store / Play Store Expo Go app.

```bash
nvm use 22
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone (same Wi‑Fi). Avoid “Open in web” for maps features — use the phone.

## Features

- Hold-to-activate SOS (3 seconds)
- Shake-to-activate (3 shakes)
- Trusted contacts with local persistence
- Emergency SMS composer + call actions
- Demo volunteer network
- Configurable emergency services
- Silent Mode + Quick Exit
- Digital safety Learn section
- First-launch onboarding

## Architecture

```
app/           Expo Router screens
components/    Reusable UI
features/      Feature-specific helpers
hooks/         Shake, SOS hold, location
services/      Location, SMS, emergency, volunteers (backend-ready)
store/         Zustand stores
theme/         Brand colors, type, spacing, shadows
data/          Local demo + learn content
```

Services are intentionally thin so they can later be swapped for a Supabase backend.
