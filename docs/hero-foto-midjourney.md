# Hero pozadí — zadání pro Midjourney

Čtyři snímky, které se v hlavičce prolínají po osmi sekundách. Tenhle dokument
je pro **první z nich** (`assets/decor/firmy.webp`), který je jediný v nízkém
rozlišení a je potřeba ho nahradit.

## Co s tou fotkou web dělá

Než začneš vybírat kompozici, tohle je podstatnější než motiv:

| | |
|---|---|
| Plocha | 1440 × 455 CSS px, poměr **3,16 : 1** |
| Cílová šířka souboru | **min. 2800 px** (retina 2× a drift 1,16×) |
| Ořez | `object-fit: cover`, `object-position: center 40%` — svisle se ořízne, drží se pás nad středem |
| Úprava | `grayscale(1) contrast(1.05) brightness(.55)` — **černobílá a ztmavená na 55 %** |
| Závoj | Navy plná do 34 % šířky, 92 % v polovině, 74 % vpravo |
| Pohyb | Zoom 1,04 → 1,16 a posun ~48 px za 8 sekund |

Z toho plynou tři pravidla:

1. **Subjekt patří do pravé třetiny.** Levá polovina je pod textem a je prakticky
   neviditelná. Fotka s hlavním dějem uprostřed vlevo je vyhozená.
2. **Potřebuje tonální odstup, ne barvu.** Po odbarvení a ztmavení na 55 % splyne
   tmavé oblečení s tmavým pozadím. Chce to světlo za postavami nebo z boku —
   okno, prosvětlená stěna, monitor.
3. **Nech vzduch nahoře i dole.** Svislý ořez ubere zhruba třetinu výšky a drift
   ještě přizoomuje. Hlavy u horní hrany se uříznou.

## Prompty

Tři varianty. Všechny mají stejný závěr s parametry — mění se jen scéna.

### A — otevřený prostor, tým u stolů (nejblíž tomu, co tam je dnes)

```
documentary photograph of a small software team working in a bright open-plan
office, four people at desks with monitors, one standing and pointing at a
screen, large industrial windows on the right filling the room with cool
daylight, exposed brick and pale walls, laptops and coffee cups, candid
unposed moment, shot on 35mm at f/2, shallow depth of field, muted natural
palette, subjects grouped in the right third of the frame, empty floor and
desks in the left third --ar 16:9 --style raw --stylize 50 --q 2 --v 7
```

### B — dvojice u monitoru, zbytek kanceláře rozostřený

```
documentary photograph of two software engineers side by side at a desk
looking at the same monitor, one gesturing at the screen, open-plan office
behind them out of focus, tall window to their right, cool northern daylight,
plants and cables and paper on the desk, candid working moment, shot on 50mm
at f/1.8, natural colour, the pair placed in the right third of the frame,
open desk surface running away to the left --ar 16:9 --style raw --stylize 50
--q 2 --v 7
```

### C — celek kanceláře s hloubkou, lidé menší v záběru

```
wide documentary photograph of a working software office in the late
afternoon, several people at desks across two rows, monitors glowing, one
person walking through the frame, tall windows along the right wall, long
shadows, dust in the light, quiet ordinary workday, shot on 24mm at f/4,
natural colour, activity concentrated on the right side of the frame, empty
foreground desk on the left --ar 16:9 --style raw --stylize 50 --q 2 --v 7
```

## Parametry a proč

| Parametr | Proč |
|---|---|
| `--ar 16:9` | Web ořezává na 3,16 : 1, takže 16:9 dá dost zásoby na svislý ořez i na drift. Užší poměr by po ořezu neměl kam ustoupit. |
| `--style raw` | Vypne „hezký" Midjourney nádech. Bez toho vypadá výstup jako reklamní vizuál, ne jako fotka z kanceláře. **Tenhle parametr je nejdůležitější.** |
| `--stylize 50` | Nízká hodnota drží model u zadání. Výchozích 100 už si začne vymýšlet. |
| `--q 2` | Víc detailu. Volitelné, stojí to víc GPU minut. |
| `--v 7` | Aktuální model. Když bude mezitím novější, použij ten. |

Když se do záběru pletou věci, co tam nechceš, přidej na konec:

```
--no text, watermark, logo, signage, phone screens, meeting room, whiteboard, suits, handshake, stock photo posing
```

`whiteboard` je tam schválně — tabule už je na druhém snímku a nechceme dva
stejné motivy v jedné smyčce.

## Rozlišení

Základní výstup je zhruba 1456 × 816. To **nestačí**, chce to přes 2800 px:

1. Vyber si variantu → **Upscale (Subtle)**. Zdvojnásobí na ~2912 × 1632.
2. Nesahej na **Upscale (Creative)** — ten si domýšlí detail a u tváří to bývá
   znát. U pozadí, které je stejně odbarvené a ztmavené, není co získat.

Když bude výsledek 2912 px široký, je to hotové.

## Co poslat

Ulož **PNG nebo JPG v plném rozlišení** do `~/Downloads`. Nic nepřevádět,
neořezávat, neupravovat jas — všechno ostatní udělá build:

- ořez na pracovní poměr a odstranění případného vodoznaku,
- převod do WebP (ostatní tři mají 55–120 kB),
- uložení jako `assets/decor/firmy.webp`.

Odbarvení a ztmavení dělá CSS za běhu, takže **posílej barevný originál** —
kdyby se někdy měnil filtr, je z čeho brát.

## Poznámka

Tyhle snímky jsou generované, ne fotky lidí z Enteru. Na pozadí hlavičky, kde
jsou odbarvené, ztmavené a z větší části schované pod závojem, to obstojí. Na
stránkách, které tvrdí fakta o týmu, jsou to zástupné obrázky do skutečného
focení — viz `docs/foto-shot-list.md`.
