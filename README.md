# EnterIT web

Statický vícejazyčný web bez build frameworku.

## Homepage

Homepage pro CZ, EN, DE a PL používají jeden společný design a generují se z jednoho zdroje:

- `scripts/homepage-content.mjs` — lokalizovaný obsah,
- `scripts/build-homepages.mjs` — společná HTML šablona,
- `assets/home.css` a `assets/home.js` — homepage vizuál a motion systém,
- `assets/site-shell.css` — společná hlavička, jazykový dropdown a patička,
- `index.html`, `en.html`, `de.html`, `pl.html` — vygenerované výstupy.

Po změně obsahu nebo šablony spusťte:

```sh
node scripts/build-homepages.mjs
```

## US partner landing page

Samostatná akviziční stránka pro americké konzultační firmy, Microsoft partnery
a systémové integrátory se generuje nezávisle od jazykových homepage:

- `scripts/us-content.mjs` obsahuje positioning a texty,
- `scripts/build-us.mjs` generuje `us/index.html`,
- `assets/us.css` a `assets/us.js` drží Enter vizuál a motion.

Po změně spusťte:

```sh
node scripts/build-us.mjs
```

## Produkční podstránky

Všech 56 produkčních podstránek EnterIT používá společný světlý design z
`assets/subpage.css` a sdílené chování z `assets/site-ui.js`. Jejich hlavička,
patička, jazykový dropdown a odkazy na homepage se obnoví příkazem:

```sh
node scripts/build-subpages.mjs
```

Skript záměrně neupravuje `old/`, noindex redesignová dema ani externí web EnterAI.

## Lokální spuštění

```sh
python3 scripts/serve-local.py --port 8000
```

Web poběží na [http://localhost:8000](http://localhost:8000). US landing page
je dostupná na [http://localhost:8000/us/](http://localhost:8000/us/).
