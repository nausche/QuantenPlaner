============================================================
           QUANTUM-PLANER - FORGE OF EMPIRES
============================================================
Version: 2.5
Kategorie: Interaktiver Guide & Utility
============================================================

Dieses Tool ist eine interaktive Schritt-für-Schritt-Anleitung 
für die Quanten-Invasionen (QI) in Forge of Empires. 
Es hilft dabei, den optimalen Aufbau der Siedlung effizient 
und fehlerfrei umzusetzen. Basiert auf der Anleitung von Linnun FOE.

------------------------------------------------------------
CHANGELOG / VERSIONSHISTORIE
------------------------------------------------------------

### NEU IN VERSION 2.5
* WOCHENTAG-BASIERTE NUMMERIERUNG:
  Die Schritt-Titel wurden auf ein Wochentag-System umgestellt (z.B. "1. Donnerstag morgen"), 
  um die zeitliche Planung innerhalb der Quanten-Saison intuitiver zu gestalten.

### NEU IN VERSION 2.4
* LAYOUT-FIX MANUELLE AUSWAHL:
  Das Layout der manuellen Auswahlreihen wurde optimiert. Dropdown-Menüs und der 
  Löschen-Button (✖) passen nun auch bei schmaleren Ansichten perfekt in den Rahmen.
* GLOBAL BOX-SIZING:
  Einführung von `box-sizing: border-box` für alle Elemente, um konsistente Breiten 
  und Abstände über alle Browser hinweg zu garantieren.
* UI-FEINSCHLIFF:
  Abstände und Schriftgrößen in den manuellen Eingabefeldern wurden subtil angepasst, 
  um den Platz optimal zu nutzen.

### NEU IN VERSION 2.3
* PANEL-VERBREITERUNG:
  Das Desktop-Sidepanel wurde um 10% verbreitert (von 420px auf 462px), um eine bessere 
  Lesbarkeit der Texte und eine großzügigere Darstellung der Gebäude-Icons zu ermöglichen.
* BOOKMARKLET-UPDATE:
  Die automatische Side-View Integration (Bookmarklet) wurde ebenfalls auf die neue 
  Breite angepasst.

### NEU IN VERSION 2.2
* WINDOWS UHR INTEGRATION:
  Alle Warte-Timer verfügen nun über einen direkten Link zur "Windows Uhr" App (`ms-clock:`). 
  Dies ermöglicht das schnelle Setzen von systemweiten Weckern oder Timern parallel zum Planer.
* PREMIUM UI-LINK:
  Der Link ist dezent als "🕒 Planer" Button in die Timer-Oberfläche integriert und passt sich 
  harmonisch dem Design an.

### NEU IN VERSION 2.1
* SIDE-VIEW PROMO AUF STARTSEITE:
  Die Anleitung für den PC Side-View wurde für eine bessere Auffindbarkeit direkt 
  auf die Startseite verschoben.
* COLLAPSIBLE UI:
  Die Side-View Anleitung kann nun über einen kleinen Pfeil-Button minimiert werden, 
  um Platz für die Guide-Auswahl zu sparen. Der Zustand wird dauerhaft gespeichert.
* ENTSCHLACKTES MODAL:
  Der Handy-Link (QR-Code) verbleibt exklusiv im Synchronisierungs-Menü, um die 
  Bedienung zu fokussieren.
* LAYOUT-OPTIMIERUNG:
  Die Season-Überschrift wurde unter die Side-View Anleitung verschoben und das 
  Quanten-Rechner Icon auf der Startseite um 50% verkleinert, um die visuelle 
  Struktur zu schärfen.

### NEU IN VERSION 2.0
* UI-FIX DROPDOWNS:
  Das Dropdown-Menü für die Anzahl manuell zugefügter Gebäude wurde schmaler gestaltet, 
  um ein Überstehen über den Rahmen (besonders auf schmalen Displays) zu verhindern.
