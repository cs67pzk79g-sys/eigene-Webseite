# Die drei Demo-Projekte

Die Referenzkacheln auf der Startseite führen zu drei Demo-Websites, die unter
`demo/` in diesem Repository liegen und mit der Firmenseite zusammen ausgeliefert
werden.

| Kachel | Ordner | Adresse |
|---|---|---|
| HAARSCHARF. | `demo/haarscharf/` | `ihre-domain.de/demo/haarscharf/` |
| Frisörsalon Wenzel | `demo/wenzel/` | `ihre-domain.de/demo/wenzel/` |
| Sonnenwerk Solartechnik | `demo/sonnenwerk/` | `ihre-domain.de/demo/sonnenwerk/` |

---

## Warum sie hier liegen und nicht woanders

Vorher lagen die drei in eigenen Repositories und sollten über GitHub Pages
veröffentlicht werden. Das hätte bedeutet: drei Impressen, drei
Datenschutzerklärungen, drei Veröffentlichungswege — und Adressen der Form
`cs67pzk79g-sys.github.io/Handwerker2000/solar-monteur/`, die man einem Kunden
nicht gern zeigt.

Als Unterordner der Firmenseite ist das alles ein Vorgang:

- **Ein Impressum.** Diensteanbieter im Sinne von § 5 DDG ist ohnehin nicht der
  erfundene Salon, sondern der Betreiber dieser Seite. Es gibt also keinen Grund,
  denselben Text dreimal zu pflegen.
- **Eine Datenschutzerklärung.** Was in den Demos passiert, steht in
  `datenschutz.html`, Abschnitt 8.
- **Ein Deployment.** Ein Push, alles ist live.
- **Keine zusätzlichen Domains.**

Die Original-Repositories bleiben bestehen. Was hier liegt, ist eine Kopie mit den
unten beschriebenen Änderungen — wer die Demos weiterentwickelt, sollte wissen,
dass die beiden Stände seit dem Umzug auseinanderlaufen.

---

## Was beim Umzug geändert wurde

**Alle drei Demos**

- Oben auf jeder Seite eine Hinweisleiste: kennzeichnet die Seite als Schaustück,
  führt zurück zur Firmenseite und verlinkt das Impressum. Gestaltet in
  `demo/demo-hinweis.css` — bewusst außerhalb der drei Demo-Ordner, weil die
  Leiste nicht zur Demo gehört, sondern zur Firmenseite, die sie zeigt. Sie stützt
  sich auf keine Variable und keine Schrift der jeweiligen Demo.
- `noindex, nofollow` auf jeder Seite. Drei erfundene Betriebe haben in
  Suchergebnissen nichts zu suchen — weder als Verwirrung für Suchende noch als
  Konkurrenz zur eigenen Seite.
- Die eigenen `impressum.html` und `datenschutz.html` wurden gelöscht, alle
  Verweise darauf zeigen jetzt auf die Rechtsseiten der Firmenseite.
- `robots.txt` und `sitemap.xml` entfernt — eine Sitemap, die fünfzehn erfundene
  Seiten zur Indexierung anbietet, ist genau das Gegenteil von `noindex`.
- Fest eingetragene `github.io`-Adressen in Canonical, Open Graph und
  strukturierten Daten auf `https://[BITTE ERGÄNZEN: Domain]/demo/…` umgestellt.

**Nur Sonnenwerk**

Diese Demo hatte als einzige externe Verbindungen. Alle drei sind ausgebaut:

| Was | Warum es raus musste |
|---|---|
| Google Analytics samt Cookie-Banner | Auf eigener Adresse ein gutes Vorzeigestück. Unter der Firmendomain hätte es die Aussage „keine Cookies, kein Tracking" in `datenschutz.html` unwahr gemacht — und die ist ein Verkaufsargument. |
| Google-Maps-Einbettung | Dasselbe. Die gezeichnete Einsatzgebietskarte, die vorher nur der Platzhalter war, ist geblieben — sie sieht ohnehin besser aus. |
| `<link rel="preconnect" href="https://www.google.com">` | Das war der ernsteste Punkt: Ein Preconnect baut die Verbindung beim Seitenaufruf auf, also **bevor** jemand irgendetwas anklickt oder einwilligt. |

Außerdem stillgelegt: Das Kontaktformular lief über Netlify Forms und hätte unter
der Firmendomain echte Einsendungen erzeugt. Die Eingabeprüfung arbeitet
unverändert und die Bestätigungsseite erscheint — gesendet wird nichts, die
Eingaben verlassen den Browser nicht.

Geblieben sind zwei gewöhnliche Links zu Google (Routenplanung, Bewertungssuche).
Links übertragen erst beim Anklicken Daten; das ist bei jedem externen Link so.

---

## Vor dem Livegang

- [ ] `[BITTE ERGÄNZEN: Domain]` durch die echte Domain ersetzen — 110 Stellen in
      `demo/haarscharf/` und `demo/sonnenwerk/`:
      ```
      grep -rl 'BITTE ERGÄNZEN: Domain' demo/ | xargs sed -i 's|\[BITTE ERGÄNZEN: Domain\]|ihre-domain.de|g'
      ```
- [ ] `[BITTE ERGÄNZEN: Firmenname]` in der Hinweisleiste ersetzen — 18 Stellen,
      eine je Demo-Seite. Achtung: Dort steht die HTML-Schreibweise
      `[BITTE ERG&Auml;NZEN: Firmenname]`.
- [ ] Alle drei Demos am Handy durchklicken, nicht nur am Rechner.
- [ ] Prüfen, dass die Hinweisleiste auf **jeder** Unterseite steht — auch auf den
      sechs Referenz- und sechs Leistungsseiten von Sonnenwerk.

Das `noindex` in den Demos bleibt dauerhaft stehen. Es wird beim Livegang **nicht**
mit entfernt — anders als das `noindex` der drei öffentlichen Seiten.

---

## Wenn eine vierte Demo dazukommt

1. Ordner unter `demo/` anlegen. Nur Seitendateien hineinkopieren, keine
   `README.md`, keine `.github/`, keine `.DS_Store` — was im Ordner liegt, wird
   ausgeliefert.
2. Alle Pfade müssen relativ sein. Ein `href="/css/style.css"` zeigt sonst ins
   Wurzelverzeichnis der Firmenseite.
3. Auf jeder Seite: `<meta name="robots" content="noindex, nofollow">`,
   `<link rel="stylesheet" href="../demo-hinweis.css">` und die Hinweisleiste
   direkt hinter dem Sprunglink.
4. Eigene Rechtsseiten löschen, Verweise auf `../../impressum.html` und
   `../../datenschutz.html` umbiegen.
5. Keine externen Aufrufe, die ohne Klick starten — kein Analytics, keine
   eingebetteten Karten, keine Schriften von fremden Servern, kein `preconnect`.
6. Bringt die Demo eine eigene 404-Seite mit, in `netlify.toml` eine
   Weiterleitung ergänzen (Muster siehe die beiden vorhandenen).
7. Kachel in `index.html` ergänzen und einen echten Screenshot unter `assets/`
   ablegen.

---

## Was die Demos bewusst nicht sind

Sie sind **keine Kundenprojekte**. Das steht auch so über den Kacheln auf der
Startseite, und es sollte dort stehen bleiben, solange es stimmt: Eine als Referenz
ausgegebene Übungsarbeit wäre eine irreführende geschäftliche Handlung nach § 5
UWG. Sobald echte Kundenprojekte dazukommen, gehören die Demos nach unten oder ganz
heraus.
