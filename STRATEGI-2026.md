# anderspconsulting.no — analyse, struktur, design og trafikkplan

*Skrevet 2026-07-29. Grunnlag: teknisk sjekk av live-siden, `index.html`, `projects/lokale-nettsider/`, `projects/ai-consulting/`, `context/consulting.md`.*

---

## 1. Kort oppsummering

Siden er pen, men den er bygget for å bli *lest*, ikke for å bli *funnet*. Den er én side, uten analytics, uten schema, uten sitemap, med feil domene i alle metadata og en ødelagt CTA i heroen. Google har i praksis ingenting å rangere deg på, og en snekker i Ålesund vil aldri søke på ordene siden er skrevet med.

De tre tingene som avgjør om dette lykkes:

1. **Fiks målingen før du bruker én krone på ads.** Uten GA4 + konverteringssporing kan du ikke vite hva som virker, og Google Ads kan ikke optimalisere.
2. **Del siden i to spor.** Håndverkere kjøper *nettside og synlighet*. Klinikker/tannleger/gym kjøper *færre manuelle oppgaver*. Samme selger, to helt ulike inngangsdører — og bare den ene har søkevolum.
3. **Vis produktet, ikke stemningen.** Executive assistant som går 24/7 er det sterkeste du har. Den skal ha egen side med skjermbilder, tall og video — ikke være et kort blant fire i et galleri.

---

## 2. Teknisk analyse — hva som er galt nå

Alt under er verifisert mot live-siden 2026-07-29.

| # | Funn | Konsekvens | Alvor |
|---|---|---|---|
| 1 | `og:url`, `og:image`, `twitter:image` peker på **andersparr.no** — domenet finnes ikke (DNS resolver ikke) | Alle delinger på LinkedIn/Facebook/Messenger viser tom boks uten bilde. Google får motstridende signal om hvilket domene som er ditt | Kritisk |
| 2 | `/og-image.jpg` → **404** | Samme som over — ingen delingsbilde eksisterer overhodet | Kritisk |
| 3 | Hero-knapp «Gratis AI-audit →» peker på `/audit` → **404** | Din sekundære CTA er død. `audit.html` finnes lokalt, men er ikke deployet | Kritisk |
| 4 | **Ingen analytics.** Ingen GA4, ingen Plausible, ingen tag manager | Du vet ikke hvor mange som besøker, hvor de kommer fra, eller hvor de faller av. Google Ads kan ikke optimalisere mot konverteringer | Kritisk |
| 5 | **Ingen `robots.txt`** (404), **ingen `sitemap.xml`** (404) | Ingen styring av crawling, ingen indekseringshjelp | Høy |
| 6 | **Ingen `rel=canonical`** | Duplikatrisiko ved www/non-www og parametere | Høy |
| 7 | **Ingen strukturerte data** (0 stk `application/ld+json`) | Ingen LocalBusiness, ingen FAQPage, ingen Person. Du er ikke en entitet for Google eller for AI-modellene | Høy |
| 8 | **Én side totalt.** Ingen tjenestesider, ingen bransjesider, ingen stedssider, ingen blogg | Du kan bare rangere på ~1 søkeintensjon. Alle de spesifikke søkene du nevner har ingen landingsside | Høy |
| 9 | Ingen priser noe sted — FAQ sier «det avhenger av omfang» | Norsk småbedriftskjøper filtrerer bort leverandører uten pris. AI-agenter som sammenligner leverandører kan ikke lese deg | Høy |
| 10 | Ingen `loading="lazy"` på bilder, alt CSS er inline (~50KB), 6 store PNG/JPG lastes umiddelbart | Treg mobil-LCP. Google Ads Quality Score straffer det, og halvparten forlater før siden vises | Middels |
| 11 | `.reveal`-animasjoner med 0,7 s varighet + opptil 0,43 s forsinkelse | Siden føles treg selv når den er rask. Innhold er usynlig ved første scroll | Middels |
| 12 | Ingen Google Business Profile-signal på siden (ingen NAP, ingen adresse, kun «Bergen, Norge» i footer) | Du kan ikke dukke opp i kartpakken, som er der lokale søk faktisk konverterer | Høy |

**Rekkefølge:** punkt 1–4 tar under en dag og må gjøres før alt annet.

---

## 3. Strategisk analyse — den ubehagelige delen

### Ingen snekker søker på «AI-agent»

Dette er den viktigste innsikten i hele dokumentet. Søkevolumet i Norge for kombinasjoner som «AI automatisering snekker Bergen» er tilnærmet null. Ikke lavt — null. Håndverkere, elektrikere og små klinikker har ikke ordet «AI-agent» i vokabularet sitt når de har et problem.

Det de faktisk søker på:

