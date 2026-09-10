<?php
/* ============================================================================
   KONTAKTFORMULAR – VERSAND PER E-MAIL

   Nimmt die Formulardaten entgegen, prueft sie und schickt sie an das eigene
   Postfach. Laeuft auf jedem gaengigen Webhosting-Paket mit PHP; es werden
   keine Bibliotheken und keine Fremddienste gebraucht.

   Ablauf:
     Besucher fuellt das Formular aus  ->  index.html
     Diese Datei prueft und verschickt ->  kontakt.php
     Besucher sieht die Bestaetigung   ->  danke.html

   VOR DEM LIVEGANG AUSFUELLEN: die drei Einstellungen direkt darunter.
   ============================================================================ */


/* --- EINSTELLUNGEN -------------------------------------------------------- */

// Wohin die Anfragen gehen sollen – Ihr eigenes Postfach.
$empfaenger = '[BITTE ERGÄNZEN: E-Mail-Adresse]';

// Absender der Benachrichtigung. MUSS eine Adresse Ihrer eigenen Domain sein,
// z. B. website@ihre-domain.de. Traegt hier die Adresse des Besuchers, faellt
// die Mail bei vielen Anbietern durch die Spampruefung (SPF/DKIM schlagen fehl),
// weil Ihr Server nicht berechtigt ist, in fremdem Namen zu versenden.
// Die Adresse des Besuchers steht stattdessen unten im Reply-To.
$absender = '[BITTE ERGÄNZEN: website@ihre-domain.de]';

// Betreffzeile der Benachrichtigung.
$betreff = 'Neue Anfrage über die Website';


/* --- HILFSFUNKTIONEN ------------------------------------------------------ */

/**
 * Entfernt Zeilenumbrueche aus Werten, die spaeter in einen Mail-Kopf wandern.
 *
 * Ohne das waere die groesste Luecke eines jeden Mailformulars offen: Wer in
 * das E-Mail-Feld einen Zeilenumbruch gefolgt von "Bcc: opfer@example.com"
 * schreibt, haengt der Nachricht einen weiteren Empfaenger an und macht aus
 * dem Kontaktformular einen Spamverteiler. Das nennt sich Header-Injection.
 */
function kopfzeile_saeubern($wert) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d"), '', $wert));
}

/**
 * Bricht mit einer schlichten Fehlerseite ab.
 *
 * Wird nur erreicht, wenn JavaScript ausgeschaltet ist oder ein Bot direkt auf
 * diese Datei zugreift – im Normalfall prueft das Formular schon im Browser.
 */
function abbrechen($meldung) {
    http_response_code(400);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">'
       . '<meta name="viewport" content="width=device-width, initial-scale=1">'
       . '<meta name="robots" content="noindex, nofollow">'
       . '<title>Anfrage konnte nicht gesendet werden</title>'
       . '<link rel="stylesheet" href="assets/fonts.css">'
       . '<link rel="stylesheet" href="styles.css"></head>'
       . '<body class="rechtsseite"><main class="legal fehler"><div class="wrap wrap--schmal">'
       . '<p class="eyebrow">Anfrage nicht gesendet</p>'
       . '<h1>Da ist etwas schiefgegangen.</h1>'
       . '<p class="fehler__lead">' . htmlspecialchars($meldung, ENT_QUOTES, 'UTF-8') . '</p>'
       . '<div class="fehler__aktionen">'
       . '<a class="btn btn--primary" href="index.html#kontakt">Zurück zum Formular</a>'
       . '</div></div></main></body></html>';
    exit;
}


/* --- 1. NUR ECHTE ABSENDUNGEN DURCHLASSEN --------------------------------- */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Wer die Datei direkt im Browser aufruft, gehoert auf die Startseite.
    header('Location: index.html', true, 303);
    exit;
}


/* --- 2. SPAMFALLE --------------------------------------------------------- */

