# Biromarket 024 – prototip novog sajta

**Pogledaj sajt:** https://daniel-zec.github.io/BIROMARKET024/

## React verzija (koren repozitorijuma)
- Vite + React 18 + [micro-motion](vendor/micro-motion-1.0.0.tgz) (Button, Toast, Count, Fly, Collapse, Segmented, Meter, States, Swap…)
- Stranice: `src/pages/` – `Home`, `Servis`, `Fotokopirnica`, `Kancelarija`, `CreativeShop`
- Zajedničke komponente: `src/components/` – meni, logo, toast, korpa sa „fly to cart“
- Boje po brendu: `src/styles.css` (`[data-brand='creative']`)
- Pokretanje: `npm install` pa `npm run dev`
- Svaki push na `main` automatski objavljuje sajt (GitHub Actions → Pages)
- Fotografije: `public/img/` – sa biromarket024.rs i Pexels (izvori u `public/img/IZVORI-pexels.txt`)

## Prvi prototip (Claude Design platno)

Prototip nove naslovne strane i početnih strana četiri sekcije za [biromarket024.rs](https://www.biromarket024.rs/) (Subotica, od 1995).

| Fajl | Stranica |
|---|---|
| `prototip/Main.dc.html` | Naslovna – 4 bloka (2 u redu) koji vode na sekcije |
| `prototip/Servis.dc.html` | Servis i prodaja kopir aparata – prijava kvara / naručivanje tonera |
| `prototip/Fotokopirnica.dc.html` | Fotokopirnica i štampa – slanje fajla, galerija radova |
| `prototip/Kancelarija.dc.html` | Online prodavnica kancelarijskog materijala (samo izgled) |
| `prototip/CreativeShop.dc.html` | Creative Shop – majice i pokloni (samo izgled) |
| `prototip/canvas.json` | Raspored stranica na dizajn platnu |

## Dizajn
- Font: **Roboto** svuda; iste komponente na svim stranama, boje po brendu.
- Stil: „Apple" – zamućeno staklo (backdrop blur), meke senke, zaobljene ivice.
- Biromarket: crvena `#FF0000` (logo `#E82F37`) + neutralne boje.
- Creative Shop: `#ED1C24 #EE7D15 #F7BE43 #BDCF37 #55B976 #437E81 #823967 #A0586A`, pozadina `#FBFAF6`.
- Mikrointerakcije po pravilima paketa *micro-motion* (pritisak, toast, rolanje brojeva, otvaranje FAQ-a, traka napretka).

## Napomena
Fajlovi su u formatu Claude Design platna (`.dc.html`) – nisu samostalan sajt.
Fotografije su na platnu (`/_blob/...`) i nisu deo ovog repozitorijuma.
Ovo je prototip: forme i korpa ništa ne šalju, cene u prodavnici su `[cena]`.
