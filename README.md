## Getting Started
Instrukcja do uruchomienia:
- cd next-table-app (kJeśli nie jest w tym folderze)
- npm run dev

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Aplikacja prezentuje funkcje sortowania, collapse dla danych w tabeli i dodawanie nowych wierszy do tabeli.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Schemat

next-table-app/
├── .next/
├── node_modules/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── records.json
│   ├── vercel.svg
│   └── window.svg
├── server/
│   ├── server.js
│   └── records.json
├── src/
│   ├── components/
│   │   └── table/
│   │       ├── data.js
│   │       ├── Table.js
│   │       ├── Table.module.css
│   │       ├── TableFooter.js
│   │       └── TableHeader.js
│   ├── pages/
│   │   ├── api/
│   │   │   └── users.js
│   │   ├── app.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── table.js
│   ├── styles/
│   │   ├── button.module.css
│   │   ├── globals.css
│   │   └── table.module.css
│   └── utils/
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
