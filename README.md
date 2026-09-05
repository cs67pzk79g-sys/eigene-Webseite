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
  projekt-sonnenwerk.svg      Platzhalter-Vorschau, durch echten Screenshot ersetzen
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
| Vor- und Nachname | `index.html` (Über mich), `impressum.html`, `datenschutz.html` |
| Ladungsfähige Anschrift | `impressum.html`, `datenschutz.html` |
| E-Mail-Adresse (auch im `mailto:`) | `index.html` (Kontakt), beide Rechtsseiten |
| Telefonnummer (auch im `tel:`) | `index.html`, beide Rechtsseiten – oder Zeilen löschen |
| Domain / canonical / Open Graph | `index.html`, `<head>` |
| Steuerhinweis (§ 19 UStG oder zzgl. USt.) | `index.html`, unter den Paketen |
| USt-IdNr. | `impressum.html` – oder Abschnitt löschen, falls keine vorhanden |
| Hosting-Anbieter + Speicherdauer der Logs | `datenschutz.html`, Abschnitt 2 |
| Zuständige Landesdatenschutzbehörde | `datenschutz.html`, Abschnitt 9 |
| Stand (Monat/Jahr) | `datenschutz.html`, Abschnitt 12 |
| Links zu den Demo-Projekten | `index.html`, Abschnitt Referenzen – siehe Hinweis unten |
| Solo oder zu zweit | `index.html`, Abschnitt „Über mich“ – siehe Kommentar dort |
| Erreichbarkeit, Einsatzgebiet, Antwortzeit | `index.html`, Kasten „Lieber direkt?“ |

### 2. Bilder ersetzen

- **Projektvorschauen**: `projekt-haarscharf.jpg` und `projekt-wenzel.jpg` sind echte
  Screenshots, aufgenommen bei 1200 × 900 (4:3, passt ohne Beschnitt in die Kachel).
  `projekt-sonnenwerk.svg` ist dagegen ein selbst gezeichnetes Schema – durch eine
  echte Aufnahme im selben Format ersetzen und `src` und `alt` in `index.html` anpassen.
- **Portraits**: In der Sektion „Über mich“ steht statt eines Fotos ein
  Platzhalterkreis. Der auszutauschende `<img>`-Tag steht als Kommentar daneben.
- **Vorschaubild fürs Teilen** (Open Graph, 1200 × 630 px): unter `assets/`
  ablegen und im `<head>` als `og:image` verlinken. Ohne das sieht der Link in
  WhatsApp und LinkedIn nackt aus.

### 2b. Demo-Projekte verlinken

Die Kacheln im Abschnitt Referenzen zeigen auf Platzhalter statt auf echte Adressen.

Für beide Friseur-Projekte ist GitHub Pages noch nicht aktiviert. Zum Verlinken
jeweils in den Repository-Einstellungen unter *Pages* den Branch als Quelle wählen;
die entstehende Adresse gehört dann ins `href` der Kachel. Der passende Hinweis steht
als Kommentar direkt über jeder Kachel im HTML.

| Kachel | Repository | Adresse nach dem Aktivieren |
|---|---|---|
| HAARSCHARF. | `cs67pzk79g-sys/Friseur` | `https://cs67pzk79g-sys.github.io/Friseur/` |
| Frisörsalon Wenzel | `cs67pzk79g-sys/Friseur-Vorzeige-2` | `https://cs67pzk79g-sys.github.io/Friseur-Vorzeige-2/` |

**Sonnenwerk Solartechnik** steht bisher nur als Platzhalter mit schematischer
Vorschau in der Seite. Gibt es das Projekt (noch) nicht, den zugehörigen
`<article class="projekt reveal">`-Block ersatzlos löschen – das Raster kommt auch
mit einer oder zwei Kacheln zurecht.

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
| **Urheberrecht** | ✅ Grafiken selbst erstellt, Schriften unter SIL OFL 1.1. Beide Screenshots zeigen eigene Arbeiten; die darin enthaltenen Fotos stammen laut den jeweiligen Projekt-READMEs von Unsplash (HAARSCHARF.) bzw. Pexels (Wenzel) und sind unter deren Lizenzen auch kommerziell nutzbar |
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
  Pfeiltasten-Bedienung, Farbschema-Umschalter samt Speicherung, Formularprüfung,
  mobile Navigation mit Escape-Taste und Fokusrückgabe, Spamfalle.
- **Kein horizontaler Überlauf** bei 320 px, 390 px und 1440 px Breite.
- **Keine Konsolenfehler**, keine fehlgeschlagenen Anfragen.
- **Ladegewicht:** 215 KB unkomprimiert über 7 Anfragen, davon 122 KB Schriften.
  Keine einzige Verbindung nach außen. Die Projektvorschauen laden erst beim
  Herunterscrollen (`loading="lazy"`) und sind darin nicht enthalten.
- **Ohne JavaScript** bleiben alle Inhalte sichtbar und das Formular bedienbar.
- **`prefers-reduced-motion`** schaltet Einblendungen und den automatischen
  Branchenwechsel ab – geprüft, nicht nur angenommen.

### Bewusste Entscheidungen

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
