/* ===========================================================================
   [BITTE ERGÄNZEN: Firmenname] – Interaktionen
   ---------------------------------------------------------------------------
   Reines Vanilla JavaScript, keine Bibliothek, kein Build-Schritt.
   Jeder Block ist eigenständig: Fehlt ein Element auf einer Seite (z. B. das
   Formular auf dem Impressum), steigt der jeweilige Block still aus.

   Inhalt:
     1  Grundlagen (Bewegungseinstellung, Jahreszahl)
     2  Farbschema-Umschalter
     3  Kopfbereich: Schatten beim Scrollen
     4  Mobile Navigation
     5  Branchen-Vorschau im Hero (Tabs + automatischer Wechsel)
     6  Scroll-Einblendungen (IntersectionObserver)
     7  Kontaktformular: Prüfung und Rückmeldung
   =========================================================================== */

(function () {
  'use strict';

  /* =========================================================================
     1 – GRUNDLAGEN
     ========================================================================= */

  // Nutzer, die reduzierte Bewegung eingestellt haben, bekommen keine
  // Einblendungen und keinen automatischen Wechsel. Das ist keine Zusatzoption,
  // sondern eine Systemeinstellung, die respektiert gehört.
  var bewegungReduziert = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Jahreszahl im Fußbereich – damit dort nie ein veraltetes Jahr steht
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());


  /* =========================================================================
     2 – FARBSCHEMA-UMSCHALTER
     Das gespeicherte Schema wird bereits im <head> gesetzt, damit die Seite
     nicht kurz hell aufblitzt. Hier geht es nur noch ums Umschalten.
     ========================================================================= */

  (function farbschema() {
    var schalter = document.querySelector('.theme-toggle');
    if (!schalter) return;

    var wurzel = document.documentElement;
    var systemDunkel = window.matchMedia('(prefers-color-scheme: dark)');

    function istDunkel() {
      var gewaehlt = wurzel.dataset.theme;
      if (gewaehlt === 'dark') return true;
      if (gewaehlt === 'light') return false;
      return systemDunkel.matches;
    }

    function beschriftungAktualisieren() {
      var dunkel = istDunkel();
      schalter.setAttribute('aria-pressed', String(dunkel));
      var text = schalter.querySelector('.visually-hidden');
      if (text) {
        text.textContent = dunkel
          ? 'Helles Farbschema einschalten'
          : 'Dunkles Farbschema einschalten';
      }
    }

    schalter.addEventListener('click', function () {
      var neu = istDunkel() ? 'light' : 'dark';
      wurzel.dataset.theme = neu;
      try {
        localStorage.setItem('farbschema', neu);
      } catch (e) {
        // Privater Modus o. Ä. – die Wahl gilt dann nur für diesen Besuch.
      }
      beschriftungAktualisieren();
    });

    // Ändert der Nutzer die Systemeinstellung und hat hier nichts gewählt,
    // soll die Beschriftung mitziehen.
    if (typeof systemDunkel.addEventListener === 'function') {
      systemDunkel.addEventListener('change', beschriftungAktualisieren);
    }

    beschriftungAktualisieren();
  })();


  /* =========================================================================
     3 – KOPFBEREICH: SCHATTEN BEIM SCROLLEN
     ========================================================================= */

  (function kopfbereich() {
    var kopf = document.querySelector('.site-header');
    if (!kopf) return;

    var wartet = false;

    function pruefen() {
      kopf.classList.toggle('is-gescrollt', window.scrollY > 8);
      wartet = false;
    }

    // An den Bildaufbau gekoppelt statt bei jedem Scroll-Ereignis zu rechnen
    window.addEventListener('scroll', function () {
      if (wartet) return;
      wartet = true;
      window.requestAnimationFrame(pruefen);
    }, { passive: true });

    pruefen();
  })();


  /* =========================================================================
     4 – MOBILE NAVIGATION
     ========================================================================= */

  (function navigation() {
    var schalter = document.querySelector('.nav-toggle');
    var menue = document.getElementById('hauptnavigation');
    if (!schalter || !menue) return;

    function setzen(offen) {
      schalter.setAttribute('aria-expanded', String(offen));
      menue.classList.toggle('is-offen', offen);
    }

    schalter.addEventListener('click', function () {
      setzen(schalter.getAttribute('aria-expanded') !== 'true');
    });

    // Nach dem Antippen eines Links schließen
    menue.addEventListener('click', function (ereignis) {
      if (ereignis.target.closest('a')) setzen(false);
    });

    // Escape schließt und gibt den Fokus zurück auf die Schaltfläche
    document.addEventListener('keydown', function (ereignis) {
      if (ereignis.key === 'Escape' && schalter.getAttribute('aria-expanded') === 'true') {
        setzen(false);
        schalter.focus();
      }
    });

    // Klick außerhalb schließt ebenfalls
    document.addEventListener('click', function (ereignis) {
      if (schalter.getAttribute('aria-expanded') !== 'true') return;
      if (!menue.contains(ereignis.target) && !schalter.contains(ereignis.target)) {
        setzen(false);
      }
    });

    // Beim Wechsel auf Desktop-Breite den mobilen Zustand zurücksetzen
    var breit = window.matchMedia('(min-width: 900px)');
    if (typeof breit.addEventListener === 'function') {
      breit.addEventListener('change', function (e) { if (e.matches) setzen(false); });
    }
  })();


  /* =========================================================================
     5 – BRANCHEN-VORSCHAU IM HERO
     Umgesetzt nach dem ARIA-Muster für Tabs: Pfeiltasten wechseln, Pos1/Ende
     springen an den Rand, immer nur ein Tab ist im Tab-Ablauf erreichbar.
     ========================================================================= */

  (function vorschau() {
    var leiste = document.querySelector('.preview__tabs');
    if (!leiste) return;

    var tabs = Array.prototype.slice.call(leiste.querySelectorAll('[role="tab"]'));
    var pauseKnopf = document.querySelector('.preview__pause');
    var balken = document.querySelector('.preview__fortschritt');
    if (tabs.length === 0) return;

    var WECHSEL = 6000;              // Millisekunden pro Branche
    var aktiv = 0;
    var pausiert = bewegungReduziert.matches;   // bei reduzierter Bewegung: kein Autowechsel
    var uhr = null;

    function panelVon(tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    }

    function aktivieren(index, fokussieren) {
      aktiv = (index + tabs.length) % tabs.length;

      tabs.forEach(function (tab, i) {
        var gewaehlt = i === aktiv;
        tab.setAttribute('aria-selected', String(gewaehlt));
        tab.setAttribute('tabindex', gewaehlt ? '0' : '-1');
        tab.classList.toggle('is-active', gewaehlt);

        var panel = panelVon(tab);
        if (panel) panel.hidden = !gewaehlt;
      });

      if (fokussieren) tabs[aktiv].focus();
    }

    function fortschrittNeuStarten() {
      if (!balken) return;
      balken.classList.remove('is-laufend');
      void balken.offsetWidth;                        // Neuzeichnen erzwingen
      balken.style.setProperty('--dauer', WECHSEL + 'ms');
      balken.classList.toggle('is-pausiert', pausiert);
      if (!pausiert) balken.classList.add('is-laufend');
    }

    function planen() {
      window.clearTimeout(uhr);
      if (pausiert) return;
      uhr = window.setTimeout(function () {
        aktivieren(aktiv + 1, false);
        fortschrittNeuStarten();
        planen();
      }, WECHSEL);
    }

    function pauseSetzen(wert) {
      pausiert = wert;
      if (pauseKnopf) {
        pauseKnopf.setAttribute('aria-pressed', String(wert));
        var text = pauseKnopf.querySelector('.visually-hidden');
        if (text) {
          text.textContent = wert
            ? 'Automatischen Wechsel fortsetzen'
            : 'Automatischen Wechsel pausieren';
        }
      }
      if (balken) balken.classList.toggle('is-pausiert', wert);
      if (wert) {
        window.clearTimeout(uhr);
      } else {
        fortschrittNeuStarten();
        planen();
      }
    }

    // Klick auf einen Tab: anzeigen und den Automatikwechsel anhalten,
    // damit die Seite dem Nutzer nicht ins Handwerk pfuscht.
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        aktivieren(i, false);
        pauseSetzen(true);
      });
    });

    leiste.addEventListener('keydown', function (ereignis) {
      var ziel = null;
      switch (ereignis.key) {
        case 'ArrowRight': case 'ArrowDown': ziel = aktiv + 1; break;
        case 'ArrowLeft':  case 'ArrowUp':   ziel = aktiv - 1; break;
        case 'Home':                         ziel = 0; break;
        case 'End':                          ziel = tabs.length - 1; break;
        default: return;
      }
      ereignis.preventDefault();
      aktivieren(ziel, true);
      pauseSetzen(true);
    });

    if (pauseKnopf) {
      pauseKnopf.addEventListener('click', function () {
        pauseSetzen(pauseKnopf.getAttribute('aria-pressed') !== 'true');
      });
    }

    // Im Hintergrundtab nicht weiterlaufen lassen
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        window.clearTimeout(uhr);
      } else if (!pausiert) {
        fortschrittNeuStarten();
        planen();
      }
    });

    // Ändert jemand die Bewegungseinstellung im laufenden Betrieb
    if (typeof bewegungReduziert.addEventListener === 'function') {
      bewegungReduziert.addEventListener('change', function (e) { pauseSetzen(e.matches); });
    }

    aktivieren(0, false);
    pauseSetzen(pausiert);
  })();


  /* =========================================================================
     6 – SCROLL-EINBLENDUNGEN
     Bewusst zurückhaltend: einmal einblenden, nicht wieder ausblenden, und
     nur, wenn der Browser IntersectionObserver kann. Ohne JavaScript oder bei
     reduzierter Bewegung ist ohnehin alles sofort sichtbar (siehe styles.css).
     ========================================================================= */

  (function einblenden() {
    if (bewegungReduziert.matches) return;
    if (!('IntersectionObserver' in window)) return;

    var elemente = document.querySelectorAll('.reveal');
    if (elemente.length === 0) return;

    document.documentElement.classList.add('js-reveal');

    var beobachter = new IntersectionObserver(function (eintraege, selbst) {
      eintraege.forEach(function (eintrag) {
        if (!eintrag.isIntersecting) return;
        eintrag.target.classList.add('is-sichtbar');
        selbst.unobserve(eintrag.target);         // einmal reicht
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });

    // Elemente derselben Gruppe leicht versetzt einblenden – höchstens drei
    // Stufen, sonst wirkt es langsam statt lebendig.
    var vorherigesElternteil = null;
    var stufe = 0;

    elemente.forEach(function (element) {
      if (element.parentElement === vorherigesElternteil) {
        stufe = Math.min(stufe + 1, 3);
      } else {
        stufe = 0;
        vorherigesElternteil = element.parentElement;
      }
      element.style.setProperty('--verzoegerung', (stufe * 90) + 'ms');
      beobachter.observe(element);
    });
  })();


  /* =========================================================================
     7 – KONTAKTFORMULAR
     ========================================================================= */

  (function formular() {
    var form = document.getElementById('anfrage-formular');
    if (!form) return;

    var status = document.getElementById('formular-status');
    var honigtopf = form.querySelector('[name="website"]');
    var schonAbgeschickt = false;      // erst nach dem ersten Versuch live prüfen

    var regeln = [
      {
        feld: form.querySelector('#f-name'),
        fehler: document.getElementById('fehler-name'),
        pruefen: function (wert) {
          if (wert.trim().length === 0) return 'Bitte geben Sie Ihren Namen an.';
          if (wert.trim().length < 2) return 'Der Name scheint zu kurz zu sein.';
          return '';
        }
      },
      {
        feld: form.querySelector('#f-mail'),
        fehler: document.getElementById('fehler-mail'),
        pruefen: function (wert) {
          if (wert.trim().length === 0) return 'Ohne E-Mail-Adresse kann ich nicht antworten.';
          // Bewusst großzügig: strengere Muster sperren gültige Adressen aus.
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert.trim())) {
            return 'Diese E-Mail-Adresse sieht nicht vollständig aus.';
          }
          return '';
        }
      },
      {
        feld: form.querySelector('#f-projekt'),
        fehler: document.getElementById('fehler-projekt'),
        pruefen: function (wert) {
          if (wert.trim().length === 0) return 'Bitte beschreiben Sie kurz Ihr Vorhaben.';
          if (wert.trim().length < 10) return 'Ein bis zwei Sätze mehr helfen mir sehr weiter.';
          return '';
        }
      },
      {
        feld: form.querySelector('#f-dsgvo'),
        fehler: document.getElementById('fehler-dsgvo'),
        istHaken: true,
        pruefen: function (_wert, angehakt) {
          return angehakt ? '' : 'Ohne diese Einwilligung darf ich Ihre Anfrage nicht verarbeiten.';
        }
      }
    ].filter(function (regel) { return regel.feld && regel.fehler; });

    function regelPruefen(regel) {
      var meldung = regel.istHaken
        ? regel.pruefen('', regel.feld.checked)
        : regel.pruefen(regel.feld.value);

      regel.fehler.textContent = meldung;
      if (meldung) {
        regel.feld.setAttribute('aria-invalid', 'true');
      } else {
        regel.feld.removeAttribute('aria-invalid');
      }
      return meldung === '';
    }

    // Nach dem ersten Absendeversuch direkt Rückmeldung geben, sobald ein
    // Feld verlassen oder korrigiert wird.
    regeln.forEach(function (regel) {
      regel.feld.addEventListener('blur', function () {
        if (schonAbgeschickt) regelPruefen(regel);
      });
      regel.feld.addEventListener(regel.istHaken ? 'change' : 'input', function () {
        if (schonAbgeschickt) regelPruefen(regel);
      });
    });

    form.addEventListener('submit', function (ereignis) {
      schonAbgeschickt = true;

      // Spamfalle: Für Menschen unsichtbar. Ist sie gefüllt, war es ein Bot.
      if (honigtopf && honigtopf.value !== '') {
        ereignis.preventDefault();
        return;
      }

      var ersterFehler = null;
      regeln.forEach(function (regel) {
        if (!regelPruefen(regel) && !ersterFehler) ersterFehler = regel.feld;
      });

      if (ersterFehler) {
        ereignis.preventDefault();
        if (status) status.textContent = '';
        ersterFehler.focus();
        return;
      }

      // Solange kein echter Endpunkt eingetragen ist, wird nichts verschickt.
      // Ein Formular, das so tut, als hätte es gesendet, ist schlimmer als keines.
      var ziel = form.getAttribute('action') || '';
      if (ziel === '' || ziel.indexOf('BITTE ERGÄNZEN') !== -1) {
        ereignis.preventDefault();
        if (status) {
          status.textContent =
            'Ihre Angaben sind vollständig – abgeschickt wurde aber noch nichts: ' +
            'Diese Seite ist ein Entwurf und hat noch kein Ziel für das Formular. ' +
            'Bitte schreiben Sie mir bis dahin direkt per E-Mail.';
          status.focus && status.focus();
        }
        return;
      }

      // Ab hier übernimmt der Browser den regulären Versand an das action-Ziel.
      if (status) status.textContent = 'Anfrage wird gesendet …';
    });
  })();

})();
