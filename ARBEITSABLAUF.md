# Arbeitsablauf: Hosting, Kundenprojekte, Veröffentlichen

Diese Datei hält Entscheidungen fest, die **nicht** die Website selbst betreffen, sondern
den Betrieb drumherum. Was die Website angeht, steht in der [README](README.md).

Stand: September 2026.

---

## 1. Hosting-Anbieter: Netlify

Verglichen wurden Netlify, ALL-INKL, Hetzner, netcup und Mittwald. Die Entscheidung ist
zwischenzeitlich auf ALL-INKL gefallen und wieder zurück auf Netlify gegangen – der Stand
hier ist der aktuelle.

**Wofür Netlify spricht:** Der Kunde legt sich ein Konto an und lädt mich als Mitarbeiter
ein; ich verbinde das GitHub-Repository, ab dann geht jeder Push automatisch live. Kein
FTP, keine Zugangsdaten, die weitergereicht werden. Formularverarbeitung ist eingebaut.

**Was Netlify nicht kann, und was daraus folgt:**

| Punkt | Konsequenz |
|---|---|
| Keine E-Mail-Postfächer | Kunden brauchen `info@ihre-domain.de` → **zweiter Anbieter nötig** |
| Oberfläche auf Englisch | Für die Zielgruppe kaum bedienbar → Rückfragen landen bei mir |
| US-Unternehmen | Drittlandtransfer in **jede** Kunden-Datenschutzerklärung |
| Kein PHP | `.php`-Dateien würden als Klartext ausgeliefert – dürfen nicht ins Repository |

Diese vier Punkte sind der Grund, warum die Entscheidung zwischenzeitlich gekippt war.
Sie bestehen weiter; sie sind bekannt und in Kauf genommen.

### Was das pro Projekt bedeutet

- **Auftragsverarbeitungsvertrag** mit Netlify abschließen. Gilt nicht automatisch mit
  der Anmeldung.
- **Auf dataprivacyframework.gov prüfen**, ob Netlify dort mit aktivem Status geführt
  wird. Ergebnis und Datum notieren. Davon hängt ab, ob die Übermittlung in die USA auf
  dem Angemessenheitsbeschluss oder auf Standardvertragsklauseln beruht.
- **Textbaustein Datenschutz** in die Kundenseite übernehmen – Formulierungen stehen in
  `datenschutz.html`, Abschnitte 2 und 4.
- **Postfach separat lösen.** Netlify liefert keines.

Die Prüfung auf dataprivacyframework.gov muss man einmal machen, nicht pro Projekt – das
Ergebnis gilt für alle. Aber sie muss regelmäßig wiederholt werden: Zertifizierungen
laufen jährlich aus, und das Framework ist bereits der dritte Anlauf; die beiden
Vorgänger wurden vom Europäischen Gerichtshof gekippt.

---

## 2. Ablauf bei einem Kundenprojekt

1. **Erstgespräch, Angebot, Zusage** — wie im Ablauf auf der Website beschrieben.
2. **Hosting gemeinsam einrichten.** Nicht „erstellen Sie sich mal einen Account" —
   das ist für einen Malermeister eine Hürde und führt zu einer Woche E-Mail-Pingpong.
   Stattdessen gemeinsam durchgehen, er sitzt daneben und gibt seine Daten ein.
   Dauert zehn Minuten und wirkt organisiert.
3. **Als Mitarbeiter einladen lassen.** Der Kunde lädt mich in seinem Netlify-Konto
   ein; damit brauche ich seine Zugangsdaten nicht.
4. **Website bauen**, Code in einem **privaten** GitHub-Repository.
5. **Veröffentlichen** — siehe Abschnitt 3.
6. **Übergabe**: alle Zugangsdaten an den Kunden, Passwörter ändern lassen.

### Zwei Regeln, die nicht verhandelbar sind

**Das Netlify-Konto gehört dem Kunden.** Nicht mir. Ich bin dort eingeladener
Mitarbeiter und kann jederzeit entfernt werden.

**Die Domain läuft auf den Kunden.** Nicht auf mich.

Beides folgt direkt aus dem Versprechen auf der eigenen Website: *„Die Seite gehört Ihnen.
Sie sind an niemanden gebunden – auch nicht an mich."* Läuft die Domain auf mich, stimmt
dieser Satz nicht mehr.

---

## 3. Vom Code auf den Server

Über Netlify: Repository verbinden, ab dann löst jeder Push zum Hauptzweig ein Deployment
aus. Nichts weiter einzurichten.

**ZIP-Upload vermeiden.** Netlify erlaubt auch, einen Ordner per Drag-and-drop
hochzuladen. Das funktioniert, lässt aber keine Versionsgeschichte entstehen – wenn eine
Änderung etwas kaputt macht, kommt man nicht zurück. Über das Repository sieht man jede
Änderung und kann jeden Stand wiederherstellen.