| Hva de har av problem | Hva de skriver i Google | Volum |
|---|---|---|
| Ingen nettside, taper jobber til konkurrent | «lage nettside pris», «nettside til bedrift», «webdesigner ålesund» | Reelt |
| Får ikke svart på henvendelser | «svare kunder automatisk», «chatbot nettside» | Lavt, men reelt |
| Drukner i papir og timeføring | «timeføring app håndverker», «faktura automatisk» | Reelt |
| Vil vokse | «få flere kunder som snekker», «markedsføring håndverker» | Middels |
| Har hørt om AI, vet ikke hva | «ai for små bedrifter», «ai konsulent norge», «kurs ai bedrift» | Lavt–middels |

Konklusjonen er ikke å droppe AI-posisjoneringen. Konklusjonen er at **AI er løsningen, ikke søkeordet**. Du selger utfall (flere kunder, mindre admin), leverer med AI, og møter folk på ordene de faktisk bruker.

### To spor, ikke ett

| | **Spor A — Synlighet** | **Spor B — Automatisering** |
|---|---|---|
| Hvem | Snekker, elektriker, rørlegger, småbedrift uten nettside | Tannlege, klinikk, treningssenter, regnskapsbyrå, eiendom, coach |
| Smerte | «Folk finner meg ikke» | «Jeg drukner i manuelle oppgaver» |
| Produkt | Nettside + lokal synlighet, fra 19 000 kr | Automatisering fra 35 000 kr, assistent fra 75 000 kr (se avsnitt 11) |
| Har søkevolum? | **Ja** — dette er der Google Ads og SEO faktisk fungerer | **Nei/lite** — må drives av outbound, LinkedIn, AEO og henvisninger |
| Bevis du har | 3 demo-nettsider (Frantzvåg, Container Kuldeservice, Rune Flem) | Executive assistant 24/7, Asgeir-bot, CRM-dashboard |
| Rolle | Kundefabrikk og døråpner | Der pengene og marginen er |

Spor A finansierer og mater spor B. En snekker som får nettside av deg er den enkleste klienten i verden å selge oppfølgings-automatisering til seks måneder senere. Siden må gjøre begge deler tydelig uten å bli et rot.

### Bergen / Ålesund / Stavanger — ulik virkelighet

- **Ålesund**: sterkest utgangspunkt. 213 kartlagte leads, tre live demo-sider, teamtilknytning, mulighet for fysiske møter. Start her.
- **Bergen**: du bor der. Google Business Profile med Bergen-adresse er den viktigste enkeltinvesteringen for lokalsøk.
- **Stavanger**: null lokalt signal i dag — ingen kunder, ingen adresse, ingen omtaler. Lokal SEO der vil ta lengst tid. Dekk det med betalt søk og en ærlig stedsside, ikke med falske lokalsignaler.

Ikke lag tre identiske stedssider med ordene byttet ut. Google kaller det doorway pages og det straffes. Hver stedsside må ha ekte lokalt innhold: hvem du har jobbet med der, om du møter fysisk, lokale priser, lokale eksempler.

---

## 4. Ny sidestruktur

Fra 1 side til ~16 sider. Alle håndskrevne — ingen masseproduserte kombinasjonssider.

```
Hjem (/)
├── AI-automatisering (/ai-automatisering)              ← Spor B hub
│   ├── Kundeoppfølging & speed to lead (/ai-automatisering/kundeoppfolging)
│   ├── Booking & resepsjon (/ai-automatisering/booking)
│   ├── Dokumenter & fakturaer (/ai-automatisering/dokumenter)
│   ├── Rapportering (/ai-automatisering/rapportering)
│   └── AI-assistent (/ai-automatisering/ai-assistent)
├── Nettside & synlighet (/nettside)                    ← Spor A hub
├── Bransjer
│   ├── Tannlege & klinikk (/bransje/klinikk)
│   ├── Treningssenter (/bransje/treningssenter)
│   ├── Håndverker (/bransje/handverker)
│   └── Regnskap & eiendom (/bransje/regnskap-eiendom)
├── Steder
│   ├── Bergen (/bergen)
│   ├── Ålesund (/alesund)
│   └── Stavanger (/stavanger)
├── Kunder (/kunder)                                    ← bevis-hub
│   ├── Executive assistant som går 24/7 (/kunder/executive-assistant)
│   ├── Telegram-bot for leietakerhåndtering (/kunder/leietaker-bot)
│   └── Nettsider for lokale bedrifter (/kunder/lokale-nettsider)
├── Priser (/priser)
├── Guider (/guider)                                    ← AEO-motoren
├── Om (/om)
├── Kontakt (/kontakt)
└── Gratis AI-audit (/audit)                            ← fiks 404
```

**Maskinlesbare filer i rot:** `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/priser.md`

### URL- og navigasjonsregler

