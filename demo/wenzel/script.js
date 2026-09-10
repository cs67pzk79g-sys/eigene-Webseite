/* =============================================================
   Frisörsalon Wenzel – script.js

   Vier kleine Aufgaben, mehr braucht die Seite nicht:
   1. Mobile Navigation auf-/zuklappen
   2. Sticky-Header beim Scrollen einfärben
   3. Öffnungsstatus aus den Öffnungszeiten berechnen
   4. Dezentes Scroll-Reveal + Formularprüfung

   Kein Framework, keine Animationsbibliothek – alles Vanilla JS.
   ============================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     Öffnungszeiten an EINER Stelle pflegen.
     Schlüssel = Wochentag (0 = Sonntag ... 6 = Samstag).
     Zeiten in Minuten seit Mitternacht, null = geschlossen.
     Wird hier geändert, ändern sich Status-Anzeige und Hinweistext
     automatisch mit. Die Tabelle im HTML bitte parallel anpassen.
     ----------------------------------------------------------- */
  var OEFFNUNGSZEITEN = {
    0: null,                  // Sonntag
    1: null,                  // Montag – Ruhetag
    2: { von: 9 * 60, bis: 18 * 60 },
    3: { von: 9 * 60, bis: 18 * 60 },
    4: { von: 9 * 60, bis: 20 * 60 },   // Donnerstag länger
    5: { von: 9 * 60, bis: 18 * 60 },
    6: { von: 8 * 60, bis: 13 * 60 }    // Samstag
  };

  var WOCHENTAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  function uhrzeit(minuten) {
    var h = Math.floor(minuten / 60);
    var m = minuten % 60;
    return h + ":" + (m < 10 ? "0" + m : m);
  }

  /* -----------------------------------------------------------
     1. Mobile Navigation
     ----------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("hauptnavigation");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var offen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", offen ? "true" : "false");
    });

    // Nach dem Antippen eines Links wieder schließen
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Escape schließt das Menü ebenfalls
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     2. Sticky-Header beim Scrollen
     ----------------------------------------------------------- */
  var header = document.getElementById("site-header");

  if (header) {
    var wartetAufFrame = false;

    var pruefeScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      wartetAufFrame = false;
    };

    window.addEventListener("scroll", function () {
      if (!wartetAufFrame) {
        wartetAufFrame = true;
        window.requestAnimationFrame(pruefeScroll);
      }
    }, { passive: true });

    pruefeScroll();
  }

  /* -----------------------------------------------------------
     3. Öffnungsstatus berechnen
     ----------------------------------------------------------- */
  function ermittleStatus(jetzt) {
    var tag = jetzt.getDay();
    var minutenJetzt = jetzt.getHours() * 60 + jetzt.getMinutes();
    var heute = OEFFNUNGSZEITEN[tag];

    if (heute && minutenJetzt >= heute.von && minutenJetzt < heute.bis) {
      return {
        offen: true,
        text: "Jetzt geöffnet",
        detail: "noch bis " + uhrzeit(heute.bis) + " Uhr"
      };
    }

    // Heute später noch geöffnet?
    if (heute && minutenJetzt < heute.von) {
      return {
        offen: false,
        text: "Gerade geschlossen",
        detail: "heute ab " + uhrzeit(heute.von) + " Uhr"
      };
    }

    // Nächsten geöffneten Tag suchen (max. 7 Tage voraus)
    for (var i = 1; i <= 7; i++) {
      var naechsterTag = (tag + i) % 7;
      var zeiten = OEFFNUNGSZEITEN[naechsterTag];
      if (zeiten) {
        var bezeichnung = i === 1 ? "morgen" : WOCHENTAGE[naechsterTag];
        return {
          offen: false,
          text: "Gerade geschlossen",
          detail: bezeichnung + " ab " + uhrzeit(zeiten.von) + " Uhr"
        };
      }
    }

    return { offen: false, text: "Gerade geschlossen", detail: "" };
  }

  function zeigeStatus() {
    var status = ermittleStatus(new Date());

    var badge = document.getElementById("status-badge");
    if (badge) {
      badge.classList.toggle("is-open", status.offen);
      badge.classList.toggle("is-closed", !status.offen);
      var textEl = badge.querySelector(".status__text");
      if (textEl) {
        textEl.textContent = status.detail
          ? status.text + " · " + status.detail
          : status.text;
      }
    }

    var hinweis = document.getElementById("status-hint");
    if (hinweis) {
      hinweis.textContent = status.offen
        ? "Wir sind gerade da – " + status.detail + "."
        : "Wir sind gerade nicht im Salon – " + status.detail + ".";
    }
  }

  function markiereHeute() {
    var tabelle = document.getElementById("hours-table");
    if (!tabelle) return;

    var heute = String(new Date().getDay());
    var zeilen = tabelle.querySelectorAll("tr[data-day]");
    for (var i = 0; i < zeilen.length; i++) {
      zeilen[i].classList.toggle("is-today", zeilen[i].getAttribute("data-day") === heute);
    }
  }

  zeigeStatus();
  markiereHeute();

  // Einmal pro Minute nachziehen – falls die Seite länger offen bleibt
  window.setInterval(function () {
    zeigeStatus();
    markiereHeute();
  }, 60000);

  /* -----------------------------------------------------------
     4a. Scroll-Reveal (dezent, nur wenn gewünscht)
     Die Klasse wird erst per JS gesetzt: ohne JS bleibt alles sichtbar.
     ----------------------------------------------------------- */
  var wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!wenigerBewegung && "IntersectionObserver" in window) {
    var elemente = document.querySelectorAll(
      ".section__head, .section__body, .section__media, .price-group, .team-card, .gallery li, .review, .rating-summary, .booking__widget, .booking__direct, .card"
    );

    var beobachter = new IntersectionObserver(function (eintraege, obs) {
      eintraege.forEach(function (eintrag) {
        if (eintrag.isIntersecting) {
          eintrag.target.classList.add("is-visible");
          obs.unobserve(eintrag.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    elemente.forEach(function (el) {
      el.classList.add("reveal");
      beobachter.observe(el);
    });

    /* Sicherheitsnetz: Alles, was schon im sichtbaren Bereich liegt oder
       darüber, wird sofort gezeigt. Sonst könnte jemand, der per Link
       mitten in die Seite springt oder sehr schnell scrollt, kurz vor
       leeren Abschnitten sitzen. Ein Effekt darf nie Inhalte verstecken. */
    var zeigeWasSichtbarIst = function () {
      elemente.forEach(function (el) {
        if (el.classList.contains("is-visible")) return;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
          beobachter.unobserve(el);
        }
      });
    };

    zeigeWasSichtbarIst();
    window.addEventListener("load", zeigeWasSichtbarIst);
    window.addEventListener("hashchange", function () {
      window.setTimeout(zeigeWasSichtbarIst, 400);
    });
  }

  /* -----------------------------------------------------------
     4b. Kontaktformular prüfen
     Demo: es wird nichts verschickt, nur geprüft und bestätigt.
     ----------------------------------------------------------- */
  var formular = document.getElementById("kontakt-formular");

  if (formular) {
    var felder = [
      { id: "feld-name", fehlerId: "fehler-name", meldung: "Bitte geben Sie Ihren Namen an." },
      { id: "feld-kontakt", fehlerId: "fehler-kontakt", meldung: "Bitte hinterlassen Sie eine Telefonnummer oder E-Mail-Adresse, damit wir antworten können." },
      { id: "feld-nachricht", fehlerId: "fehler-nachricht", meldung: "Bitte schreiben Sie uns kurz, worum es geht." },
      { id: "feld-datenschutz", fehlerId: "fehler-datenschutz", meldung: "Bitte bestätigen Sie den Hinweis zum Datenschutz." }
    ];

    function pruefeFeld(feld) {
      var eingabe = document.getElementById(feld.id);
      var fehler = document.getElementById(feld.fehlerId);
      if (!eingabe || !fehler) return true;

      var gueltig = eingabe.type === "checkbox"
        ? eingabe.checked
        : eingabe.value.trim().length > 0;

      fehler.textContent = gueltig ? "" : feld.meldung;
      fehler.hidden = gueltig;
      eingabe.setAttribute("aria-invalid", gueltig ? "false" : "true");

      var wrapper = eingabe.closest(".field");
      if (wrapper) wrapper.classList.toggle("field--invalid", !gueltig);

      return gueltig;
    }

    // Nach dem ersten Fehler direkt beim Tippen wieder prüfen
    felder.forEach(function (feld) {
      var eingabe = document.getElementById(feld.id);
      if (!eingabe) return;
      eingabe.addEventListener("input", function () {
        if (eingabe.getAttribute("aria-invalid") === "true") pruefeFeld(feld);
      });
      eingabe.addEventListener("change", function () {
        if (eingabe.getAttribute("aria-invalid") === "true") pruefeFeld(feld);
      });
    });

    formular.addEventListener("submit", function (event) {
      event.preventDefault();

      var meldung = document.getElementById("formular-status");
      var ersterFehler = null;

      felder.forEach(function (feld) {
        var okay = pruefeFeld(feld);
        if (!okay && !ersterFehler) ersterFehler = document.getElementById(feld.id);
      });

      if (ersterFehler) {
        if (meldung) meldung.textContent = "";
        ersterFehler.focus();
        return;
      }

      if (meldung) {
        meldung.textContent = "Vielen Dank! In der fertigen Seite wäre Ihre Nachricht jetzt bei uns im Postfach.";
      }
      formular.reset();
    });
  }
})();
