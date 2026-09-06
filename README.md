# Firmenwebsite – Arbeitsstand

> **Diese Seite darf noch nicht online gehen.**
> Sie ist ein Entwurf. Vor der Veröffentlichung müssen die Gewerbeanmeldung
> vorliegen und alle Platzhalter ausgefüllt sein – siehe Checkliste unten.

Einseitige Website (Onepager) für ein Webdesign-Kleingewerbe, plus Impressum und
Datenschutzerklärung. Reines HTML, CSS und Vanilla JavaScript – kein Framework,
kein Build-Schritt, keine Abhängigkeiten.

---

## Dateien

```
index.html                    Startseite (Hero, Leistungen, Referenzen, Ablauf, Über, Kontakt)
impressum.html                Impressum-Gerüst nach § 5 DDG
datenschutz.html              Datenschutzerklärung nach Art. 13 DSGVO
styles.css                    Gesamtes Styling, in 13 nummerierte Abschnitte gegliedert
script.js                     Interaktionen, in 7 eigenständige Blöcke gegliedert
assets/
  favicon.svg                 Browser-Symbol
  fonts.css                   @font-face-Regeln für die lokalen Schriften
  fonts/*.woff2               Bricolage Grotesque + Inter (SIL OFL 1.1), selbst gehostet
  projekt-haarscharf.jpg      Echter Screenshot des Demo-Projekts HAARSCHARF.
  projekt-wenzel.jpg          Echter Screenshot des Demo-Projekts Frisörsalon Wenzel
  projekt-sonnenwerk.jpg      Echter Screenshot des Demo-Projekts Sonnenwerk Solartechnik

README.md                     diese Datei – Launch-Checkliste und rechtliche Einordnung
DEMOS-VORBEREITEN.md          Anleitung für die drei Demo-Repositories (Pages, Rechtsseiten, Banner)
```

## Lokal anschauen

Nicht per Doppelklick öffnen: Über `file://` blockieren Browser das Laden der
Schriften (CORS), die Seite erscheint dann in einer Ersatzschrift. Stattdessen
einen kleinen lokalen Server starten:

```bash
python3 -m http.server 8000
# danach im Browser: http://localhost:8000
```

---

## Was noch zu tun ist

Kurzübersicht zum Abhaken. Die Details zu jedem Punkt stehen darunter in der
ausführlichen Checkliste.

**Braucht die Gewerbeanmeldung – geht vorher nicht:**