| Regel | Hvorfor |
|---|---|
| Små bokstaver, bindestrek, ingen æøå i URL (`/alesund`, ikke `/ålesund`) | Unngår encoding-rot i lenker og analytics |
| Maks 3 nivåer | Alt viktig innen 3 klikk fra forsiden |
| Header-nav: **5 punkter + 1 CTA** — Tjenester ▾ · Kunder · Priser · Om · [Book gratis kartlegging] | Flere enn 7 gir beslutningsvegring |
| Bransje- og stedssider ligger i footer + kontekstuelle lenker, ikke i hovedmenyen | Holder navigasjonen ren, gir fortsatt interne lenker |
| Brødsmuler på alt under nivå 1, med `BreadcrumbList`-schema | Gratis interne lenker + rikere Google-resultat |

### Intern lenking (hub-and-spoke)

- `/ai-automatisering` lenker ned til alle fem løsningssidene; hver løsningsside lenker tilbake opp og sideveis til én relevant case.
- Hver bransjeside lenker til de 2–3 løsningene som er mest relevante for den bransjen, samt til nærmeste stedsside.
- Hver stedsside lenker til begge tjeneste-hubene og til lokale caser.
- Hver caseside avsluttes med lenke til `/priser` og `/kontakt`.
- Ingen foreldreløse sider: alt må ha minst én inngående intern lenke.

### Prioritering — bygg i denne rekkefølgen

| Bølge | Sider | Uke |
|---|---|---|
| 0 | Teknisk fiks på eksisterende forside (avsnitt 2, punkt 1–7) | 1 |
| 1 | `/priser`, `/kunder/executive-assistant`, `/audit` (fiks), ny forside | 1–2 |
| 2 | `/ai-automatisering` + `/nettside` (de to hubene) | 2–3 |
| 3 | `/alesund`, `/bergen`, de 5 løsningssidene | 3–5 |
| 4 | Bransjesider, `/stavanger`, `/guider` med 3 første guider | 5–8 |

---

## 5. Designretning — vekk fra terrakotta, mot Apple/Nike

### Hva som er galt med dagens uttrykk

Dagens palett er varm mørkebrun (`#1A1614`) med terrakotta-aksent (`#D97A3D`), Cormorant Garamond som display-font, Source Serif som brødtekst, og et papirkorn-overlay over hele siden. Det er et vakkert **redaksjonelt magasin-uttrykk** — og det er nettopp problemet. To serif-fonter, varm brun og filmkorn signaliserer vinbar, arkitektkontor eller livsstilsmerke. Det signaliserer ikke «denne fyren bygger programvare som fungerer».

En kjøper som vurderer å gi deg 15 000 kr for et teknisk system leser subtilt: ser dette ut som noe teknisk kompetent? Serif + korn + mørkebrunt svarer nei.

### Ny retning: lys, nøytral, produktdrevet

Prinsippet fra Apple: **produktet er designet, ikke siden**. Hvit flate, enorm luft, stor typografi, og så ekte skjermbilder av det du har bygget som eneste farge. Prinsippet fra Nike: **ett dominerende budskap per skjerm, svart CTA, ingen dekorasjon**. Prinsippet fra høykonverterende sider (Stripe, Linear, Framer): **tall som helter, klebrig CTA, bevis rett under fold**.

#### Farger

```css
:root {
  /* Flater — lys først */
  --bg:            #FFFFFF;
  --bg-subtle:     #FAFAFA;   /* seksjonsveksling */
  --bg-sunken:     #F4F4F5;   /* kort, input */

  /* Blekk — nøytral grå, ingen varme */
  --ink:           #0A0A0A;   /* overskrifter */
  --ink-body:      #3F3F46;   /* brødtekst */
  --ink-muted:     #71717A;   /* bildetekst, labels */

  /* Struktur */
  --line:          #E4E4E7;
  --line-strong:   #D4D4D8;

  /* Aksent — brukes sparsomt: lenker, fokus, aktiv tilstand */
  --accent:        #0A5CFF;
  --accent-hover:  #0847CC;

  /* CTA — svart, Nike-prinsippet. Aldri blå knapp ved siden av blå lenke */
  --cta-bg:        #0A0A0A;
  --cta-text:      #FFFFFF;

  /* Én mørk seksjon som kontrast — kun caser/sitat */
  --dark-bg:       #0A0A0A;
  --dark-ink:      #FAFAFA;
  --dark-muted:    #A1A1AA;
}
```

Aksentblå brukes på **under 3 % av flaten**: lenker, fokusring, aktivt menypunkt, en enkelt statistikk-uthevning. Alt annet er svart, hvitt og grått. Det er nettopp fraværet av farge som leser som premium.

#### Typografi

Én familie, brukt i hele skalaen. Drop begge seriffontene.

```css
--ff: 'Inter', -apple-system, 'Segoe UI', system-ui, sans-serif;
```

