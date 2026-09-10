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
index.html                    Startseite (Hero, Leistungen, Referenzen, Ablauf, Über mich, FAQ, Kontakt)
danke.html                    Bestätigung nach dem Absenden des Formulars
netlify.toml                  Hosting-Einstellungen: kein Build, interne Dateien gesperrt
404.html                      Fehlerseite – wird vom Hoster bei unbekannter Adresse ausgeliefert
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
  og-vorschau.jpg             Vorschaubild fürs Teilen, 1200 × 630 px

demo/
  demo-hinweis.css            Hinweisleiste, die jede Demo-Seite als Schaustück kennzeichnet
  haarscharf/                 Demo-Projekt Friseursalon – Onepager
  wenzel/                     Demo-Projekt Friseursalon – Familienbetrieb
  sonnenwerk/                 Demo-Projekt Photovoltaik – 16 Seiten

README.md                     diese Datei – Launch-Checkliste und rechtliche Einordnung
ARBEITSABLAUF.md              Hosting, Kundenprojekte, Veröffentlichen – alles außerhalb der Website
DEMOS.md                      Die drei Demo-Projekte unter demo/ – was sie sind, was beim Umzug geändert wurde
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
- [ ] Hoster eintragen – das ist **Netlify, Inc., USA** → [1](#1-platzhalter-ausfüllen)
- [ ] Zuständige Landesdatenschutzbehörde eintragen → [1](#1-platzhalter-ausfüllen)

**Geht jederzeit, auch schon vorher:**

- [ ] Gewerbeanmeldung als Einzelunternehmen → danach Impressum ausfüllen
- [ ] *(optional)* Portraitfoto einsetzen – die Karte trägt bewusst Initialen,
      ein Foto ist keine Pflicht → [2](#2-bilder-ersetzen)
- [x] ~~Vorschaubild fürs Teilen anlegen~~ – `assets/og-vorschau.jpg`, im `<head>` verlinkt
- [ ] **Kontaktformular scharf schalten** – `data-entwurf` am Formular entfernen
      → [3](#3-kontaktformular-scharf-schalten)
- [ ] Auftragsverarbeitungsvertrag mit Netlify abschließen (gilt **nicht** automatisch
      mit der Anmeldung)
- [ ] Auf dataprivacyframework.gov prüfen, ob Netlify mit aktivem Status geführt wird –
      Ergebnis und Datum notieren
- [ ] E-Mail-Benachrichtigung für Formularabsendungen im Netlify-Dashboard einschalten
- [x] ~~Optionales Telefonfeld im Kontaktformular~~ – eingebaut
- [x] ~~Ort, Einsatzgebiet, Erreichbarkeit, Antwortzeit~~ – eingesetzt:
      Göttingen und Umkreis, Rückruf abends und am Wochenende, Antwort in 24 Stunden
- [x] ~~Geschäftsbezeichnung und Name~~ – **Morbe Webdesign**, Inhaber **Jannik Morbe**;
      Titel und Beschreibung tragen jetzt „Göttingen“

**Zum Schluss, unmittelbar vor dem Livegang:**

- [ ] Domain- und Firmenname-Platzhalter in den Demos ersetzen →
      [DEMOS.md](DEMOS.md)
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
| Ladungsfähige Anschrift | `impressum.html`, `datenschutz.html` |
| E-Mail-Adresse (auch im `mailto:`) | `index.html` (Kontakt), beide Rechtsseiten |
| Telefonnummer (auch im `tel:`) | `index.html`, beide Rechtsseiten – oder Zeilen löschen |
| Domain / canonical / Open Graph / og:image | `index.html`, `<head>` – 4 Stellen |
| Steuerhinweis (§ 19 UStG oder zzgl. USt.) | `index.html`, unter den Paketen |
| USt-IdNr. | `impressum.html` – oder Abschnitt löschen, falls keine vorhanden |
| Speicherdauer der Logs + Anschrift des Hosters | `datenschutz.html`, Abschnitt 2 – Anbieter ist **Netlify, Inc., USA**; Anschrift gegen deren Impressum abgleichen |
| Zuständige Landesdatenschutzbehörde | `datenschutz.html`, Abschnitt 10 |
| Stand (Monat/Jahr) | `datenschutz.html`, Abschnitt 13 |
| Domain in den Demos | `demo/haarscharf/`, `demo/sonnenwerk/` – 110 Stellen, Befehl in [`DEMOS.md`](DEMOS.md) |
| Kurztext zur Person | `index.html`, Abschnitt „Über mich“ |

### 2. Bilder ersetzen

- **Projektvorschauen**: alle drei sind echte Screenshots im Format **800 × 600**
  (4:3, passt ohne Beschnitt in die Kachel). Dargestellt werden sie mit 350 px Breite –
  800 px decken damit auch Displays mit doppelter Pixeldichte ab. Größer aufzunehmen
  bringt nichts Sichtbares, kostet aber Ladezeit. Kommt ein weiteres Projekt dazu, im
  selben Format aufnehmen, damit die Kacheln zusammenpassen.
- **Portrait**: In der Sektion „Über mich“ trägt die Karte einen Kreis mit den
  Initialen. Das ist eine Entscheidung, kein offener Platzhalter – die Seite ist damit
  fertig. Wer später doch ein Foto möchte, ersetzt den `span` durch den `<img>`-Tag,
  der als Kommentar daneben steht. **Wichtig:** Wird der Name geändert, müssen die
  Initialen mitgeändert werden.
- **Vorschaubild fürs Teilen** (Open Graph, 1200 × 630 px): unter `assets/`
  ablegen und im `<head>` als `og:image` verlinken. Ohne das sieht der Link in
  WhatsApp und LinkedIn nackt aus.

### 2b. Demo-Projekte

Die drei „Projekt ansehen“-Links zeigen auf `demo/haarscharf/`, `demo/wenzel/` und
`demo/sonnenwerk/` — also auf Unterordner dieser Seite. Sie öffnen sich in einem
neuen Tab, damit dein Portfolio offen bleibt.

Damit gelten für die Demos dein Impressum und deine Datenschutzerklärung; du
brauchst weder weitere Domains noch weitere Rechtsseiten. Jede Demo-Seite trägt
oben eine Leiste, die sie als Schaustück kennzeichnet, zurückführt und das
Impressum verlinkt.

**Zu tun bleibt:** Zwei Platzhalter ersetzen — die Domain (110 Stellen) und den
Firmennamen in der Hinweisleiste (18 Stellen). Beides steht mit dem passenden
Befehl in **[`DEMOS.md`](DEMOS.md)**, zusammen mit dem, was beim Umzug an den
Demos geändert wurde und was zu beachten ist, wenn eine vierte dazukommt.

**Zum Verständnis:** Die Demos sind öffentlich abrufbar — jeder mit der Adresse
kommt hinein. Das `noindex` in ihnen hält nur Suchmaschinen fern, es macht die
Seiten nicht privat. Genau deshalb ist die Hinweisleiste kein Schmuck: Wer auf
einer der Seiten landet, muss sofort sehen, dass der Betrieb nicht existiert.

### 3. Kontaktformular scharf schalten

Das Formular hat absichtlich **kein funktionierendes Ziel**. Solange im
`action`-Attribut noch der Platzhalter steht, fängt `script.js` den Versand ab
und zeigt einen Hinweis – ein Formular, das so tut, als hätte es gesendet, wäre
schlimmer als gar keines.

Zum Aktivieren:

1. `data-entwurf="true"` am `<form id="anfrage-formular">` entfernen. Das `action`
   steht bereits auf dem Endwert `/danke.html`, die Netlify-Attribute sind gesetzt.
2. Im Netlify-Dashboard unter *Forms → Notifications* eine E-Mail-Benachrichtigung
   einrichten. Ohne das sammeln sich Anfragen dort, ohne dass jemand davon erfährt.
   Netlify als Empfänger steht bereits in `datenschutz.html`, Abschnitt 4.
3. Serverseitig noch einmal prüfen: Die Prüfung in `script.js` ist reine
   Bequemlichkeit für den Nutzer, kein Schutz. Das Honeypot-Feld `website` muss
   auch auf dem Server ausgewertet werden.

**Zuerst: Benachrichtigung einschalten.** Netlify sammelt die Absendungen im
Dashboard. Damit eine Anfrage auch in Ihrem Postfach landet, muss dort unter
*Forms → Notifications* eine E-Mail-Benachrichtigung eingerichtet werden. Ohne das
merken Sie eine Anfrage erst, wenn Sie zufällig ins Dashboard schauen.

**Telefonfeld.** Das Formular fragt Name, E-Mail, Telefon und Projektbeschreibung ab.
Das Telefonfeld ist **freiwillig** und als „optional" gekennzeichnet – die Zielgruppe steht
tagsüber auf der Baustelle oder im Salon und ruft häufig lieber zurück, als eine E-Mail zu
tippen. Als Pflichtfeld würde es Anfragen kosten statt welche zu retten.

Die Prüfung ist bewusst großzügig: Sie zählt nur, ob mindestens sechs Ziffern da sind.
Rufnummern werden mit `+49`, `0049`, Klammern, Schrägstrichen, Punkten und Leerzeichen
geschrieben – jedes strengere Muster sperrt gültige Nummern aus. Abschnitt 4 der
Datenschutzerklärung nennt die Telefonnummer ausdrücklich als freiwillige Angabe; wird das
Feld je entfernt, muss es auch dort gestrichen werden.

### 4. Entwurfs-Kennzeichnung entfernen

- Den `<!-- ENTWURF – NICHT LIVE SCHALTEN … -->`-Kommentar oben in allen fünf
  HTML-Dateien (jeweils zweimal: vor `<html>` und im `<head>`).
- Den Absatz `<p class="entwurf-hinweis">` im Fußbereich aller fünf Seiten.
- **`data-entwurf="true"` am `<form id="anfrage-formular">`** – erst damit sendet
  das Formular tatsächlich.
- **Wichtig:** `<meta name="robots" content="noindex, nofollow">` aus `index.html`,
  `impressum.html` und `datenschutz.html` entfernen. Bleibt die Zeile stehen, taucht
  die Seite nie bei Google auf. In `404.html` **und** `danke.html` bleibt sie stehen –
  weder eine Fehlerseite noch eine Bestätigungsseite gehört in den Index.

### 5. SEO scharf schalten

- `<title>` und `<meta name="description">` mit dem echten Firmennamen und
  möglichst dem Ort versehen – bei lokalen Dienstleistungen zieht der Ortsbezug.
- Den auskommentierten `application/ld+json`-Block im `<head>` von `index.html`
  ausfüllen und aktivieren. Danach mit dem Rich-Results-Test von Google prüfen.
- `canonical` und die Open-Graph-URLs auf die echte Domain setzen.
- Eine `sitemap.xml` und eine `robots.txt` ergänzen, sobald die Domain steht.
  Solange `noindex` gesetzt ist, wäre beides widersprüchlich – deshalb erst hier.
- **Absolute Pfade in `404.html` prüfen.** Die Datei verlinkt Stylesheet, Schriften
  und Skript mit führendem `/`, weil der Hoster sie für *jede* unbekannte Adresse
  ausliefert – auch für `/tief/verschachtelt/`. Relative Pfade würden von dort ins
  Leere zeigen. Liegt die Seite später **nicht** unter einer eigenen Domain, sondern
  in einem Unterordner (`benutzername.github.io/projektname/`), müssen diese Pfade
  den Ordnernamen enthalten.

---

## Preise – wo sie überall stehen

Die Paketpreise stehen an **sechs** Stellen in zwei Dateien. Wer einen Preis ändert,
muss alle sechs anfassen, sonst widerspricht sich die Seite:

| Stelle | Datei |
|---|---|
| Paketkarte Starter | `index.html`, `.paket__betrag` |
| Paketkarte Business | `index.html`, `.paket__betrag` |
| Hero-Fakt „Festpreis ab …" | `index.html`, `.hero__facts` |
| Meta-Beschreibung im `<head>` | `index.html` |
| Empfehlungstext Starter | `script.js`, `EMPFEHLUNGEN.starter` |
| Empfehlungstext Business | `script.js`, `EMPFEHLUNGEN.business` |

Der Wartungspreis und sein Umfang stehen an **vier** Stellen: im Wartungsblock
(`index.html`, `.wartung__preis` und `.wartung__grenze`), in Schritt 5 des Ablaufs,
in der FAQ-Antwort „Was ist, wenn ich später etwas ändern will?" – und dieselbe
Antwort noch einmal im FAQPage-Schema im `<head>`. Die letzten beiden müssen
wortgleich bleiben.

**Aktueller Stand:** Starter 900–1.300 €, Business 1.800–2.800 €, Wartung
20–50 €/Monat mit bis zu zwei Textänderungen; alles darüber nach Aufwand.


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

- **`netlify.toml` statt Klicks im Dashboard.** Ohne die Datei stünden die
  Hosting-Einstellungen nur im Netlify-Konto — von Hand gesetzt, pro Projekt neu, für
  niemanden nachlesbar. Im Repository wandern sie bei jedem Klon mit und lassen sich in
  Kundenprojekte kopieren.

  **Der wichtigste Teil sind die drei Weiterleitungen.** Netlify veröffentlicht alles im
  publish-Verzeichnis. Ohne sie wären die Arbeitsnotizen unter `ihre-domain.de/README.md`
  öffentlich abrufbar — mit Preiskalkulation, Rechtsfragen und Launch-Checkliste darin.
  **Kommt eine weitere `.md`-Datei ins Wurzelverzeichnis, gehört sie dort ebenfalls
  hinein.** Dateien und Ordner, die mit einem Punkt beginnen (`.claude/`, `.DS_Store`),
  veröffentlicht Netlify ohnehin nicht.

  Die Sicherheits-Kopfzeilen sind knapp gehalten: nur solche, die bei einer statischen
  Seite ohne fremde Einbindungen nichts kaputtmachen können. Eine Content-Security-Policy
  fehlt absichtlich — die will geprüft sein, statt geraten.

- **Das Formular läuft über Netlify Forms, nicht über PHP oder einen Formulardienst.**
  Netlify liest beim Deploy das HTML, erkennt am Attribut `data-netlify="true"` das
  Formular und richtet es selbst ein. Das vorhandene Honeypot-Feld `website` wird über
  `data-netlify-honeypot` mitgenutzt – es war schon da, bevor Netlify feststand.

  **Kein PHP im Repository.** Netlify führt PHP nicht aus. Eine `.php`-Datei würde als
  Klartext ausgeliefert – mit allem, was darin steht, bis hin zur Empfängeradresse. Es
  gab zwischenzeitlich ein `kontakt.php` für den Fall eines deutschen Hosters; es wurde
  beim Wechsel zurück zu Netlify **gelöscht**, nicht nur abgeschaltet. Falls die
  Entscheidung je wieder kippt: `git log -- kontakt.php` findet es.

  **Ein Schalter, nicht zwei.** Das Formular trägt `data-entwurf="true"`; solange das
  Attribut da ist, blockiert `script.js` das Absenden und sagt dem Besucher offen, dass
  nichts gesendet wurde. `action` steht dagegen schon auf dem Endwert `/danke.html`. So
  gibt es am Launch-Tag genau einen Handgriff, und er gehört zur ohnehin fälligen
  Entfernung der Entwurfs-Kennzeichen. Die Prüfung auf einen Platzhalter in `action`
  bleibt als zweites Netz stehen.

  **Der Preis dafür steht in der Datenschutzerklärung.** Netlify ist ein US-Unternehmen;
  Hosting und Formular laufen über deren Server. Abschnitt 2 nennt Anschrift, Logdaten
  und die Übermittlung in die USA, Abschnitt 4 verweist für das Formular darauf. Zwei
  Dinge sind vor dem Livegang zu erledigen: der Auftragsverarbeitungsvertrag mit Netlify
  und die Prüfung auf dataprivacyframework.gov, ob Netlify dort mit aktivem Status
  geführt wird – davon hängt ab, ob die Übermittlung auf dem Angemessenheitsbeschluss
  oder auf Standardvertragsklauseln beruht.

- **Die Danke-Seite bleibt dauerhaft auf `noindex`.** Wer eine Bestätigungsseite über
  Google findet, hat nichts abgeschickt und läse eine Bestätigung für etwas, das nie
  passiert ist. Aus demselben Grund trägt sie kein Canonical.

- **Neue Eingabetypen im Formular gehören ins CSS.** Die Feldgestaltung greift über
  `.feld input[type="…"]`. Wird ein Feld mit einem noch nicht aufgeführten Typ ergänzt,
  fällt es stillschweigend auf die Browser-Voreinstellung zurück und sieht flacher aus
  als seine Nachbarn – genau das ist beim Telefonfeld zunächst passiert. Ein Test
  vergleicht deshalb Höhe, Breite, Rahmenstärke und Eckenradius aller Eingabefelder.

- **Alle Sektionsüberschriften teilen dieselbe linke Kante.** Die FAQ lief anfangs in einer
  schmaleren Spalte und begann dadurch 224 px weiter rechts als jede andere Sektion – beim
  Scrollen eine sichtbar gebrochene Kante. Jetzt läuft die Fragezeile über die volle
  Spaltenbreite, und nur der Antworttext ist auf 44 rem begrenzt, damit die Zeilen lesbar
  bleiben. Wer hier etwas ergänzt: `wrap--schmal` gehört nicht um eine ganze Sektion.

- **Im Kopfbereich steht nur „Morbe", überall sonst „Morbe Webdesign".** Die
  Wortmarke im Logo ist die Kurzform; der volle Name steht im Seitentitel, im
  Fußbereich, in beiden Rechtsseiten und in den strukturierten Daten. Das ist
  unproblematisch, weil das Impressum den vollständigen Namen samt Inhaber
  trägt — und im Kopfbereich erklärt die Zeile direkt darunter ohnehin, worum
  es geht („Webdesign für lokale Betriebe"). Ein Logo muss nicht buchstabieren,
  was die Überschrift eine Zeile später sagt.

- **Die drei Demos liegen unter `demo/` auf dieser Seite, nicht bei GitHub Pages.**
  Vorher sollten sie aus drei eigenen Repositories veröffentlicht werden. Das hätte
  drei Impressen, drei Datenschutzerklärungen und drei Veröffentlichungswege
  bedeutet — und Adressen wie `…github.io/Handwerker2000/solar-monteur/`, die man
  einem Kunden nicht zeigen möchte. Als Unterordner gilt für sie das Impressum
  dieser Seite, weil Diensteanbieter nach § 5 DDG ohnehin nicht der erfundene
  Betrieb ist, sondern der Betreiber. Der Preis dafür: 4,1 MB mehr im Repository
  und die Pflicht, jede Demo genauso sauber zu halten wie die Firmenseite. Details
  in [`DEMOS.md`](DEMOS.md).

- **Analytics und die Karteneinbettung sind aus der Sonnenwerk-Demo ausgebaut.**
  Unter eigener Adresse war der einwilligungsgesteuerte Analytics-Loader ein gutes
  Vorzeigestück — die meisten Baukastenseiten machen genau das falsch. Unter dieser
  Domain hätte er die Aussage „keine Cookies, kein Tracking, keine Drittinhalte"
  unwahr gemacht, und die ist ein Verkaufsargument. Am ernstesten war ein
  `preconnect` auf `google.com`: Der baut die Verbindung beim Seitenaufruf auf, also
  bevor jemand etwas anklickt. Ebenfalls stillgelegt: das Kontaktformular der Demo,
  das über Netlify Forms lief und hier echte Einsendungen erzeugt hätte.

- **Kein Google Analytics, keine Karte, keine Testimonials.** Alle drei stehen auf
  gängigen Launch-Checklisten und fehlen hier mit Absicht. Analytics und eine
  eingebettete Google-Karte würden nach § 25 TDDDG einen echten Cookie-Banner
  erzwingen, dazu einen Auftragsverarbeitungsvertrag und einen Abschnitt zum
  Drittlandtransfer – und damit genau das kaputt machen, was die Seite gerade
  auszeichnet: Sie braucht keine Einwilligung. Wenn später Zahlen nötig sind, sind
  einwilligungsfreie Werkzeuge wie Plausible oder die Server-Logs der richtige Weg.
  Bewertungen fehlen, weil es noch keine echten gibt; erfundene wären nach
  § 5b Abs. 3 UWG abmahnfähig, der ausdrücklich eine Prüfung der Echtheit verlangt.

- **FAQ mit FAQPage-Schema, aber ohne Erwartung an Rich Snippets.** Der Abschnitt
  steht direkt vor dem Formular, weil dort die letzten Einwände sitzen. Die
  Auszeichnung im `<head>` ist gültig und hilft beim maschinellen Verstehen der
  Seite; die früher üblichen aufgeklappten FAQ-Ergebnisse zeigt Google seit August
  2023 aber nur noch für Behörden- und Gesundheitsseiten. **Achtung:** Die Texte
  stehen doppelt – im Schema und in der Sektion. Änderungen immer an beiden Stellen.

- **Drei Branchen als Beispiele, nicht als Liste.** Der Fokus auf Handwerk, Salon und
  Gastro bleibt – er macht die Seite für diese Betriebe glaubwürdig, und eine Seite „für
  alle“ überzeugt niemanden. Weil drei Reiter sich aber schnell wie eine abschließende
  Aufzählung lesen, sagt es die Überschrift darüber direkt: „So könnte Ihre Seite
  aussehen – **zum Beispiel für:**“ bildet zusammen mit dem aktiven Reiter einen Satz.
  Dieselbe Klarstellung steht in der Hauptüberschrift: „Individuelle Webseiten –
  **unter anderem für** Handwerk, Salon und Gastro.“ Bewusst eine andere Wendung als
  bei den Reitern – zweimal „zum Beispiel“ im selben Bildausschnitt läse sich wie ein
  Echo, und „unter anderem“ sagt zusätzlich, dass es mehr gibt. „unter anderem“ und der
  Gedankenstrich hängen per `&nbsp;` an ihren Nachbarn, damit die Zeile nicht mitten in
  der Wendung oder vor dem Strich umbricht.
  Darunter hält ein zweiter Hinweis die Tür für alle anderen Branchen offen. Beides
  kostet den Fokus nichts und fängt genau die Besucher ab, die sonst ohne Anfrage
  weiterklicken. Die Wörter „Beispiel“ und „beispielhaft“ stehen deshalb bewusst nur
  einmal in diesem Bereich – wer hier etwas ergänzt, sollte sie nicht erneut aufgreifen.

  **Vorsicht bei reglementierten Berufen.** Anfragen aus Heilberufen (Arztpraxis,
  Physiotherapie, Heilpraktik, Apotheke) oder aus Rechts- und Steuerberatung sind
  fachlich machbar, rechtlich aber kein normaler Auftrag: Es gelten das
  **Heilmittelwerbegesetz** (§ 11 HWG schränkt zum Beispiel Vorher-Nachher-Bilder und
  Patientenstimmen stark ein), die **Berufsordnung der jeweiligen Kammer** und – sobald
  Gesundheitsdaten ins Spiel kommen, etwa über Terminbuchung oder ein Kontaktformular
  mit Beschwerdefeld – **Art. 9 DSGVO** mit deutlich höheren Anforderungen als bei einem
  Handwerksbetrieb. Vor der Zusage klären, wer für die Einhaltung geradesteht, und die
  Verantwortung schriftlich festhalten. Eine Seite, die den Kunden eine Abmahnung
  einbringt, ist teurer als der ganze Auftrag.

- **Initialen statt Portraitfotos.** Es gibt keine Pflicht, Fotos von sich zu
  veröffentlichen – § 5 DDG verlangt Name, Anschrift und Kontaktmöglichkeit, kein Bild.
  Datenschutzrechtlich ist der Verzicht sogar die ruhigere Variante: Ein Portrait ist ein
  personenbezogenes Datum und fällt zusätzlich unter das Recht am eigenen Bild; einmal
  veröffentlicht, wird es indexiert und lässt sich praktisch nicht zurückholen. Anonym
  ist die Seite deshalb nicht – die vollen Namen stehen im Impressum, wie es Pflicht ist.
  Vertrauen entsteht bei dieser Zielgruppe ohnehin über sichtbare Arbeitsproben, den
  Festpreis vorab, eine Telefonnummer und ein benanntes Einsatzgebiet. Fotos lassen sich
  jederzeit nachrüsten.

- **Die Seite spricht als Einzelperson („ich“).** Der Betrieb wurde zwischenzeitlich
  zu zweit geplant und die Seite entsprechend auf „wir“ umgestellt; seit der Mitgründer
  ausgestiegen ist, steht sie wieder durchgängig in der Ich-Form.

  **Eine Ausnahme, die bewusst stehen bleibt:** das einschließende „wir“, das *Sie und
  ich* meint – „Wir gehen die Seite gemeinsam durch“, „Texte und Bilder stimmen wir
  gemeinsam ab“, „legen wir im Erstgespräch gemeinsam fest“, „besprechen wir im
  Erstgespräch“. Das ist auch für einen Einzelunternehmer korrektes Deutsch; „Ich gehe
  die Seite gemeinsam durch“ wäre schlicht falsch. Erkennbar sind diese Stellen daran,
  dass sie eine gemeinsame Handlung beschreiben, meist mit dem Wort „gemeinsam“.

  **Drei weitere „wir“ gehören nicht dem Anbieter** und dürfen nie mit umgestellt
  werden: die Schlagzeile in der Branchen-Vorschau („Wenn's eilt, sind wir am selben
  Tag da“) gehört dem fiktiven Beispielbetrieb, „Über uns“ in der Liste typischer
  Unterseiten ist ein Seitenname auf der *Kunden*-Website, und der Platzhaltertext im
  Kontaktformular spricht aus Sicht des Besuchers.

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