**Vorher klären:** Erlaubt Netlifys kostenlose Stufe überhaupt, Mitarbeiter einzuladen?
Teamfunktionen sind bei vielen Anbietern an bezahlte Tarife gebunden. Falls ein Kunde
allein deswegen einen kostenpflichtigen Plan bräuchte, kippt die Rechnung – das sollte
geklärt sein, bevor es einem Kunden zugesagt wird.

---

## 4. Offene Punkte

- [ ] **Prüfen, ob die kostenlose Netlify-Stufe Mitarbeiter erlaubt** (siehe Abschnitt 3)
- [ ] **Postfach-Anbieter auswählen.** Netlify liefert keines, für `info@ihre-domain.de`
      wird ein separater Dienst gebraucht.
- [x] ~~**Demo-Projekte umziehen?**~~ Erledigt: Sie liegen jetzt unter `demo/` in
      diesem Repository und werden mit der Firmenseite ausgeliefert. Ein Impressum,
      eine Datenschutzerklärung, keine zusätzlichen Domains → [`DEMOS.md`](DEMOS.md)
- [ ] **Textbaustein Datenschutz für Kundenprojekte.** Die Formulierungen aus
      `datenschutz.html`, Abschnitte 2 und 4, lassen sich fast wörtlich übernehmen. Wird
      eine Kundenseite ohne passende Datenschutzerklärung übergeben, ist das ein Mangel —
      und wenn der Kunde deswegen abgemahnt wird, kann er sich an mich halten.

---

## 5. Name und Domain

**Geschäftsbezeichnung: Morbe Webdesign.** Inhaber: Jannik Morbe. Als
Kleingewerbe im Einzelunternehmen gibt es keine Firma im rechtlichen Sinn — im
Impressum steht der bürgerliche Name, „Morbe Webdesign" ist die frei wählbare
Geschäftsbezeichnung. Sie musste nirgends angemeldet werden und wird bei der
Gewerbeanmeldung nur mit angegeben.

Geprüft vor der Entscheidung: keine gleichnamigen Webdesign-Anbieter in der
Region, in der Branche nur ein entfernter Namensvetter mit Umlaut und anderem
Auftritt (tumo media bei Dresden). Der erste Kandidat, **Nexora**, wurde
verworfen — drei Webdesign-Anbieter im deutschsprachigen Raum tragen ihn
bereits, dazu fünf eingetragene Firmen in Deutschland, darunter eine Berliner
Softwarefirma. Der Name stammt aus einer verbreiteten Webflow-Vorlage, was die
Häufung erklärt.

**Domain: noch nicht gekauft.** Frei sind (Stand September 2026)
`morbe-webdesign.de`, `webdesign-morbe.de` und `morbeweb.de`; `morbe.de` ist
vergeben. Der Kauf wartet bewusst, bis Firmen-Mail und Geschäftskonto stehen —
dann laufen Vertrag, Rechnung und Zahlung von Anfang an sauber über den Betrieb.

Rechtlich verliert man dadurch nichts: Bei einem Einzelunternehmen ist der
Domaininhaber in beiden Fällen dieselbe natürliche Person. Der Unterschied ist
reine Buchhaltung. Das Risiko, dass jemand zuvorkommt, ist gering — ein
Nachname mit Bindestrich und Branchenwort ist für Domainhändler wertlos.

Zwei Vorsichtsmaßnahmen bis dahin: nicht im Suchfeld eines Registrars nach der
Domain suchen und sie dann liegen lassen (manche Anbieter werten Suchanfragen
aus), und den Namen nicht öffentlich streuen, bevor die Domain gehört. Zieht
sich die Gewerbeanmeldung über zwei, drei Monate, lieber zwischendurch kaufen.

Die Domain steckt an **117 Stellen** im Repository: 7 auf der Firmenseite
(canonical, og:url, og:image, twitter:image) und 110 in den Demos. Die Befehle
zum Ersetzen stehen in [`DEMOS.md`](DEMOS.md).

---

## 6. Was noch für die eigene Seite fehlt

Steht ausführlich in der [README](README.md) unter „Was noch zu tun ist". Kurzfassung:

- Gewerbeanmeldung, danach Impressum und Datenschutz mit echten Daten
- Kurztext für die Über-mich-Karte
- Domain kaufen und die 117 Platzhalter ersetzen
- Am Launch-Tag: `data-entwurf` am Formular entfernen, E-Mail-Benachrichtigung im
  Netlify-Dashboard einschalten, Entwurfshinweise raus, `noindex` aus den drei
  öffentlichen Seiten, `robots.txt` und `sitemap.xml` anlegen, LocalBusiness-Schema
  aktivieren