Alternativer om du vil ha noe mindre vanlig: **Geist** (Vercel, veldig nær Apples SF Pro) eller **Instrument Sans**. Ikke bland.

| Rolle | Størrelse | Vekt | Tracking | Line-height |
|---|---|---|---|---|
| Display / H1 | `clamp(2.75rem, 6vw, 5rem)` | 600 | `-0.035em` | 1.02 |
| H2 | `clamp(2rem, 3.5vw, 3rem)` | 600 | `-0.025em` | 1.1 |
| H3 | `1.375rem` | 600 | `-0.015em` | 1.3 |
| Brødtekst | `1.0625rem` | 400 | `-0.005em` | 1.65 |
| Stor stat | `clamp(3rem, 7vw, 6rem)` | 600 | `-0.04em` | 1 |
| Label / eyebrow | `0.75rem` | 500 | `0.08em`, uppercase | 1 |

Den negative tracking-en på store størrelser er hele Apple-trikset. Uten den ser store overskrifter amatørmessige ut.

#### Rom og rytme

- 8-punkts skala: 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160 px
- Seksjonspadding: `clamp(80px, 12vw, 160px)` vertikalt
- Innholdsbredde: 1200 px maks, tekstkolonner maks 68 tegn
- Radius: 12 px på kort, 8 px på knapper, 0 på skjermbilder i ramme

#### Ting som skal fjernes

| Fjern | Hvorfor |
|---|---|
| Papirkorn-overlay (`feTurbulence`) | Signaliserer analog/redaksjonell, ikke teknisk |
| Cormorant Garamond + Source Serif | Feil register for en AI-konsulent |
| Terrakotta som dominerende farge | Varm brun leser håndverk/keramikk, ikke programvare |
| Gigantisk `-webkit-text-stroke` «AI» i hero og kontakt | Dekorasjon uten funksjon, forvirrer hierarkiet |
| `<em>` i kursiv i alle overskrifter | Serif-manerisme som ikke overlever fontbyttet |
| 0,7 s reveal-animasjoner med 0,43 s delay | Får siden til å føles treg. Erstatt med 180 ms fade + 8 px løft, ingen delay-kjeder |

#### Konverteringslaget

Rent design uten konverteringsmekanikk er bare pent. Kombiner:

1. **Én løfte + én CTA over fold.** Ikke to konkurrerende knapper. «Book gratis kartlegging» er primær; audit-lenken flyttes ned.
2. **Bevisstripe umiddelbart under fold** — tre tall (8 t/uke frigjort · 24/7 drift · levert på 1–3 uker) + logostripe.
3. **Klebrig CTA-bar på mobil** — fast nederst, dukker opp etter 40 % scroll. Enkeltstørst konverteringsløft på mobil.
4. **Produktbevis som eneste bilder.** Ekte skjermbilder i enkel enhetsramme, ikke stockfoto, ikke abstrakte bokser.
5. **CTA gjentas hver andre seksjon** — samme tekst hver gang.
6. **Skjema med tre felt.** Navn, e-post, «hva tar mest tid?». Hvert felt utover det koster deg leads.
7. **Risikoreduksjon rett ved knappen:** «30 min. Gratis. Du får konkrete forslag uansett om vi jobber sammen.»
8. **Synlige priser.** Fra-priser per pakke. Dette er både konverterings- og AI-synlighetstiltak.

---

## 6. Bevis — dette er det svakeste leddet i dag

Du har mer bevis enn siden viser. I dag er alt komprimert til fire småkort i et galleri. Det skal bli en egen bevisstruktur.

### Hovedcase: Executive assistant som går 24/7

Fortjener egen side, `/kunder/executive-assistant`. Struktur:

1. **Overskrift med utfall, ikke teknologi** — «En assistent som jobber 24/7 — 8 timer spart i uken»
2. **Utgangspunktet** — hva som tok tid før (presentasjoner 30–60 min per kunde, sporadisk oppfølging, manuell regnskapsføring)
3. **Hva som ble bygget** — kort, i klientens språk
4. **Tallene i tabell** — før/etter. Du har dem allerede i `case-study-zinzino-leder.md`
5. **Skjermbilder** — 3–4 stk, ekte grensesnitt
6. **60–90 sekunders skjermopptak** ← det som virkelig selger. Du snakker over mens systemet kjører
7. **Sitat fra klienten**
8. **CTA:** «Vil du se hva dette kan bety for din bedrift?»

**Klienten omtales som «en toppleder i helsebransjen» — overalt.**
Ikke «Zinzino-leder», ikke navn, ikke bransjespesifikke detaljer som identifiserer selskapet.
Dette gjelder forsiden, casesiden, LinkedIn-innlegg, tilbudsmaler og annonsetekster.
Fordelene: casen blir relevant for alle helseaktører (klinikk, tannlege, treningssenter),
den røper ikke en kunderelasjon som ikke er klarert for publisering, og den fjerner
koblingen til nettverksmarkedsføring som kan svekke troverdigheten i et B2B-salg.

