// Konfiguriert die Erweiterung so, dass beim Klick auf das Icon das Sidepanel öffnet
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  console.log("Quantum-Planer v1.3 erfolgreich installiert.");
});