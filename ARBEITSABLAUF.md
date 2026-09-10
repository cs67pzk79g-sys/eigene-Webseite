# Arbeitsablauf: Hosting, Kundenprojekte, Veröffentlichen

Diese Datei hält Entscheidungen fest, die **nicht** die Website selbst betreffen, sondern
den Betrieb drumherum. Was die Website angeht, steht in der [README](README.md).

Stand: September 2026.

---

## 1. Hosting-Anbieter: ALL-INKL.COM

Entschieden nach einem Vergleich mit Netlify, Hetzner, netcup und Mittwald.

**Der ausschlaggebende Grund war nicht technisch.** Bei Kundenprojekten besitzt der Kunde
den Hosting-Vertrag — er bekommt die Rechnungen, die Passwort-Mails, und er ruft dort an,
wenn etwas klemmt. Ein Anbieter, den ein Handwerksmeister nicht bedienen kann, verlagert
diesen Support auf mich, unbezahlt, nach einem abgerechneten Festpreisprojekt.

ALL-INKL hat eine deutschsprachige Telefon-Hotline rund um die Uhr und ein
Verwaltungssystem (KAS), das für Menschen gebaut ist und nicht für Administratoren.

### Welcher Tarif für wen

| | Tarif | Warum |
|---|---|---|
| **Eigene Seite** | PrivatPlus | 5 Domains: eigene Seite plus die drei Demo-Projekte |
| **Kundenprojekte** | der kleinste | Ein Kunde braucht eine Domain und ein paar Postfächer |

Kunden nicht unnötig den größeren Tarif empfehlen.

### Warum nicht Netlify

War zwischenzeitlich eingebaut und wurde wieder entfernt. Drei Gründe:

- **Keine E-Mail-Postfächer.** Kunden brauchen `info@ihre-domain.de`. Jedes Projekt
  bräuchte also zwei Anbieter, zwei Verträge, zwei Rechnungen.
- **Englische Oberfläche**, für die Zielgruppe nicht bedienbar.
- **Drittlandtransfer in die USA**, der in jede einzelne Kunden-Datenschutzerklärung
  müsste — samt Auftragsverarbeitungsvertrag und jährlicher Prüfung, ob der Anbieter im
  EU-US Data Privacy Framework gelistet ist.

Bei deutschem Hosting entfällt das alles ersatzlos.

---

## 2. Ablauf bei einem Kundenprojekt

1. **Erstgespräch, Angebot, Zusage** — wie im Ablauf auf der Website beschrieben.
2. **Hosting gemeinsam einrichten.** Nicht „erstellen Sie sich mal einen Account" —
   das ist für einen Malermeister eine Hürde und führt zu einer Woche E-Mail-Pingpong.
   Stattdessen gemeinsam durchgehen, er sitzt daneben und gibt seine Daten ein.
   Dauert zehn Minuten und wirkt organisiert.
3. **Eigenen FTP-Benutzer anlegen**, beschränkt auf das Webverzeichnis. Nicht den
   Hauptzugang des Kunden verwenden — der öffnet auch Postfach und Rechnungsdaten.
4. **Website bauen**, Code in einem **privaten** GitHub-Repository.
5. **Veröffentlichen** — siehe Abschnitt 3.
6. **Übergabe**: alle Zugangsdaten an den Kunden, Passwörter ändern lassen.

### Zwei Regeln, die nicht verhandelbar sind

**Der Hosting-Vertrag läuft auf den Kunden.** Nicht auf mich.

**Die Domain läuft auf den Kunden.** Nicht auf mich.

Beides folgt direkt aus dem Versprechen auf der eigenen Website: *„Die Seite gehört Ihnen.
Sie sind an niemanden gebunden – auch nicht an mich."* Läuft die Domain auf mich, stimmt
dieser Satz nicht mehr.

---

## 3. Vom Code auf den Server

Klassisches Hosting kennt kein automatisches Deployment wie Netlify. Drei Wege:

| Weg | Aufwand | Bewertung |
|---|---|---|
| Von Hand per FTP (FileZilla o. ä.) | keine Einrichtung | funktioniert immer, bei fünf Dateien eine Minute |
| **GitHub Actions → FTP-Upload** | einmal pro Projekt | **empfohlen** |
| Git per SSH auf dem Server | SSH nötig | bringt gegenüber Weg 2 nichts |

**Weg 2 ist der Netlify-Ersatz:** Eine Konfigurationsdatei im Repository, ab dann lädt
GitHub bei jedem Push die Dateien selbst hoch. Arbeitsweise bleibt `git push`.

**Sicherheit dabei:** Der Upload braucht Zugangsdaten. Dafür den eigenen, auf ein
Verzeichnis beschränkten FTP-Benutzer nehmen (siehe Abschnitt 2) und die Daten als
GitHub Secrets hinterlegen. Das Repository muss privat sein — es sind Kundendaten.

> **Noch nicht gebaut.** Die GitHub-Actions-Konfiguration steht aus. Sie soll so
> kommentiert sein, dass sie sich in jedes Kundenprojekt kopieren lässt.

---

## 4. Offene Punkte

- [ ] **GitHub-Actions-Konfiguration** für den FTP-Upload bauen (siehe Abschnitt 3)
- [ ] **`kontakt.php` bei ALL-INKL testen, bevor die Seite live geht.** Manche Hoster
      sperren die PHP-Funktion `mail()` und verlangen SMTP. Dann muss das Skript
      umgebaut werden — etwa zehn Zeilen, aber das will man nicht am Launch-Tag merken.
- [ ] **Demo-Projekte umziehen?** `DEMOS-VORBEREITEN.md` beschreibt noch den Weg über
      GitHub Pages. Mit eigenem Hosting könnten sie unter `demo.ihre-domain.de/…` laufen.
      Das spart drei separate Impressen — das eigene deckt sie ab — und sieht vor einem
      Kunden besser aus als eine `github.io`-Adresse.
- [ ] **Textbaustein Datenschutz für Kundenprojekte.** Die Formulierungen aus
      `datenschutz.html`, Abschnitte 2 und 4, lassen sich fast wörtlich übernehmen. Wird
      eine Kundenseite ohne passende Datenschutzerklärung übergeben, ist das ein Mangel —
      und wenn der Kunde deswegen abgemahnt wird, kann er sich an mich halten.

---

## 5. Was noch für die eigene Seite fehlt

Steht ausführlich in der [README](README.md) unter „Was noch zu tun ist". Kurzfassung:

- Gewerbeanmeldung, danach Impressum und Datenschutz mit echten Daten
- Kurztext für die Über-mich-Karte, Ort und Einsatzgebiet
- Am Launch-Tag: Empfänger in `kontakt.php`, `data-entwurf` am Formular entfernen,
  Entwurfshinweise raus, `noindex` aus den drei öffentlichen Seiten, `robots.txt` und
  `sitemap.xml` anlegen, LocalBusiness-Schema aktivieren
