# claude-seo — vurdering og integrasjonsplan

*Skrevet 2026-08-01. Kilde: [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) — MIT-lisensiert Claude Code-plugin, 25 sub-skills + 18 agenter, 13k stjerner. Kjernen fungerer uten API-nøkler. Vurdert mot det som allerede finnes: `STRATEGI-2026.md`, `lokal-synlighet-sjekkliste.md`, endalsbygg-siden og AP Consulting-siden.*

**Installasjon (kjør selv i chatten):**
```
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
/seo setup
```

---

## 1. Erstatter/verifiserer manuelt arbeid som allerede er gjort

Disse kommandoene gjør automatisk det jeg (Claude) gjorde manuelt i `STRATEGI-2026.md`s tekniske gjennomgang. Kjør dem for å verifisere at fiksene faktisk holder, og for å fange opp det som ble oversett.

| Kommando | Erstatter/verifiserer | Kjør på |
|---|---|---|
| `/seo audit <url>` | Hele avsnitt 2 i STRATEGI-2026.md (teknisk analyse) | Begge sider, nå |
| `/seo technical <url>` | Samme, men 9 kategorier i dybden | Begge sider |
| `/seo schema <url>` | Schema jeg skrev manuelt for endalsbygg (`HomeAndConstructionBusiness`) og AP Consulting (`ProfessionalService`) | Begge — sjekk om noe mangler (geo-koordinater, åpningstider) |
| `/seo images <url>` | Punkt 10 i STRATEGI-2026.md (ingen lazy-loading, store bilder) — samme problem flagget for endalsbygg sitt Pixabay-galleri | Begge |
| `/seo local <url>` | Avsnitt 2-3 i `lokal-synlighet-sjekkliste.md` — GBP-signaler, NAP-konsistens, anmeldelser | endalsbygg (når domenet er live), AP Consulting |

**Prioritet:** kjør `/seo audit` på anderspconsulting.no først (samme dogfood-prinsipp som GBP-oppsettet), deretter på endalsbygg så snart `endalsbygg.no` er koblet til og `noindex` er fjernet.

---

## 2. Ny kapasitet — ting som IKKE står i den eksisterende planen, men bør legges til

| Kommando | Hva den gir | Hvorfor det er verdt å legge til |
|---|---|---|
| `/seo google [kommando]` | GSC + PageSpeed + GA4 + PDF-rapporter, kredensial-veiviser | Løser punkt 4 i STRATEGI-2026.md ("Ingen analytics — kritisk") direkte, og genererer **klientklare PDF-rapporter**. Dette er det største enkeltfunnet — se produktifisering under |
| `/seo maps [kommando]` | Geo-grid rank tracking + GBP-audit + konkurrentradius | Kan vise **før/etter-kart** for hvor en kunde rangerer i kartpakken rundt Ålesund/Bergen — sterkt salgsbevis for lokale-nettsider-kunder |
| `/seo content-brief <tema>` | Målord, disposisjon, interne lenker | Bruk direkte til å skrive de 3 guidene i STRATEGI-2026.md avsnitt 7.3, og til `/bransje/handverker`-innholdet |
| `/seo cluster <søkeord>` | SERP-basert semantisk klynging | Hjelper deg bestemme hva de resterende sidene i hub-and-spoke-strukturen (avsnitt 4) faktisk skal handle om, i stedet for å gjette |
| `/seo geo <url>` | AI Overviews/GEO-analyse | Overlapper med `ai-seo`-skillen vi allerede brukte manuelt — kjør denne for å verifisere at `/llms.txt` og `/tjenester.md` faktisk er godt strukturert når de er laget |
| `/seo competitor-pages <url>` | Genererer sammenligningssider automatisk | Matcher innsikten fra `ai-seo`-skillen om at sammenligningsartikler er mest siterte innholdstype — kan generere "AI-konsulent vs. byrå vs. gjør-det-selv" nevnt der |
| `/seo drift baseline\|compare\|history` | SQLite-øyeblikksbilder over tid | Gir deg faktisk måling mot 90-dagers-måltallene i STRATEGI-2026.md avsnitt 9, i stedet for manuell sjekk |
| `/seo sitemap <url\|generate>` | Analyser/generer XML sitemap | Trengs når de ~16 sidene i avsnitt 4 faktisk bygges |
| `/seo backlinks <url>` | Moz/Bing/Common Crawl-analyse | Mål effekten av outreach mot norskbyggebransje.no og gjesteinnlegg nevnt i fagarbeid-planen |
| `/seo programmatic <url>` | Programmatisk SEO med innebygd doorway-page-vakt (30-siders varsel, 50-siders stopp) | Nyttig **sikkerhetsnett** hvis sted-sidene (Bergen/Ålesund/Stavanger) noensinne skal skaleres — matcher advarselen i STRATEGI-2026.md om at doorway pages straffes |