**Én ting må avklares før publisering:** case-studien er markert utkast og sitatet står som
parafrasert. Hent eksakt, godkjent sitat før det legges ut — selv anonymisert.

### De andre bevisene

| Bevis | Hvor det brukes |
|---|---|
| Asgeir — Telegram-bot for leietakerhåndtering | Egen caseside + `/ai-automatisering/kundeoppfolging` |
| 3 live nettsider (Frantzvåg, Container Kuldeservice, Rune Flem) | `/kunder/lokale-nettsider` + `/nettside` + `/alesund`. **NB:** disse er merket `noindex` og «Forslag til ny nettside». Vis dem som skjermbilder på din side, ikke som utgående lenker — ellers ser det ut som du hevder de er kunder |
| CRM/prospect-tracker, 200+ leads fulgt opp | `/ai-automatisering/kundeoppfolging` |
| Lead-motoren mot Brønnøysund (213 kvalifiserte på én kjøring) | Sterk demo i salgsmøter, og god råvare for en guide |
| SINTEF-bakgrunn, Anthropic-sertifisering | `/om` — troverdighet, ikke forside |

**Det du mangler og bør skaffe raskt:** to skriftlige, navngitte testimonials. Ett fra mor, ett fra Asgeir når han er signert. Uten navn og ansikt teller de omtrent halvparten.

---

## 7. Trafikkplan

### 7.1 Fundament — uke 1, før alt annet

| Oppgave | Detalj |
|---|---|
| Rett opp domenet overalt | Erstatt `andersparr.no` med `anderspconsulting.no` i `og:url`, `og:image`, `twitter:image`, canonical |
| Lag og legg ut `og-image.jpg` | 1200×630, svart bakgrunn, navn + én linje posisjonering |
| Deploy `audit.html` og fiks `/audit` | Død CTA i hero i dag |
| GA4 + Google Search Console | Verifiser domenet, send inn sitemap |
| Konverteringssporing | Events: `form_submit`, `calendly_click`, `pricing_view`, `case_view`. Uten disse er Google Ads blind |
| `robots.txt` | Tillat alle relevante AI-crawlere eksplisitt: `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Bingbot`. Pek på sitemap |
| `sitemap.xml` | Genereres ved deploy |
| Schema (JSON-LD) | `ProfessionalService` med NAP og `areaServed: [Bergen, Ålesund, Stavanger]`, `Person` for deg, `FAQPage` på FAQ, `Article` på guider |
| Ytelse | Konverter bilder til WebP, `loading="lazy"` under fold, kort ned reveal-animasjonene. Mål: LCP under 2,0 s på 4G |

### 7.2 Google Business Profile — høyest avkastning av alt gratis

For søk som «AI-konsulent Bergen» eller «webdesigner Bergen» vises kartpakken over de organiske treffene. Uten GBP finnes du ikke der.

- Opprett profil for Bergen, kategori «Databehandlingstjeneste» / «Nettdesigner»
- Sett opp som **tjenesteområdebedrift** hvis du ikke vil publisere hjemmeadresse — dekningsområde Bergen, Ålesund, Stavanger
- Legg inn tjenester med priser, 10+ bilder, ukentlige innlegg de første to månedene
- **Be hver eneste kunde om Google-anmeldelse.** Fem anmeldelser flytter deg forbi de fleste konkurrentene i disse nisjene
- Konsistent NAP på proff.no, 1881, gulesider — samme skrivemåte overalt

### 7.3 Organisk søk

Målord, delt etter spor. Volumene i Norge er små — det betyr at 5–10 riktige besøk i måneden per side er en suksess, ikke en fiasko.

| Landingsside | Primært søk | Sekundært |
|---|---|---|
| `/nettside` | nettside til bedrift pris | lage nettside småbedrift, hva koster nettside |
| `/alesund` | webdesigner ålesund | nettside ålesund, ai konsulent ålesund |
| `/bergen` | ai konsulent bergen | automatisering bedrift bergen, webdesigner bergen |
| `/stavanger` | ai konsulent stavanger | automatisering stavanger |
| `/ai-automatisering` | automatisering av arbeidsprosesser | ai for små bedrifter, ai agent bedrift |
| `/ai-automatisering/kundeoppfolging` | svare på henvendelser automatisk | oppfølging av leads automatisk |
| `/ai-automatisering/booking` | automatisk timebooking klinikk | booking system tannlege |
| `/bransje/klinikk` | digitalisering klinikk | administrasjon tannlegekontor |
| `/bransje/handverker` | få flere kunder som snekker | markedsføring håndverker |
| `/priser` | ai konsulent pris norge | hva koster automatisering |