// Das Feld "website" ist im Formular fuer Menschen unsichtbar. Ist es gefuellt,
// war es ein Bot. Wir tun so, als waere alles gut gegangen – ein Bot, der eine
// Fehlermeldung bekommt, versucht es sonst mit anderen Feldern noch einmal.
if (!empty($_POST['website'])) {
    header('Location: danke.html', true, 303);
    exit;
}


/* --- 3. FELDER EINLESEN --------------------------------------------------- */

$name     = isset($_POST['name'])     ? trim($_POST['name'])     : '';
$mail     = isset($_POST['email'])    ? trim($_POST['email'])    : '';
$telefon  = isset($_POST['telefon'])  ? trim($_POST['telefon'])  : '';
$projekt  = isset($_POST['projekt'])  ? trim($_POST['projekt'])  : '';
$dsgvo    = isset($_POST['datenschutz']);


/* --- 4. PRUEFEN ----------------------------------------------------------- */

// Dieselben Regeln wie im Browser (script.js, Block 7). Serverseitig noch
// einmal, weil sich die Pruefung im Browser umgehen laesst.
if ($name === '' || mb_strlen($name) < 2) {
    abbrechen('Bitte geben Sie Ihren Namen an.');
}
if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    abbrechen('Diese E-Mail-Adresse sieht nicht vollständig aus.');
}
if (mb_strlen($projekt) < 10) {
    abbrechen('Bitte beschreiben Sie kurz Ihr Vorhaben.');
}
if (!$dsgvo) {
    abbrechen('Ohne die Einwilligung darf ich Ihre Anfrage nicht verarbeiten.');
}
// Telefon ist freiwillig – geprueft wird nur, wenn etwas drinsteht.
if ($telefon !== '' && strlen(preg_replace('/\D/', '', $telefon)) < 6) {
    abbrechen('Diese Telefonnummer sieht unvollständig aus.');
}

// Laengenbegrenzung: haelt aufgeblaehte Absendungen aus dem Postfach.
if (mb_strlen($projekt) > 5000 || mb_strlen($name) > 200 || mb_strlen($mail) > 200) {
    abbrechen('Ihre Angaben sind zu lang. Bitte fassen Sie sich etwas kürzer.');
}


/* --- 5. NACHRICHT ZUSAMMENBAUEN ------------------------------------------- */

$zeilen = array(
    'Name:     ' . $name,
    'E-Mail:   ' . $mail,
    'Telefon:  ' . ($telefon !== '' ? $telefon : '– nicht angegeben –'),
    '',
    'Worum es geht:',
    $projekt,
    '',
    str_repeat('-', 60),
    'Gesendet am ' . date('d.m.Y \u\m H:i \U\h\r'),
    'Einwilligung zur Datenverarbeitung: erteilt',
);
$nachricht = implode("\r\n", $zeilen);

// Alles, was in einen Kopf wandert, wird von Zeilenumbruechen befreit.
$kopf = array(
    'From: ' . kopfzeile_saeubern($absender),
    'Reply-To: ' . kopfzeile_saeubern($mail),   // Antworten gehen an den Besucher
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
    'X-Mailer: PHP/' . phpversion(),
);


/* --- 6. VERSENDEN --------------------------------------------------------- */

// Der Betreff darf Umlaute enthalten, muss dafuer aber kodiert werden.
$betreff_kodiert = '=?UTF-8?B?' . base64_encode($betreff) . '?=';

$erfolg = mail(
    kopfzeile_saeubern($empfaenger),
    $betreff_kodiert,
    $nachricht,
    implode("\r\n", $kopf)
);

if (!$erfolg) {
    abbrechen(
        'Die Nachricht konnte technisch nicht zugestellt werden. '
        . 'Bitte schreiben Sie mir direkt per E-Mail – die Adresse steht im Impressum.'
    );
}


/* --- 7. BESTAETIGUNG ------------------------------------------------------ */

// 303 statt 302: Danach ist es ein GET. Ohne das wuerde ein Neuladen der
// Bestaetigungsseite die Anfrage ein zweites Mal abschicken.
header('Location: danke.html', true, 303);
exit;