---

## 3. Gratis extensions verdt å skru på nå

| Extension | Hvorfor |
|---|---|
| `/seo bing [kommando]` | Bing Webmaster Tools + IndexNow — gratis, rask indeksering på enda et søkemotor. Ingen grunn til å ikke ha det |
| `/seo unlighthouse <url>` | Kjører lokalt, gratis. Multi-side Lighthouse — mål LCP under 2,0s-målet fra STRATEGI-2026.md på tvers av alle sidene når de er bygget |

**Ikke prioriter ennå (krever betalte kontoer/API-nøkler):** DataForSEO, Ahrefs, SE Ranking, Profound, Firecrawl. Vurder disse når du har inntekt fra 2-3 lokale-nettsider-kunder til å forsvare kostnaden — ikke før.

---

## 4. Produktifisering — dette gjør 19 000 kr-pakken sterkere

`/seo google`s PDF-rapport-funksjon (WeasyPrint, A4-layout, matplotlib-grafer) er den enkeltfunksjonen som gjør mest for salgbarheten din. I stedet for å love "lokal synlighet" abstrakt, kan du levere:

1. **Før-rapport** ved oppstart av et prosjekt (`/seo audit` + `/seo local` som PDF) — viser kunden konkret hva som mangler
2. **Etter-rapport** 60-90 dager senere (`/seo drift compare`) — viser konkret fremgang, med `/seo maps`-kartdata som bevis på bedre kartposisjon

Dette er nøyaktig den typen "tall som helter"-bevis STRATEGI-2026.md avsnitt 5 (designretning) og avsnitt 6 (bevis) etterspør — og gir deg en ekstra, differensierende leveranse ingen konkurrent i `STRATEGI-2026.md`s konkurrentliste (Ramora, Astar, Wollum osv.) nevner at de tilbyr.

**Oppdater `lokal-synlighet-sjekkliste.md` med et nytt punkt:** "Kjør `/seo audit` + `/seo local` og lever PDF-rapport til kunden ved oppstart og etter 60-90 dager."

---

## 5. Ikke relevant / lav prioritet nå

- `/seo ecommerce` — ingen av kundene driver nettbutikk
- `/seo hreflang` — kun relevant hvis AP Consulting-siden blir flerspråklig; ikke aktuelt før engelsk/tysk-versjon eventuelt vurderes
- `/seo sxo`, `/seo flow` — generelle metodikk-rammeverk, nyttige å ha men ikke noe som endrer den konkrete planen akkurat nå

---

## 6. Rekkefølge — satt inn i eksisterende 30-dagersplan (STRATEGI-2026.md avsnitt 8)

| Uke | Legg til |
|---|---|
| 1 | Installer claude-seo. Kjør `/seo audit` + `/seo technical` på anderspconsulting.no for å verifisere Uke 1-fiksene. `/seo google setup` for GSC/GA4/PageSpeed |
| 2 | `/seo schema` for å validere strukturerte data etter redesign |
| 3 | `/seo content-brief` for de 3 guidene og `/kunder/executive-assistant` |
| 4 | `/seo maps` + `/seo local` på Ålesund-lanseringen, `/seo bing` skrudd på |
| 5–8 | `/seo cluster` for å bestemme resterende sider, `/seo drift baseline` satt som nullpunkt for 90-dagersmålingen, `/seo unlighthouse` etter at alle sidene er live |

Første reelle kundekjøring: endalsbygg, så snart `endalsbygg.no` er koblet til og siden er søkbar.