**Guider som mater alt sammen** (`/guider`) — 3 stk til å begynne med, hver 1500–2500 ord, med tall og kilder:

1. «AI for norske småbedrifter — hva som faktisk fungerer i 2026»
2. «Hva koster det å automatisere bedriften? Priseksempler fra ekte prosjekter»
3. «Fra 47 timers responstid til 2 minutter — slik fungerer speed to lead»

Disse er hub-sider. Alle tjenestesider lenker inn til dem, de lenker ut til tjenestesidene.

### 7.4 AI-synlighet (AEO/GEO) — der du kan vinne billig

Dette er undervurdert i Norge akkurat nå. Når noen spør ChatGPT «hvem kan hjelpe med AI-automatisering for småbedrifter i Norge?» finnes det nesten ingen norske leverandører med innhold som er strukturert nok til å bli sitert. Det vinduet er åpent nå.

| Tiltak | Hva |
|---|---|
| `/llms.txt` | Kort oversikt over hvem du er, hva du leverer, til hvem, med lenker til nøkkelsider |
| `/priser.md` | Maskinlesbar prisliste. AI-agenter som sammenligner leverandører filtrerer bort de som ikke har lesbare priser |
| Svarblokker på 40–60 ord | Hver seksjon starter med et direkte svar som fungerer løsrevet fra siden rundt |
| FAQ med naturlige spørsmål + `FAQPage`-schema | «Hva koster en AI-assistent?» ikke «Priser» |
| Tall med kilde og dato | Statistikk med kilde øker sitering markant. Bruk dine egne tall: 8 t/uke, 213 leads, 30→5 min |
| Sammenligningsinnhold | «AI-konsulent vs. byrå vs. gjør-det-selv» — sammenligningsartikler er den mest siterte innholdstypen |
| Tredjepartstilstedeværelse | Der du omtales teller mer enn din egen side. Relevant: proff.no-profil, LinkedIn-artikler, gjesteinnlegg, norske Reddit/Facebook-grupper for småbedriftseiere — ekte deltakelse, ikke spam |
| Månedlig måling | Spør ChatGPT, Perplexity, Claude og Gemini de samme 10 spørsmålene hver måned. Logg om du nevnes og hvem som nevnes i stedet |

### 7.5 Betalt annonsering

**Ikke start før 7.1 er ferdig.** Ads uten konverteringssporing er å brenne penger og lære ingenting.

#### Google Ads Search — hovedkanalen

| Parameter | Anbefaling |
|---|---|
| Startbudsjett | 3 000–4 000 kr/mnd. Gå opp først når du har 15+ konverteringer |
| Matchtype | Kun exact og phrase de første 8 ukene. Broad brenner budsjettet i denne størrelsen |
| Budstrategi | Manuell CPC eller Maximize Clicks til du har 30+ konverteringer, deretter Maximize Conversions |
| Geo | Bergen +25 km, Ålesund +25 km, Stavanger +25 km. Egne kampanjer per by så du ser hva som virker |
| Konvertering | Calendly-booking = primær. Skjema = primær. Sidevisning `/priser` = sekundær |

Kampanjestruktur:

```
GOOG_Search_Nettside_Alesund      → /alesund
GOOG_Search_Nettside_Bergen       → /bergen
GOOG_Search_AI-automatisering_NO  → /ai-automatisering
GOOG_Search_Merkevare_Anders-Parr → /
```

Negative søkeord fra dag én — dette er det som avgjør om budsjettet overlever:
`jobb, stilling, ledig, kurs, utdanning, studie, student, gratis mal, wordpress tema, selv, diy, lønn, praksis, wix, squarespace`

**Realistisk regnestykke:** CPC i disse nisjene i Norge ligger typisk 15–45 kr. 3 500 kr gir ca. 110–200 klikk. Med 4–6 % konvertering på en god landingsside gir det **5–10 samtaler i måneden**. Ett solgt prosjekt på 15 000 kr betaler fire måneder med annonsering. Det er marginen som gjør dette forsvarlig — ikke volumet.

#### Meta (Facebook/Instagram) — bedre for håndverker-sporet enn Google

Håndverkere søker sjelden, men de er på Facebook. Vinkelen som fungerer:

- **Kreativ:** før/etter av en ekte demo-nettside, eller 30 sek skjermopptak av assistenten som jobber
- **Målretting:** Ålesund + Bergen, 30–60 år, arbeidsgiver-/småbedriftseier-signaler, interesser rundt bygg/håndverk/klinikkdrift
- **Budsjett:** 1 500–2 000 kr/mnd
- **Retargeting:** alle som har besøkt `/priser` eller en caseside siste 30 dager. Billigst konvertering du får noe sted
- **Krav:** Meta-pixel må stå på siden før du starter

#### LinkedIn — organisk, ikke betalt