* KOMFORTFUNKTIONEN:
  Einführung von "Paste"-Buttons (📋) im Quanten-Rechner, um Bonus-Werte direkt aus 
  der Zwischenablage einzufügen.
* SMART DEVICE SELECTION:
  Beim ersten Start wird nun direkt gefragt, ob die mobile Ansicht (Vollbild) 
  oder die Desktop-Ansicht (Side-View) genutzt werden soll.
* LOCAL-ONLY PRIVACY:
  Der Fortschritt wird nun ausschließlich lokal auf dem jeweiligen Gerät 
  gespeichert. Die fehleranfällige Code-Synchronisation wurde für maximale 
  Datensicherheit und Einfachheit entfernt.
* QUICK-SYNC QR:
  Der QR-Code dient nun als schneller Link-Verteiler, um den Planer 
  unverzüglich auf dem Handy zu öffnen.
* UI-OPTIMIERUNG:
  Das Desktop-Sidepanel wurde verbreitert (ehemals 420px) und die manuellen 
  Gebäude-Dropdowns für eine bessere Lesbarkeit korrigiert.
* HYBRID DESKTOP SIDEPANEL:
  Auf Desktop-PCs dockt die App nun automatisch als Sidepanel am rechten 
  Bildschirmrand an. Der restliche Bereich wird durch ein atmosphärisches 
  Ambiente-Layout ergänzt.
* OPTIMIERTES MOBILE-UI:
  Auf Handys wird automatisch die Vollbild-Web-Ansicht genutzt. Das Layout 
  skaliert perfekt auf jede Displaygröße.
* VIEWPORT-FIX:
  Verhindert unerwünschtes Zoomen auf mobilen Geräten für eine stabilere Bedienung.

### FEATURES AUS VERSION 1.6
* MOBIL-SYNCHRONISIERUNG (QR-CODE):
  Transferiere deine Stadtplanung mit einem Scan auf dein Handy.
  Ideal zum Ernten und Kämpfen von unterwegs!
* HYBRID-WEB-SUPPORT:
  Die App läuft nun sowohl als Chrome-Erweiterung als auch als 
  standalone Webseite (z.B. auf GitHub Pages).
* UNIVERSAL STORAGE WRAPPER:
  Nahtlose Nutzung von Chrome Storage (PC) und LocalStorage 
  (Handy) für konsistente Datenhaltung.
* AUTO-IMPORT VIA DEEP-LINKING:
  Ein Klick auf den Sync-Link (via QR) lädt sofort deinen 
  aktuellen Fortschritt in den mobilen Browser.
* DYNAMISCHE QR-CODE GENERIERUNG:
  Erzeugt automatisch Codes passend zu deiner GitHub-URL für 
  ein perfektes Zusammenspiel der Geräte.

### FEATURES AUS VERSION 1.5
* INTELLIGENTE MANUELLE AUSWAHL (1:1 PROPAGATION):
  Gebäude in manuellen Slots werden nun 1:1 in alle folgenden 
  Schritte übernommen. Einmal planen – die ganze Saison nutzen!
* VEREINFACHTE BEDIENUNG (QUICK-CLEAR):
  Rotes "✖"-Symbol zum sofortigen Leeren eines Slots. 
  Entschlacktes UI für maximale Geschwindigkeit.
* AUTOMATISCHE ABRISS-REFUNDS FÜR EXTRAS:
  Rückgewinn-Berechnung nun auch für manuelle Gebäudeanpassungen 
  in der Ernte-Prognose.
* VISUELLE STATUS-MARKER:
  Farbige Leisten am linken Rand (Grün: Bau, Rot: Abriss, 
  Gelb: Timer) zur schnellen Orientierung.
* OPTIMIERTES LAYOUT & SCROLL-FIX:
  Bessere Positionierung der Baupläne und Ernteinfos sowie 
  Fix der Scroll-Position bei Auswahländerungen.
