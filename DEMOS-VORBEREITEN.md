# Demo-Projekte veröffentlichen

Diese Anleitung gehört zu den drei Referenzkacheln auf der Startseite. Sie betrifft
**nicht** dieses Repository, sondern die drei Demo-Repositories:

| Kachel | Repository | Adresse nach dem Einschalten |
|---|---|---|
| HAARSCHARF. | `cs67pzk79g-sys/Friseur` | `https://cs67pzk79g-sys.github.io/Friseur/` |
| Frisörsalon Wenzel | `cs67pzk79g-sys/Friseur-Vorzeige-2` | `https://cs67pzk79g-sys.github.io/Friseur-Vorzeige-2/` |
| Sonnenwerk Solartechnik | `cs67pzk79g-sys/Handwerker2000` | `https://cs67pzk79g-sys.github.io/Handwerker2000/solar-monteur/` |

Die Links in `index.html` zeigen bereits auf diese Adressen. Sie funktionieren,
sobald die Schritte unten erledigt sind.

> **Reihenfolge:** Erst wenn die Gewerbeanmeldung steht und du echte Kontaktdaten
> hast, machst du das hier. Vorher kannst du die Rechtsseiten nicht ausfüllen –
> und ohne ausgefüllte Rechtsseiten darf keine der Seiten online.

---

## Warum das überhaupt nötig ist

Sobald eine Demo öffentlich abrufbar ist und von deiner Firmenseite als Referenz
verlinkt wird, ist sie Teil deines geschäftlichen Auftritts. Damit greift die
Impressumspflicht nach § 5 DDG.

Entscheidend: **Du** bist der Diensteanbieter dieser Seiten, nicht der erfundene
Salon. Es gehören also deine echten Angaben hinein – dieselben wie auf deiner
Firmenseite. Erfundene Impressumsdaten wären keine Lösung, sondern ein eigener
Fehler.

Der Aufwand ist deshalb kleiner, als es klingt: Du brauchst das Impressum für
deine Firmenseite ohnehin. Hier wird derselbe Text ein zweites Mal eingesetzt.

---

## Schritt 1 – GitHub Pages einschalten

Pro Repository auf GitHub: **Settings → Pages**.

**Friseur** und **Friseur-Vorzeige-2**
- Unter *Build and deployment* → *Source*: „Deploy from a branch"
- Branch: `main`, Ordner: `/ (root)` → *Save*

**Handwerker2000**
- Unter *Source*: **„GitHub Actions"** wählen (nicht „Deploy from a branch")
- Der passende Workflow liegt schon im Repository: `.github/workflows/pages.yml`.
  Er veröffentlicht den Ordner `test/`. Einmal unter *Actions* starten oder
  einen beliebigen Commit auf `main` pushen.

Nach ein bis zwei Minuten sind die Adressen aus der Tabelle oben erreichbar.
Groß- und Kleinschreibung im Pfad zählt.

---

## Schritt 2 – Rechtsseiten ausfüllen

Alle drei Repositories haben bereits ausgearbeitete Platzhalterseiten
(`impressum.html` und `datenschutz.html`, 128 bis 214 Zeilen). Du musst sie nur
füllen, nicht neu schreiben.

### Impressum

In allen drei Demos identisch, mit **deinen** echten Angaben – kopiere den Text
aus der `impressum.html` dieses Repositories, sobald du sie ausgefüllt hast.

Ergänze oben einen Satz, der klarstellt, worum es geht:

> Diese Seite ist ein Demonstrationsprojekt. Der dargestellte Betrieb existiert
> nicht; Name, Anschrift, Preise und Bewertungen sind Beispieldaten. Verantwortlich
> für dieses Demonstrationsprojekt im Sinne von § 5 DDG ist:

Danach deine echten Angaben. Alle Kammer-, Handelsregister- und
Steuernummernfelder der Demo-Vorlagen, die auf dich nicht zutreffen, **löschen** –
nicht leer stehen lassen.

### Datenschutzerklärung

Hier unterscheiden sich die drei, weil sie technisch unterschiedlich sind. Jede
beschreibt nur, was sie selbst tatsächlich tut:

| Demo | Was hinein muss |
|---|---|
| HAARSCHARF. | Hosting; sonst nichts – die Seite hat keine externen Aufrufe |
| Frisörsalon Wenzel | Hosting; WhatsApp-Links (`wa.me`) – sie übertragen erst beim Anklicken Daten an Meta |
| Sonnenwerk | Hosting; Google Analytics (nur nach Einwilligung); Google-Maps-Einbettung (nur nach Klick) |

**Wichtig bei allen dreien – und leicht zu übersehen:** Gehostet wird bei
**GitHub Inc., einem Unternehmen von Microsoft mit Sitz in den USA.** Beim Aufruf
gehen IP-Adresse und Zugriffsdaten dorthin. Das gehört in die Datenschutzerklärung
als Empfänger benannt, zusammen mit einem Hinweis auf die Übermittlung in ein
Drittland.