Betalt LinkedIn koster 80–150 kr per klikk i Norge. Ikke forsvarlig på ditt budsjett. Organisk derimot fungerer: du har allerede `linkedin-innlegg.md`. To innlegg i uka, alltid med et konkret tall eller skjermbilde, alltid med lenke til en caseside.

### 7.6 Outbound er fortsatt hovedmotoren i måned 1–3

Vær ærlig om tidshorisonten: SEO tar 3–6 måneder å virke, ads gir 5–10 samtaler i måneden. Du har 213 kartlagte leads i Ålesund og et ferdig ringemanus. **Det er der salget kommer fra det neste kvartalet.** Nettsidens jobb i denne perioden er ikke å skaffe leads — den er å lukke dem: når du har ringt en snekker og han googler deg, må siden bekrefte at du er ekte.

Bruk `?utm_source=outbound&utm_campaign=alesund-ring` på lenkene du sender, så ser du faktisk hvem som sjekker deg opp.

---

## 8. 30-dagers plan

| Uke | Fokus | Leveranser |
|---|---|---|
| **1** | Fundament + måling | Domene/OG fikset, og-image laget, `/audit` deployet, GA4 + Search Console + konverteringssporing live, robots.txt, sitemap, canonical, schema |
| **2** | Redesign + pris | Nytt designsystem implementert på forsiden (lys, Inter, svart CTA, korn og serif fjernet), `/priser` publisert, `/priser.md` og `/llms.txt` lagt ut |
| **3** | Bevis | `/kunder/executive-assistant` med skjermbilder, tall, godkjent sitat og skjermopptak. `/kunder`-hub. Google Business Profile opprettet og fylt ut |
| **4** | Spor + trafikk | `/ai-automatisering` og `/nettside` publisert, `/alesund` publisert, Google Ads-konto satt opp med 2 kampanjer og negativliste, første 3 500 kr i gang |
| **5–8** | Skalering | Resterende løsningssider, `/bergen`, bransjesider, 3 guider, Meta-retargeting, første AI-synlighetsmåling |

## 9. Hva du måler

| Måltall | Mål etter 90 dager |
|---|---|
| Organiske besøk/mnd | 150–300 |
| Bookede kartlegginger/mnd | 6–10 |
| Konvertering besøk → booking | 3–5 % |
| Kostnad per booket samtale (ads) | Under 500 kr |
| Google-anmeldelser | Minst 5 |
| Indekserte sider | 15+ |
| Nevnt av ChatGPT/Perplexity på «AI-konsulent Norge» | Minst én av fire modeller |

---

## 10. Antakelser og åpne spørsmål

**Antatt i planen** (si fra hvis noe er feil):
- `anderspconsulting.no` er domenet som skal beholdes, og `andersparr.no` skal ikke kjøpes
- Budsjett for annonsering ligger i området 3 000–6 000 kr/mnd
- Du kan møte kunder fysisk i Bergen og Ålesund, men ikke Stavanger
- Nettsidetjenesten (15 000 kr) skal markedsføres offentlig på samme domene, ikke holdes adskilt

**Må avklares:**
1. Har du et eksakt, godkjent sitat fra klienten — også når casen er anonymisert?
2. Finnes det Google Business Profile allerede?
3. Er du komfortabel med prisnivået i avsnitt 11, eller vil du starte lavere og trappe opp?
4. Er Asgeir-kontrakten signert — kan casen publiseres?

---

## 11. Prissetting — revidert

### Hvorfor den gamle prisen var feil

Gammel prisliste: workshop 3 000 kr, enkeltprosjekt 8 000–15 000 kr, komplett system
15 000–35 000 kr, retainer 2 500 kr/mnd.

Målt mot det norske markedet i 2026 er dette ikke «rimelig» — det er under kostpris for
arbeidet, og det signaliserer feil kvalitetsnivå til en B2B-kjøper.

| Referansepunkt (norsk marked, 2026) | Nivå |
|---|---|
| Timepris, erfaren AI-konsulent | 1 400–1 800 kr |
| Timepris, senior / spesialist | 1 900–2 400 kr |
| Timepris, Oslo-byrå | 2 500–4 000 kr |
| Dagspris, erfaren konsulent på heltid | 12 000–20 000 kr |
| Enkel chatbot fra mal | 30 000–60 000 kr |
| Tilpasset automatiseringsflyt med integrasjoner | 50 000–120 000 kr |
| Full AI-strategi og implementering | 150 000–500 000 kr |
| Månedlig retainer | 15 000–50 000 kr |
| Billigste SMB-pakke i markedet (AIKI «AI Kickstart») | 12 500 kr |

En full AI-assistent til 8 000 kr tilsvarer omtrent fem timers arbeid til markedspris.
Du la ned nærmere to uker. Det er en implisitt timepris under det en rørlegger tar — for
et arbeid som krever langt mer spesialisert kompetanse. I tillegg tolker
bedriftskjøpere lav pris som lav kvalitet: en tannlegeklinikk som får tilbud om et
komplett system til 15 000 kr antar at det er et hobbyprosjekt.