* KUMULATIVE ERNTE-BERECHNUNG:
  Präzise Summierung aller Guide-Gebäude und manuellen Extras 
  über alle Schritte hinweg.

### FEATURES AUS VERSION 1.4
* INTERAKTIVE ERNTE-PROGNOSE:
  Anzeige der zu erwartenden Ernte inkl. Rückgewinnung aus 
  Abrissen am Ende jedes Schrittes.
* DETAIL-TOOLTIPS (HOVER):
  Genaue Aufschlüsselung der Produktionswerte (z.B. AAP/h) 
  beim Überfahren der Icons.
* NEUES CLICK-TO-COMPLETE SYSTEM:
  Checklisten-Handling per Direktklick auf die Anweisungen 
  für ein moderneres Bediengefühl.
* OPTIMIERTES AKTIONSPUNKTE-FORMAT:
  Umstellung auf das intuitive "+X/h" Format für Aktionspunkte.

### FEATURES AUS VERSION 1.3
* SIDE PANEL INTEGRATION:
  Die Erweiterung öffnet sich nun nativ im Chrome Side Panel 
  statt in einem separaten Popup.
* THEME SUPPORT (DARK/LIGHT):
  Implementierung von Dark- und Light-Mode mit automatischer 
  Speicherung der Nutzer-Präferenz.
* 17-SCHRITTE MASTERPLAN:
  Vollständiger Guide für alle 17 Phasen des Mittelalter-Aufbaus.
* INTERAKTIVE MODAL-VORSCHAU:
  Klickbare Baupläne mit hochauflösender Vollbild-Ansicht 
  zur besseren Orientierung.

------------------------------------------------------------
BEWÄHRTE FUNKTIONEN
------------------------------------------------------------

1. STATUS-SPEICHERUNG:
   Der Planer merkt sich deinen Fortschritt und deine 
   Einstellungen (Theme/Schritt) auch nach dem Schließen.

2. TIMER & NOTIFICATIONS:
   Icon-Badge in der Toolbar und Desktop-Meldungen informieren 
   dich zuverlässig über abgelaufene Wartezeiten.

3. FLEXIBLE NAVIGATION:
   Schneller Wechsel zwischen allen Phasen über das 
   Dropdown-Menü oder die "Nächster Schritt"-Buttons.

------------------------------------------------------------
## 🛠 INSTALLATION & NUTZUNG
------------------------------------------------------------

Du kannst den Quantum-Planer auf drei Arten nutzen:

### 1. Als Webseite (Empfohlen für Browser & Handy)
Öffne einfach deine GitHub Pages URL (z.B. `https://nausche.github.io/QuantenPlaner/`).
*   **Am PC:** Wähle beim Start "Desktop Side-View", um den Planer platzsparend am Rand zu nutzen.
*   **Am Handy / Tablet:** Wähle "Mobil / Vollbild". Tipp: Nutze die "Zum Home-Bildschirm hinzufügen" Funktion deines Browsers für ein App-Gefühl.

### 2. Als Side-View direkt im Spiel (Bild-im-Bild)
1.  Öffne den Planer im Browser.
2.  Klicke auf das **Handy-Icon (📱)** oben rechts.
3.  Wähle den Tab **"Side-View (PC)"**.
4.  Ziehe den goldenen **"QP Side-View"** Button in deine Lesezeichen-Leiste.
5.  Öffne nun *Forge of Empires* und klicke auf das Lesezeichen, um den Planer ein- oder auszublenden.

### 3. Als Chrome-Erweiterung (Lokal)
1.  Lade das Repository herunter und entpacke es.
2.  Öffne in Chrome `chrome://extensions/`.
3.  Aktiviere oben rechts den **Entwicklermodus**.
4.  Klicke auf **"Entpackte Erweiterung laden"** und wähle den Ordner aus.
5.  Pinne die Erweiterung in deiner Toolbar, um sie jederzeit im echten Chrome-Sidepanel zu öffnen.

---
Viel Erfolg bei den Invasionen!
============================================================