- [ ] Platzhalter füllen: Firmenname, Name, Anschrift, E-Mail, Telefon → [1](#1-platzhalter-ausfüllen)
- [ ] Impressum und Datenschutzerklärung vervollständigen → [1](#1-platzhalter-ausfüllen)
- [ ] Steuerhinweis festlegen: § 19 UStG oder zzgl. USt. → [1](#1-platzhalter-ausfüllen)
- [ ] Hoster eintragen – bei GitHub Pages ist das GitHub Inc., USA → [1](#1-platzhalter-ausfüllen)
- [ ] Zuständige Landesdatenschutzbehörde eintragen → [1](#1-platzhalter-ausfüllen)

**Geht jederzeit, auch schon vorher:**

- [ ] **Rechtsform klären: GbR oder Einzelgewerbe?** Die Seite tritt als „wir“ auf;
      davon hängt ab, wer im Impressum steht → [1](#1-platzhalter-ausfüllen)
- [ ] Portraitfoto einsetzen → [2](#2-bilder-ersetzen)
- [ ] Vorschaubild fürs Teilen anlegen (1200 × 630 px) → [2](#2-bilder-ersetzen)
- [ ] **Kontaktformular scharf schalten** – Endpunkt einrichten und in der
      Datenschutzerklärung als Empfänger eintragen → [3](#3-kontaktformular-scharf-schalten)

**Zum Schluss, unmittelbar vor dem Livegang:**

- [ ] Demos veröffentlichen, damit die Referenz-Links funktionieren →
      [DEMOS-VORBEREITEN.md](DEMOS-VORBEREITEN.md)
- [ ] Entwurfs-Hinweise und Kommentare entfernen → [4](#4-entwurfs-kennzeichnung-entfernen)
- [ ] `noindex` entfernen – sonst findet Google die Seite nie → [4](#4-entwurfs-kennzeichnung-entfernen)
- [ ] Strukturierte Daten aktivieren, canonical und Open Graph setzen → [5](#5-seo-scharf-schalten)

> Das Kontaktformular ist der einzige Punkt, an dem die Seite technisch noch nicht
> vollständig ist. Bis dahin fängt `script.js` den Versand ab und sagt es dem
> Besucher ehrlich – die Seite bleibt also jederzeit vorzeigbar, auch mit
> unfertigem Formular.

---

## Launch-Checkliste

### 1. Platzhalter ausfüllen

Alle offenen Stellen sind im Quelltext einheitlich mit `[BITTE ERGÄNZEN: …]`
markiert. So findest du sie alle:

```bash
grep -rn "BITTE ERGÄNZEN" --include="*.html" --include="*.css" --include="*.js" .
```

Der Reihe nach:

| Was | Wo |
|---|---|
| Firmenname / Marke | alle drei HTML-Dateien, im Kopfbereich und Fußbereich |
| Vor- und Nachname **beider Personen** | `index.html` (Über uns), `impressum.html`, `datenschutz.html` |
| Ladungsfähige Anschrift | `impressum.html`, `datenschutz.html` |
| E-Mail-Adresse (auch im `mailto:`) | `index.html` (Kontakt), beide Rechtsseiten |
| Telefonnummer (auch im `tel:`) | `index.html`, beide Rechtsseiten – oder Zeilen löschen |
| Domain / canonical / Open Graph | `index.html`, `<head>` |
| Steuerhinweis (§ 19 UStG oder zzgl. USt.) | `index.html`, unter den Paketen |
| USt-IdNr. | `impressum.html` – oder Abschnitt löschen, falls keine vorhanden |
| Hosting-Anbieter + Speicherdauer der Logs | `datenschutz.html`, Abschnitt 2 – bei GitHub Pages ist das **GitHub Inc., USA**, inklusive Hinweis auf den Drittlandtransfer |
| Zuständige Landesdatenschutzbehörde | `datenschutz.html`, Abschnitt 9 |
| Stand (Monat/Jahr) | `datenschutz.html`, Abschnitt 12 |
| Links zu den Demo-Projekten | `index.html`, Abschnitt Referenzen – siehe Hinweis unten |
| Rechtsform (GbR oder Einzelgewerbe) | `impressum.html` – siehe den ausführlichen Kommentar über den Pflichtangaben |
| Kurztexte der beiden Personen | `index.html`, Abschnitt „Über uns“ |
| Erreichbarkeit, Einsatzgebiet, Antwortzeit | `index.html`, Kasten „Lieber direkt?“ |

### 2. Bilder ersetzen

- **Projektvorschauen**: alle drei sind echte Screenshots, aufgenommen bei 1200 × 900
  (4:3, passt ohne Beschnitt in die Kachel). Kommt ein weiteres Projekt dazu, im selben
  Format aufnehmen, damit die Kacheln zusammenpassen.
- **Portraits**: In der Sektion „Über uns“ steht bei beiden Personen statt eines
  Fotos ein Platzhalterkreis. Der auszutauschende `<img>`-Tag steht als Kommentar
  daneben. Beide Fotos im selben Zuschnitt aufnehmen, sonst wirken die Karten ungleich.
- **Vorschaubild fürs Teilen** (Open Graph, 1200 × 630 px): unter `assets/`
  ablegen und im `<head>` als `og:image` verlinken. Ohne das sieht der Link in
  WhatsApp und LinkedIn nackt aus.

### 2b. Demo-Projekte veröffentlichen

Die drei „Projekt ansehen“-Links sind **bereits gesetzt** und zeigen auf die
Adressen, unter denen die Demos nach dem Einschalten von GitHub Pages erreichbar
sind. Sie öffnen sich in einem neuen Tab, damit dein Portfolio offen bleibt.

Bis Pages eingeschaltet ist, laufen sie ins Leere. Die vollständige Anleitung dafür –
Pages einschalten, Rechtsseiten füllen, Demo-Hinweis einbauen, `noindex` setzen –
steht in **[`DEMOS-VORBEREITEN.md`](DEMOS-VORBEREITEN.md)**.

| Kachel | Repository | Adresse |
|---|---|---|
| HAARSCHARF. | `cs67pzk79g-sys/Friseur` | `…github.io/Friseur/` |
| Frisörsalon Wenzel | `cs67pzk79g-sys/Friseur-Vorzeige-2` | `…github.io/Friseur-Vorzeige-2/` |
| Sonnenwerk Solartechnik | `cs67pzk79g-sys/Handwerker2000` | `…github.io/Handwerker2000/solar-monteur/` |

Basis ist jeweils `https://cs67pzk79g-sys.github.io`. Groß- und Kleinschreibung
im Pfad zählt.

**Zum Verständnis:** Veröffentlichte Demos sind öffentlich abrufbar – jeder mit der
Adresse kommt hinein. `noindex` hält nur Suchmaschinen fern, es macht die Seiten
nicht privat. Genau deshalb braucht jede Demo dein Impressum. Das kostet dich keine
zusätzlichen Angaben, weil du es für diese Seite ohnehin brauchst.

Soll eine Kachel wieder verschwinden, den zugehörigen `<article class="projekt reveal">`-Block
ersatzlos löschen – das Raster kommt auch mit einer oder zwei Kacheln zurecht.

### 3. Kontaktformular scharf schalten

Das Formular hat absichtlich **kein funktionierendes Ziel**. Solange im
`action`-Attribut noch der Platzhalter steht, fängt `script.js` den Versand ab
und zeigt einen Hinweis – ein Formular, das so tut, als hätte es gesendet, wäre
schlimmer als gar keines.

Zum Aktivieren:

1. In `index.html` das `action` des `<form id="anfrage-formular">` auf den echten
   Endpunkt setzen (eigenes PHP-Skript beim Hoster oder ein Formulardienst).
2. Den gewählten Weg in `datenschutz.html`, Abschnitt 4, als Empfänger
   eintragen. Bei einem externen Dienst gehören Name, Anschrift und ein Hinweis
   auf möglichen Drittlandtransfer dazu.
3. Serverseitig noch einmal prüfen: Die Prüfung in `script.js` ist reine
   Bequemlichkeit für den Nutzer, kein Schutz. Das Honeypot-Feld `website` muss
   auch auf dem Server ausgewertet werden.

### 4. Entwurfs-Kennzeichnung entfernen

- Den `<!-- ENTWURF – NICHT LIVE SCHALTEN … -->`-Kommentar oben in allen drei
  HTML-Dateien (jeweils zweimal: vor `<html>` und im `<head>`).
- Den Absatz `<p class="entwurf-hinweis">` im Fußbereich aller drei Seiten.
- **Wichtig:** `<meta name="robots" content="noindex, nofollow">` aus allen drei
  Dateien entfernen. Bleibt die Zeile stehen, taucht die Seite nie bei Google auf.

### 5. SEO scharf schalten

- `<title>` und `<meta name="description">` mit dem echten Firmennamen und
  möglichst dem Ort versehen – bei lokalen Dienstleistungen zieht der Ortsbezug.
- Den auskommentierten `application/ld+json`-Block im `<head>` von `index.html`
  ausfüllen und aktivieren. Danach mit dem Rich-Results-Test von Google prüfen.
- `canonical` und die Open-Graph-URLs auf die echte Domain setzen.
- Eine `sitemap.xml` und eine `robots.txt` ergänzen, sobald die Domain steht.

---

## Rechtliche Einordnung (Stand des Entwurfs)

| Punkt | Status |
|---|---|
| **Impressum** (§ 5 DDG) | ⚠️ Gerüst vollständig, echte Angaben fehlen noch |
| **Datenschutzerklärung** (Art. 13 DSGVO) | ⚠️ Vollständig auf die tatsächliche Technik zugeschnitten, Verantwortlicher / Hoster / Aufsichtsbehörde fehlen |
| **Cookie-Banner** (§ 25 TDDDG) | ➖ Nicht erforderlich – die Seite setzt keine Cookies, nutzt kein Tracking und bindet keine Drittinhalte ein |
| **Schriften** | ✅ Lokal gehostet, keine Verbindung zu Google-Servern, kein Drittlandtransfer |
| **Barrierefreiheit** (BFSG) | ➖ Für eine reine Informations- und Anfrageseite an Geschäftskunden voraussichtlich nicht verpflichtend – umgesetzt ist trotzdem WCAG 2.1 AA als Grundlage |
| **Urheberrecht** | ✅ Grafiken selbst erstellt, Schriften unter SIL OFL 1.1. Alle drei Screenshots zeigen eigene Arbeiten; die darin enthaltenen Fotos stammen laut den jeweiligen Projekt-READMEs von Unsplash (HAARSCHARF.) bzw. Pexels (Wenzel) und sind unter deren Lizenzen auch kommerziell nutzbar. Sonnenwerk kommt ganz ohne Fotos aus |
| **Shop-/Widerrufspflichten** | ➖ Nicht relevant, es gibt keine Bestell- oder Zahlfunktion |

**Sobald sich daran etwas ändert**, muss die Datenschutzerklärung mit:
Google Analytics oder Matomo, Google Maps, YouTube-Einbettungen, Social-Media-Plugins,
ein Newsletter-Tool, ein Chat-Widget oder Schriften von fremden Servern. Bei allen
diesen Punkten kommt zusätzlich ein Einwilligungsbanner dazu, das **vor** dem Laden
des jeweiligen Dienstes greifen muss.

> Das ist eine strukturierte Einschätzung, keine Rechtsberatung. Für die
> verbindliche Prüfung – gerade beim ersten eigenen Gewerbe – lohnt der Gang zur
> IHK oder zu einer Anwältin bzw. einem Anwalt.

---

## Technische Umsetzung – was geprüft wurde

Getestet in Chromium über einen lokalen Server:

- **Kontraste:** 36 Farbkombinationen geprüft, alle über WCAG-AA (4,5:1), hell wie dunkel.
- **Funktion:** 37 automatisierte Prüfungen bestanden – Branchen-Tabs inklusive
  Pfeiltasten-Bedienung, Formularprüfung, mobile Navigation mit Escape-Taste und
  Fokusrückgabe, Spamfalle.
- **Kein horizontaler Überlauf** bei 320 px, 390 px und 1440 px Breite.
- **Keine Konsolenfehler**, keine fehlgeschlagenen Anfragen.
- **Ladegewicht:** 215 KB unkomprimiert über 7 Anfragen, davon 122 KB Schriften.
  Keine einzige Verbindung nach außen. Die Projektvorschauen laden erst beim
  Herunterscrollen (`loading="lazy"`) und sind darin nicht enthalten.
- **Ohne JavaScript** bleiben alle Inhalte sichtbar und das Formular bedienbar.
- **`prefers-reduced-motion`** schaltet Einblendungen und den automatischen
  Branchenwechsel ab – geprüft, nicht nur angenommen.

### Bewusste Entscheidungen

- **Die Seite spricht durchgängig als „wir“, und beide Personen tragen dieselbe
  Rollenzeile.** Das ist die sichtbare Umsetzung des gemeinsamen Auftritts: Es gibt
  keine Aufteilung in „der eine gestaltet, der andere programmiert“, weil es sie im
  Betrieb nicht gibt. Die Kundenstimme bleibt davon unberührt – im Beispielsatz zur
  Kleinunternehmerregelung, in den Antworten des Paketberaters und in der
  Einwilligungserklärung des Formulars spricht weiterhin der Besucher in der Ich-Form.

- **Keine Angaben zu Ausbildung, Schule oder Alter.** Dazu besteht keine Pflicht, und
  die frühere Formulierung war zudem sachlich falsch. Was bleibt, ist der ehrliche Satz,
  dass der Betrieb am Anfang steht – er erklärt die Preise, ohne die Kompetenz in Frage
  zu stellen. Wichtig: Was an fachlicher Qualifikation behauptet wird, muss stimmen;
  erfundene Abschlüsse wären eine irreführende geschäftliche Handlung nach § 5 UWG.

- **Nur ein helles Farbschema, kein Umschalter.** Zwei Schemata bedeuten, dass jede
  Änderung doppelt geprüft werden muss – eine Dauerlast für einen Betrieb dieser Größe.
  Der Umschalter saß außerdem direkt neben „Projekt anfragen" und konkurrierte dort mit
  der einzigen Handlung, auf die die Seite hinarbeitet. Wer sein System auf dunkel
  gestellt hat, sieht eine helle Seite; das ist bei Firmenseiten der Normalfall.
  `color-scheme: light` sorgt dafür, dass auch Formularfelder und Scrollbalken hell
  bleiben.

- **Schriften lokal statt über `fonts.googleapis.com`.** Beim Direkteinbinden
  geht die IP-Adresse jedes Besuchers an Google – in Deutschland vielfacher
  Abmahngrund. Die vier Dateien sind Variable Fonts und decken alle Schnitte ab
  (244 KB gesamt, für deutsche Texte werden nur ~124 KB geladen).
- **Der Fortschrittsbalken und die Pause-Taste** an der Branchen-Vorschau sind
  kein Zierrat: WCAG 2.2.2 verlangt, dass sich automatisch wechselnde Inhalte
  anhalten lassen.
- **Das `hidden`-Attribut ist mit `!important` abgesichert.** Ohne das gewinnt
  eine spätere `display`-Regel bei gleicher Spezifität, und versteckte Elemente
  bleiben sichtbar.
- **Im Druck werden alle Einblendungen erzwungen sichtbar.** Sonst käme
  ausgerechnet das Impressum weiß aus dem Drucker.

## Wartung

Für spätere Änderungen: `styles.css` und `script.js` sind oben jeweils mit einem
Inhaltsverzeichnis versehen, die Abschnitte tragen dieselben Nummern wie dort.
Jeder Block in `script.js` prüft selbst, ob seine Elemente existieren – neue
Unterseiten können also einfach dieselbe `script.js` einbinden.