### Ny prisliste

| Pakke | Pris (eks. mva) | Begrunnelse |
|---|---|---|
| Gratis kartlegging, 30 min | 0 kr | Toppen av trakten. Uendret — dette er CTA-en overalt |
| **Kartlegging** (halv dag + veikart) | **12 000 kr** | Markedet tar 18 000–35 000 for workshop. Du ligger under, med lav overhead som reell begrunnelse. Trekkes fra ved bestilling innen 30 dager |
| **Én automatisering** | **fra 35 000 kr** | Markedet: 30 000–60 000 for en malbasert chatbot. Du leverer mer enn en mal |
| **AI-assistent** | **fra 75 000 kr** | Markedet: 50 000–120 000 for tilpasset flyt med integrasjoner. Flaggskipet ditt ligger midt i intervallet |
| **Komplett system** | **fra 150 000 kr** | Markedet: 150 000–500 000. Du starter i nedre kant |
| **Drift og videreutvikling** | **fra 6 500 kr/mnd** | Markedet: 15 000–50 000. Bevisst lavt for SMB, og det gir deg forutsigbar inntekt |
| **Nettside og lokal synlighet** | **fra 19 000 kr** | Eget produkt, egen kjøper. Opp fra 15 000 — pakken inkluderer nå oppsett av Google-oppføring |

### Argumentet som forsvarer prisen

Legg dette synlig på prissiden:

> Åtte timer i uken er 35 timer i måneden. Sett inn din egen timekostnad — de fleste som
> driver selv lander på 500–800 kr. Da er en assistent til 75 000 kr nedbetalt i løpet av
> et halvår, og jobber gratis for deg etter det.

Det er verdibasert prising: du selger tilbakebetalt tid, ikke timer med arbeid.

### Den reelle risikoen

Du har **én ferdig referansecase** og én kontrakt som ikke er signert ennå. Premiumpriser
krever bevis, og du har foreløpig tynt med det. To måter å håndtere det på:

1. **Anbefalt:** hold prisene over, men gi de 2–3 neste kundene en uttalt referanserabatt
   («30 % avslag mot at jeg kan bruke dere som case med navn»). Da får du både prisankeret
   og bevisene, uten å bygge et lavprisrykte du må rive ned senere.
2. **Forsiktig:** start assistenten på 55 000 kr og løft til 75 000 etter tre leverte
   prosjekter. Tregere, men lavere risiko for at du mister de første samtalene på pris.

Det som **ikke** fungerer, er å beholde 8 000 kr. Da bruker du to uker på en kunde som
uansett ikke har budsjett til fase to.

### Konsekvens for de to sporene

Prisøkningen gjør skillet mellom sporene enda viktigere. En snekker i Ålesund kjøper
ikke en assistent til 75 000 kr — han kjøper nettside til 19 000 kr. Klinikken,
treningssenteret og regnskapsbyrået kjøper assistenten. Nettsidesporet er derfor ikke
lenger bare en døråpner, det er det som holder volum i pipelinen mens
automatiseringssporet leverer marginen.

---

## 12. Vestlandet som posisjonering

Du konkurrerer ikke mot Oslo-byråene på kompetanse alene — de tar 2 500–4 000 kr timen og
sender ofte en junior inn på et Teams-møte. Det du har som de ikke har, er nærhet.

**Det som skal fram på siden:**

- **Vestlandet bygger i klynger.** Maritim industri i Ålesund, hav- og subsea-miljøet i
  Bergen, energi i Stavanger. Bedrifter som ble sterke fordi de løftet hverandre. Den
  kulturen er et ekte salgsargument når du selger til lokale bedrifter.
- **Du kommer innom.** «Jeg kjører til deg» slår enhver Teams-lenke i dette segmentet.
- **Gjenbruk som prismekanikk.** Bygger du innkallingssystemet for én klinikk, er det
  halve jobben for den neste — og det merkes på pris og leveringstid. Dette er både ærlig,
  konkret og det gir «bedrifter som utvikler hverandre»-fortellingen et faktisk innhold
  i stedet for tomme ord.
- **Prioritert rekkefølge:** Ålesund (flest leads og demo-sider) → Bergen (du bor der,
  Google Business Profile) → Stavanger (nyest, tettere oppfølging til de første kundene).

**Viktig grense:** ikke antyd medlemskap i eller samarbeid med GCE Blue Maritime, ÅKP,
GCE Ocean Technology eller andre klynger. Referer til klyngekulturen som kontekst for
hvordan du jobber, ikke som en tilknytning du har. Å bli tatt i en slik overdrivelse i
et lite marked er dyrere enn alt du kan vinne på den.