> Das gilt genauso für deine Firmenseite, falls du sie ebenfalls über GitHub Pages
> veröffentlichst. In `datenschutz.html` dieses Repositories steht dafür der
> Platzhalter beim Hosting-Anbieter – dort dann GitHub eintragen, nicht Hetzner.

---

## Schritt 3 – Demo-Hinweis oben einbauen

Sonnenwerk hat bereits einen. HAARSCHARF und Wenzel bekommen diesen Block als
**allererstes Element direkt nach `<body>`**, auf jeder Seite der Demo:

```html
<div class="demo-hinweis" role="note">
  <p>
    <strong>Demo-Projekt.</strong> Dieser Betrieb ist frei erfunden – Name,
    Anschrift, Preise, Team und Bewertungen sind Beispieldaten.
    <a href="https://DEINE-DOMAIN.de/">Zurück zu [Firmenname]</a>
  </p>
</div>
```

Dazu dieses CSS ans Ende der jeweiligen Stylesheet-Datei. Es ist bewusst
eigenständig gehalten und stützt sich auf keine Variable der Demo:

```css
/* Demo-Hinweis – kennzeichnet die Seite als Schaustück */
.demo-hinweis {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: .7rem 1rem;
  background: #3B2508;
  color: #F6E3C8;
  font: 500 14px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif;
  text-align: center;
}
.demo-hinweis p { margin: 0; }
.demo-hinweis a {
  color: #F0C077;
  text-decoration: underline;
  text-underline-offset: .2em;
  white-space: nowrap;
}
.demo-hinweis a:hover { color: #FFFFFF; }
```

Kontraste geprüft: 11,5:1 für den Text, 8,6:1 für den Link – beide deutlich über
der AA-Anforderung von 4,5:1.

Der Rücklink hat einen Nebeneffekt, der dir nützt: Wer sich in der Demo festguckt,
findet den Weg zurück zu dir.

---

## Schritt 4 – Nicht von Google indexieren lassen

In den `<head>` **jeder** HTML-Datei der drei Demos:

```html
<meta name="robots" content="noindex, nofollow">
```

Grund: Drei erfundene Betriebe sollen nicht in den Suchergebnissen auftauchen –
weder als Verwirrung für Suchende noch als Konkurrenz zu deiner eigenen Seite.

Zusätzlich bei **Sonnenwerk**: `sitemap.xml` löschen (15 Einträge, sie lädt
Suchmaschinen geradezu zur Indexierung ein) und in `robots.txt`, falls vorhanden,
`Disallow: /` eintragen.

`noindex` hält nur Suchmaschinen fern. Es macht die Seiten **nicht** privat – wer
die Adresse hat, kommt hinein. Genau deshalb sind die Schritte 2 und 3 nicht
optional.

---

## Sonderfall Sonnenwerk: Analytics

In `js/script.js` steht `GA_MEASUREMENT_ID = "G-XXXXXXXXXX"` – ein Platzhalter.
Gemessen wird also nichts. Der Einwilligungsbanner selbst funktioniert korrekt:
„Alle ablehnen" ist gleich prominent wie „Alle akzeptieren", und geladen wird erst
nach Zustimmung. Das ist genau das, was die meisten Baukastenseiten falsch machen –
als Vorzeigestück also wertvoll.

Du hast zwei saubere Möglichkeiten:

1. **So lassen.** Der Banner sagt die Wahrheit: Nach Zustimmung wird Google
   Analytics geladen. Die Datenschutzerklärung der Demo muss es dann benennen.
2. **Analytics entfernen.** Den Loader in `js/script.js` und den Banner ausbauen.
   Dann entfällt der Punkt in der Datenschutzerklärung – aber auch das
   Vorzeigestück.

Empfehlung: **so lassen.** Dass deine eigene Firmenseite trotzdem ohne Cookie-Banner
auskommt, liegt daran, dass die Demo unter einer anderen Adresse läuft. Genau
deshalb war die schlanke Variante die richtige Wahl.

---

## Zum Schluss prüfen

- [ ] Alle drei Adressen aus der Tabelle öffnen sich
- [ ] Auf jeder Demo: Impressum in höchstens zwei Klicks erreichbar
- [ ] Impressum enthält deine echten Daten, keine erfundenen
- [ ] Demo-Hinweis auf jeder Seite jeder Demo sichtbar
- [ ] Rücklink im Hinweis führt auf deine Firmenseite
- [ ] Quelltext einer Unterseite: `noindex` vorhanden
- [ ] Die drei Kacheln auf deiner Startseite führen ans richtige Ziel
- [ ] Am Handy geprüft, nicht nur am Rechner

> Das hier ist eine sorgfältig zusammengestellte Checkliste, keine Rechtsberatung.
> Für die verbindliche Prüfung ist die IHK der günstigste Weg.
