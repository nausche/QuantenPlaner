// === STORAGE WRAPPER FOR EXTENSION & WEB ===
const storage = {
  get: (keys, cb) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(keys, (data) => cb(data));
    } else {
      const result = {};
      const keyArr = Array.isArray(keys) ? keys : [keys];
      keyArr.forEach(k => {
        const val = localStorage.getItem(k);
        try { result[k] = val ? JSON.parse(val) : undefined; } catch (e) { result[k] = val; }
      });
      cb(result);
    }
  },
  set: (obj, cb) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(obj, cb);
    } else {
      Object.keys(obj).forEach(k => {
        localStorage.setItem(k, JSON.stringify(obj[k]));
      });
      if (cb) cb();
    }
  },
  remove: (key, cb) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove(key, cb);
    } else {
      localStorage.removeItem(key);
      if (cb) cb();
    }
  },
  clear: (cb) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.clear(cb);
    } else {
      localStorage.clear();
      if (cb) cb();
    }
  }
};

// === BUILDING DATA & LOGIC ===
const buildingStats = {
  // === RESIDENTIAL ===
  // FMA
  "multistory_house": {
    name: "Mehrgeschossiges Haus", type: "residential",
    production: { coins: 12500, supplies: 0, alloys: 10 },
    refund: { coins: 2500, supplies: 0, alloys: 0 },
    actions: 0, combat: 0
  },
  "frame_house": {
    name: "Fachwerkhaus", type: "residential",
    production: { coins: 25000, supplies: 0, alloys: 75 },
    refund: { coins: 7500, supplies: 12500, alloys: 50 },
    actions: 0, combat: 0
  },
  "clapboard_house": {
    name: "Schindelhaus", type: "residential",
    production: { coins: 130000, supplies: 0, alloys: 250 },
    refund: { coins: 52500, supplies: 50000, alloys: 250 },
    actions: 0, combat: 0
  },
  // HMA
  "mansion": {
    name: "Herrenhaus", type: "residential",
    production: { coins: 7500, supplies: 0, alloys: 10 },
    refund: { coins: 3500, supplies: 0, alloys: 0 },
    bonus: { coins: 10, supplies: 0 },
    actions: 0, combat: 0
  },
  // "sandstone_house" missing in logic/IDs but added here if needed? Not used in steps yet.

  // SMA
  "estate_house": {
    name: "Gutshaus", type: "residential",
    production: { coins: 3750, supplies: 0, alloys: 10 },
    refund: { coins: 4000, supplies: 0, alloys: 0 },
    bonus: { coins: 20, supplies: 0 },
    actions: 0, combat: 0
  },

  // === PRODUCTION ===
  // FMA
  "tannery": {
    name: "Gerberei", type: "production",
    production: { coins: 0, supplies: 12000, alloys: 10 },
    refund: { coins: 3000, supplies: 0, alloys: 0 },
    actions: 0, combat: 0
  },
  // "shoemaker" missing
  "bakery": {
    name: "Bäckerei", type: "production",
    production: { coins: 0, supplies: 60000, alloys: 250 },
    refund: { coins: 21000, supplies: 25000, alloys: 250 },
    actions: 0, combat: 0
  },
  // HMA
  "alchemist": {
    name: "Alchemistenlabor", type: "production",
    production: { coins: 0, supplies: 14400, alloys: 75 },
    refund: { coins: 12600, supplies: 15000, alloys: 50 },
    bonus: { coins: 0, supplies: 10 },
    actions: 0, combat: 0
  },
  "windmill": {
    name: "Windmühle", type: "production",
    production: { coins: 0, supplies: 36000, alloys: 250 },
    refund: { coins: 29400, supplies: 30000, alloys: 250 },
    bonus: { coins: 0, supplies: 0 }, // Image shows 10% Supp Boost which is handled via type? Or explicit bonus.
    // Alchemist has 10% too. Windmill 10%. Farm 10%.
    // My logic uses 'bonus' field.
    // Let's add bonus to Windmill.
    // Wait, Windmill in image: Boost (Münzen/Vorräte): 10%.
    // Alchemist: 10%.
    // Farm (Bauernhof): 10%.
    actions: 0, combat: 0
  },
  // SMA
  "brewery": {
    name: "Brauerei", type: "production",
    production: { coins: 0, supplies: 4800, alloys: 10 },
    refund: { coins: 4800, supplies: 0, alloys: 0 },
    bonus: { coins: 0, supplies: 20 },
    actions: 0, combat: 0
  },
  "spice_trader": {
    name: "Gewürzhandlung", type: "production",
    production: { coins: 0, supplies: 9600, alloys: 75 },
    refund: { coins: 14400, supplies: 17500, alloys: 50 },
    bonus: { coins: 0, supplies: 20 }, // Image: 20%.
    actions: 0, combat: 0
  },
  "cooperage": {
    name: "Küferei", type: "production",
    production: { coins: 0, supplies: 24000, alloys: 250 },
    refund: { coins: 33600, supplies: 35000, alloys: 250 },
    bonus: { coins: 0, supplies: 20 }, // Image: 20%.
    actions: 0, combat: 0
  },

  // === GOODS ===
  "beekeeper": {
    name: "Imkerei", type: "goods",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 11250, supplies: 5625, alloys: 50 },
    actions: 0, combat: 0
  },
  "gunpowder": {
    name: "Schießpulver-Manufaktur", type: "goods",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 11250, supplies: 5625, alloys: 50 },
    actions: 0, combat: 0
  },
  "ropery": {
    name: "Seilerei", type: "goods",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 11250, supplies: 5625, alloys: 50 },
    actions: 0, combat: 0
  },
  "brickworks": {
    name: "Ziegelei", type: "goods",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 11250, supplies: 5625, alloys: 50 },
    actions: 0, combat: 0
  },

  // === CULTURAL / SPECIAL ===
  "church": {
    name: "Kirche", type: "cultural",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 4200, supplies: 0, alloys: 0 },
    actions: 50, combat: 0
  },
  "gallows": {
    name: "Galgen", type: "cultural",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 9000, supplies: 9000, alloys: 25 },
    actions: 60, combat: 0
  },
  "pillory": {
    name: "Pranger", type: "cultural",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 30000, supplies: 30000, alloys: 125 },
    actions: 120, combat: 0
  },
  "marketplace": {
    name: "Marktplatz", type: "cultural",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 3000, supplies: 0, alloys: 0 },
    actions: 50, combat: 0
  },
  "signpost": {
    name: "Wegweiser / Wasserspeier", type: "decoration",
    production: { coins: 0, supplies: 0, alloys: 0 },
    refund: { coins: 18750, supplies: 15625, alloys: 50 },
    actions: 0, combat: 15
  },

  // === MILITARY ===
  "catapultcamp": { name: "Katapult-Camp", type: "military", combat: 0, refund: { coins: 3750, supplies: 1875, alloys: 0 } },
  "trebuchet_camp": { name: "Bliden-Camp", type: "military", combat: 0, refund: { coins: 11250, supplies: 5625, alloys: 50 } },
  "cannon_camp": { name: "Kanonen-Camp", type: "military", combat: 0, refund: { coins: 18750, supplies: 9375, alloys: 250 } },

  // === OTHER ===
  "expansion": { name: "Erweiterung", type: "expansion" },
  "intro_min": { name: "Rathaus (Min)", type: "special" },
  "intro_adv": { name: "Rathaus (Adv)", type: "special" }
};

function calculateHarvest(currentStepIndex) {
  // 1. Determine Active Buildings (State at start of Step)
  let buildings = {};

  for (let i = 1; i <= currentStepIndex; i++) {
    // 1a. Fixed Step Buildings
    if (steps[i] && steps[i].buildings) {
      steps[i].buildings.forEach(b => {
        const bId = b.buildingId;
        if (!bId) return;
        if (b.type === 'build') {
          buildings[bId] = (buildings[bId] || 0) + (b.count || 1);
        } else if (b.type === 'sell') {
          buildings[bId] = (buildings[bId] || 0) - (b.count || 1);
          if (buildings[bId] < 0) buildings[bId] = 0;
        }
      });
    }

  }

  // 1b. Manual Selections (Absolute state for current step)
  const stepManual = manualSelections[currentStepIndex];
  if (stepManual) {
    stepManual.forEach(m => {
      if (m.buildingId && m.count > 0) {
        buildings[m.buildingId] = (buildings[m.buildingId] || 0) + parseInt(m.count);
      }
    });
  }

  // 2. Base Harvest (Burg/Castle Static)
  let harvest = {
    coins: 50000,
    supplies: 50000,
    alloys: 15, // Base Alloys from Castle
    actions: 0,
    combat: 0,
    actionBreakdown: [],
    refund: { coins: 0, supplies: 0, alloys: 0 }
  };

  // 3. Calculate Bonuses & Static Stats (Combat/Actions) from Active Buildings
  let coinBonus = 0;
  let supplyBonus = 0;

  Object.keys(buildings).forEach(bId => {
    const count = buildings[bId];
    if (!count) return;
    const stats = buildingStats[bId];
    if (stats) {
      if (stats.bonus) {
        coinBonus += (stats.bonus.coins || 0) * count;
        supplyBonus += (stats.bonus.supplies || 0) * count;
      }
      if (stats.combat) harvest.combat += stats.combat * count; // Cumulative Combat
      if (stats.actions) {
        const actionAmount = stats.actions * count;
        harvest.actions += actionAmount; // Cumulative Actions
        const isManual = Object.values(manualSelections).some(stepArr => stepArr.some(m => m.buildingId === bId));
        harvest.actionBreakdown.push(`${count}x ${stats.name}${isManual ? ' (inkl. Extra)' : ''}: ${actionAmount}`);
      }
    }
  });

  // 4. Calculate Production from Active Buildings
  let productionCoins = 0;
  let productionSupplies = 0;
  let productionAlloys = 0;

  Object.keys(buildings).forEach(bId => {
    const count = buildings[bId];
    if (!count) return;
    const stats = buildingStats[bId];
    if (stats && stats.production) {
      productionCoins += (stats.production.coins || 0) * count;
      productionSupplies += (stats.production.supplies || 0) * count;
      productionAlloys += (stats.production.alloys || 0) * count; // Summing up Alloys (50/250 etc)
    }
  });

  // 5. Apply Bonuses (Coins/Supplies)
  // Multipliers are ADDITIVE. Values already assume 150% Euphoria.
  const coinMult = 1 + (coinBonus / 100);
  const supplyMult = 1 + (supplyBonus / 100);
  const alloyMult = 1.0;

  harvest.coins += productionCoins * coinMult;
  harvest.supplies += productionSupplies * supplyMult;
  harvest.alloys += Math.round(productionAlloys * alloyMult);

  // 6. Calculate Refunds from buildings demolished in the CURRENT step
  if (steps[currentStepIndex] && steps[currentStepIndex].buildings) {
    steps[currentStepIndex].buildings.forEach(b => {
      if (b.type === 'sell' && b.buildingId) {
        const stats = buildingStats[b.buildingId];
        if (stats && stats.refund) {
          const count = b.count || 1;
          harvest.refund.coins += (stats.refund.coins || 0) * count;
          harvest.refund.supplies += (stats.refund.supplies || 0) * count;
          harvest.refund.alloys += (stats.refund.alloys || 0) * count;
        }
      }
    });
  }

  // 6b. Calculate Manual Refunds (Compare current with previous step)
  const prevManual = manualSelections[currentStepIndex - 1];
  const currManual = manualSelections[currentStepIndex];
  if (prevManual && currManual) {
    for (let i = 0; i < 3; i++) {
      const p = prevManual[i] || {};
      const c = currManual[i] || {};
      if (p.buildingId) {
        let soldCount = 0;
        if (c.buildingId !== p.buildingId) {
          soldCount = p.count || 0;
        } else if (c.count < p.count) {
          soldCount = p.count - c.count;
        }
        if (soldCount > 0) {
          const stats = buildingStats[p.buildingId];
          if (stats && stats.refund) {
            harvest.refund.coins += (stats.refund.coins || 0) * soldCount;
            harvest.refund.supplies += (stats.refund.supplies || 0) * soldCount;
            harvest.refund.alloys += (stats.refund.alloys || 0) * soldCount;
          }
        }
      }
    }
  }

  return harvest;
}


const steps = [
  {
    title: "SEASON",
    buildings: [
      { img: "buildings/Town_Hall_29.webp", desc: "Mittelalter<br><span style='font-size:0.7em; text-transform:none'>(Minimum)</span>", id: "intro_min" },
      { img: "buildings/Town_Hall_29.webp", desc: "Mittelalter<br><span style='font-size:0.7em; text-transform:none'>(Fortgeschritten)</span>", id: "intro_adv" },
      { img: "icons/calc.png", desc: "Quanten-Rechner", id: "intro_calc" }
    ],
    intro: true
  },
  {
    title: "Schritt 1: Basis-Aufbau",
    buildings: [
      { img: "buildings/expansion.webp", desc: "3x Erweiterung kaufen (Quantum-Scherben)", id: "s1_b1", type: "build", buildingId: "expansion", count: 3 },
      { img: "buildings/Multistory_House.webp", desc: "3x Mehrgeschossiges Haus bauen", id: "s1_b2", type: "build", buildingId: "multistory_house", count: 3 },
      { img: "buildings/Estate_House.webp", desc: "7x Gutshaus bauen", id: "s1_b3", type: "build", buildingId: "estate_house", count: 7 },
      { img: "buildings/Brewery.webp", desc: "5x Brauerei bauen", id: "s1_b4", type: "build", buildingId: "brewery", count: 5 },
      { img: "buildings/Tannery.webp", desc: "5x Gerberei bauen", id: "s1_b5", type: "build", buildingId: "tannery", count: 5 },
      { img: "buildings/Church.webp", desc: "7x Kirche bauen", id: "s1_b6", type: "build", buildingId: "church", count: 7 }
    ],
    plans: ["steps/step1.jpg"]
  },
  {
    title: "Schritt 2: Ressourcen-Management",
    buildings: [
      { img: "icons/reward.png", desc: "Alle Gebäude ernten", id: "s2_a1" }
    ]
  },
  {
    title: "Schritt 3: Spezialisierung",
    buildings: [
      { img: "buildings/Church.webp", desc: "1x Kirche abreißen", id: "s3_a1", special: "sell", type: "sell", buildingId: "church", count: 1 },
      { img: "buildings/Beekeeper.webp", desc: "1x Imkerei bauen", id: "s3_b1", type: "build", buildingId: "beekeeper", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Produktion)", id: "s3_w1", special: "wait", waitTime: 60 },
      { img: "icons/Honey.webp", desc: "12x Honig produzieren", id: "s3_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen (Güter)", id: "s3_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Beekeeper.webp", desc: "1x Imkerei abreißen", id: "s3_a2", special: "sell", type: "sell", buildingId: "beekeeper", count: 1 },
      { img: "buildings/Mansion.webp", desc: "2x Herrenhaus bauen", id: "s3_b3", type: "build", buildingId: "mansion", count: 2 },
      { img: "buildings/Alchemist.webp", desc: "1x Alchemistenlabor bauen", id: "s3_b4", type: "build", buildingId: "alchemist", count: 1 },
      { img: "buildings/Church.webp", desc: "1x Kirche bauen", id: "s3_b5", type: "build", buildingId: "church", count: 1 },
      { img: "buildings/Gallows.webp", desc: "1x Galgen bauen", id: "s3_b6", type: "build", buildingId: "gallows", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Bau-Abschluss)", id: "s3_w2", special: "wait", waitTime: 60 },
      { img: "icons/visit.png", desc: "Siedlung erneut besuchen", id: "s3_v1" }
    ],
    plans: ["steps/step3_1.jpg", "steps/step3_2.jpg"],
    id: "s3"
  },
  {
    title: "Schritt 4: Produktion & Expansion",
    buildings: [
      { img: "buildings/Tannery.webp", desc: "1x Gerberei abreißen", id: "s4_a1", special: "sell", type: "sell", buildingId: "tannery", count: 1 },
      { img: "buildings/Gunpowder.webp", desc: "1x Schießpulver-Manufaktur bauen", id: "s4_b1", type: "build", buildingId: "gunpowder", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Produktion)", id: "s4_w1", special: "wait", waitTime: 60 },
      { img: "icons/Gunpowder.webp", desc: "2x 20 Schießpulver produzieren", id: "s4_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen (Güter)", id: "s4_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Gunpowder.webp", desc: "1x Schießpulver-Manufaktur abreißen", id: "s4_a2", special: "sell", type: "sell", buildingId: "gunpowder", count: 1 },
      { img: "buildings/Frame_House.webp", desc: "1x Fachwerkhaus bauen", id: "s4_b3", type: "build", buildingId: "frame_house", count: 1 },
      { img: "buildings/Alchemist.webp", desc: "1x Alchemistenlabor bauen", id: "s4_b4", type: "build", buildingId: "alchemist", count: 1 },
      { img: "buildings/Marketplace.webp", desc: "2x Marktplatz bauen", id: "s4_b5", type: "build", buildingId: "marketplace", count: 2 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Bau-Abschluss)", id: "s4_w2", special: "wait", waitTime: 60 },
      { img: "icons/visit.png", desc: "Siedlung erneut besuchen", id: "s4_v1" }
    ],
    plans: ["steps/step4_1.jpg", "steps/step4_2.jpg"]
  },
  {
    title: "Schritt 5: Seilproduktion & Vorbereitung",
    buildings: [
      { img: "buildings/Marketplace.webp", desc: "1x Marktplatz abreißen", id: "s5_a1", special: "sell", type: "sell", buildingId: "marketplace", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei bauen", id: "s5_b1", type: "build", buildingId: "ropery", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Produktion)", id: "s5_w1", special: "wait", waitTime: 60 },
      { img: "icons/Ropery.webp", desc: "4x 20 Seile produzieren", id: "s5_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen (Güter)", id: "s5_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei abreißen", id: "s5_a2", special: "sell", type: "sell", buildingId: "ropery", count: 1 },
      { img: "buildings/Gallows.webp", desc: "2x Galgen bauen", id: "s5_b3", type: "build", buildingId: "gallows", count: 2 },
      { img: "buildings/Frame_House.webp", desc: "1x Fachwerkhaus bauen", id: "s5_b4", type: "build", buildingId: "frame_house", count: 1 },
      { img: "buildings/Alchemist.webp", desc: "1x Alchemistenlabor bauen", id: "s5_b5", type: "build", buildingId: "alchemist", count: 1 },
      { img: "buildings/Multistory_House.webp", desc: "1x Mehrgeschossiges Haus bauen", id: "s5_b6", type: "build", buildingId: "multistory_house", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Bau-Abschluss)", id: "s5_w2", special: "wait", waitTime: 60 },
      { img: "icons/visit.png", desc: "Siedlung erneut besuchen", id: "s5_v1" }
    ],
    plans: ["steps/step5_1.jpg", "steps/step5_2.jpg"]
  },
  {
    title: "Schritt 6: Ressourcen-Management",
    buildings: [
      { img: "icons/reward.png", desc: "Alle Gebäude ernten", id: "s6_a1" }
    ]
  },
  {
    title: "Schritt 7: MilitÃ¤r & Vorräte-Boost",
    buildings: [
      { img: "buildings/Tannery.webp", desc: "3x Gerberei abreißen", id: "s7_a1", special: "sell", type: "sell", buildingId: "tannery", count: 3 },
      { img: "buildings/Catapultcamp.webp", desc: "1x Katapult-Camp bauen", id: "s7_b1", type: "build", buildingId: "catapultcamp", count: 1 },
      { img: "icons/Catapult.webp", desc: "3x 10 Katapult rekrutieren", id: "s7_p1" },
      { img: "buildings/Catapultcamp.webp", desc: "1x Katapult-Camp abreißen", id: "s7_a2", special: "sell", type: "sell", buildingId: "catapultcamp", count: 1 },
      { img: "buildings/Alchemist.webp", desc: "5x Alchemistenlabor bauen", id: "s7_b2", type: "build", buildingId: "alchemist", count: 5 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Vorräte)", id: "s7_w1", special: "wait", waitTime: 60 },
      { img: "icons/visit.png", desc: "Siedlung erneut besuchen", id: "s7_v1" }
    ],
    plans: ["steps/step7_1.jpg", "steps/step7_2.jpg"]
  },
  {
    title: "Schritt 8: Platz schaffen & Expansion",
    buildings: [
      { img: "buildings/Marketplace.webp", desc: "1x Marktplatz abreißen", id: "s8_a1", special: "sell", type: "sell", buildingId: "marketplace", count: 1 },
      { img: "buildings/Church.webp", desc: "1x Kirche abreißen", id: "s8_a2", special: "sell", type: "sell", buildingId: "church", count: 1 },
      { img: "buildings/Tannery.webp", desc: "1x Gerberei abreißen", id: "s8_a3", special: "sell", type: "sell", buildingId: "tannery", count: 1 },
      { img: "buildings/Pillory.webp", desc: "1x Pranger bauen", id: "s8_b1", type: "build", buildingId: "pillory", count: 1 },
      { img: "buildings/Frame_House.webp", desc: "2x Fachwerkhaus bauen", id: "s8_b2", type: "build", buildingId: "frame_house", count: 2 },
      { img: "buildings/Alchemist.webp", desc: "2x Alchemistenlabor bauen", id: "s8_b3", type: "build", buildingId: "alchemist", count: 2 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Produktion)", id: "s8_w1", special: "wait", waitTime: 60 },
      { img: "icons/visit.png", desc: "Siedlung erneut besuchen", id: "s8_v1" }
    ],
    plans: ["steps/step8.jpg"]
  },
  {
    title: "Schritt 9: Großer Umbau & Güter-Schub",
    buildings: [
      { img: "buildings/Church.webp", desc: "2x Kirche abreißen", id: "s9_a1", special: "sell", type: "sell", buildingId: "church", count: 2 },
      { img: "buildings/Brewery.webp", desc: "1x Brauerei abreißen", id: "s9_a2", special: "sell", type: "sell", buildingId: "brewery", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei bauen", id: "s9_b1", type: "build", buildingId: "ropery", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Produktion)", id: "s9_w1", special: "wait", waitTime: 60 },
      { img: "icons/Ropery.webp", desc: "6x 20 Güter produzieren", id: "s9_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen (Güter)", id: "s9_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei abreißen", id: "s9_a3", special: "sell", type: "sell", buildingId: "ropery", count: 1 },
      { img: "buildings/Mansion.webp", desc: "2x Herrenhaus abreißen", id: "s9_a4", special: "sell", type: "sell", buildingId: "mansion", count: 2 },
      { img: "buildings/Estate_House.webp", desc: "3x Guthaus bauen", id: "s9_b3", type: "build", buildingId: "estate_house", count: 3 },
      { img: "buildings/Frame_House.webp", desc: "2x Fachwerkhaus bauen", id: "s9_b4", type: "build", buildingId: "frame_house", count: 2 },
      { img: "buildings/Alchemist.webp", desc: "5x Alchemistenlabor bauen", id: "s9_b5", type: "build", buildingId: "alchemist", count: 5 },
      { img: "buildings/Pillory.webp", desc: "1x Pranger bauen", id: "s9_b6", type: "build", buildingId: "pillory", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten (Vorbereitung)", id: "s9_w2", special: "wait", waitTime: 60 },
      { img: "icons/visit.png", desc: "Siedlung erneut besuchen", id: "s9_v1" }
    ],
    plans: ["steps/step9_1.jpg", "steps/step9_2.jpg"]
  },
  {
    title: "Schritt 10: Militär-Zyklus & Expansion",
    buildings: [
      { img: "buildings/Multistory_House.webp", desc: "1x Mehrgeschossiges Haus abreißen", id: "s10_a1", special: "sell", type: "sell", buildingId: "multistory_house", count: 1 },
      { img: "buildings/Church.webp", desc: "3x Kirche abreißen", id: "s10_a2", special: "sell", type: "sell", buildingId: "church", count: 3 },
      { img: "buildings/Trebuchet_Camp.webp", desc: "1x Bliden-Camp bauen", id: "s10_b1", type: "build", buildingId: "trebuchet_camp", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Stunde warten", id: "s10_w1", special: "wait", waitTime: 60 },
      { img: "icons/Trebuchet.webp", desc: "3x 10 Bliden rekrutieren", id: "s10_p1" },
      { img: "buildings/Trebuchet_Camp.webp", desc: "1x Bliden-Camp abreißen", id: "s10_a3", special: "sell", type: "sell", buildingId: "trebuchet_camp", count: 1 },
      { img: "buildings/Clapboard_House.webp", desc: "1x Schindelhaus bauen", id: "s10_b2", type: "build", buildingId: "clapboard_house", count: 1 },
      { img: "buildings/Bakery.webp", desc: "1x Bäckerei bauen (Bau beschleunigen)", id: "s10_b3", type: "build", buildingId: "bakery", count: 1 },
      { img: "buildings/Brewery.webp", desc: "1x Brauerei bauen (Bau beschleunigen)", id: "s10_b4", type: "build", buildingId: "brewery", count: 1 },
      { img: "buildings/Pillory.webp", desc: "1x Pranger bauen", id: "s10_b5", type: "build", buildingId: "pillory", count: 1 }
    ],
    plans: ["steps/step10_1.jpg", "steps/step10_2.jpg"]
  },
  {
    title: "Schritt 11: Güter-Schub & Urbanisierung",
    buildings: [
      { img: "buildings/Brewery.webp", desc: "1x Brauerei abreißen", id: "s11_a1", special: "sell", type: "sell", buildingId: "brewery", count: 1 },
      { img: "buildings/Church.webp", desc: "1x Kirche abreißen", id: "s11_a2", special: "sell", type: "sell", buildingId: "church", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei bauen", id: "s11_b1", type: "build", buildingId: "ropery", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Std. warten (od. beschleunigen)", id: "s11_w1", special: "wait", waitTime: 60 },
      { img: "icons/Ropery.webp", desc: "9x 20 Güter produzieren", id: "s11_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen", id: "s11_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei abreißen", id: "s11_a3", special: "sell", type: "sell", buildingId: "ropery", count: 1 },
      { img: "buildings/Clapboard_House.webp", desc: "1x Schindelhaus bauen", id: "s11_b3", type: "build", buildingId: "clapboard_house", count: 1 },
      { img: "buildings/Estate_House.webp", desc: "2x Gutshaus bauen", id: "s11_b4", type: "build", buildingId: "estate_house", count: 2 },
      { img: "buildings/Bakery.webp", desc: "1x Bäckerei bauen", id: "s11_b5", type: "build", buildingId: "bakery", count: 1 },
      { img: "buildings/Pillory.webp", desc: "1x Pranger bauen", id: "s11_b6", type: "build", buildingId: "pillory", count: 1 },
      { img: "buildings/Signpost.webp", desc: "5x Wegweiser / Wasserspeier bauen", id: "s11_b7", type: "build", buildingId: "signpost", count: 5 }
    ],
    plans: ["steps/step11_1.jpg", "steps/step11_2.jpg"]
  },
  {
    title: "Schritt 12: Güter-Maximierung & Expansion",
    buildings: [
      { img: "buildings/Multistory_House.webp", desc: "2x Mehrgeschossiges Haus abreißen", id: "s12_a1", special: "sell", type: "sell", buildingId: "multistory_house", count: 2 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei bauen", id: "s12_b1", type: "build", buildingId: "ropery", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Std. warten (od. beschleunigen)", id: "s12_w1", special: "wait", waitTime: 60 },
      { img: "icons/Ropery.webp", desc: "12x 20 Güter produzieren", id: "s12_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen", id: "s12_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei abreißen", id: "s12_a2", special: "sell", type: "sell", buildingId: "ropery", count: 1 },
      { img: "buildings/Clapboard_House.webp", desc: "1x Schindelhaus bauen", id: "s12_b3", type: "build", buildingId: "clapboard_house", count: 1 },
      { img: "buildings/Estate_House.webp", desc: "1x Gutshaus bauen", id: "s12_b4", type: "build", buildingId: "estate_house", count: 1 },
      { img: "buildings/Bakery.webp", desc: "1x Bäckerei bauen", id: "s12_b5", type: "build", buildingId: "bakery", count: 1 },
      { img: "buildings/Pillory.webp", desc: "1x Pranger bauen", id: "s12_b6", type: "build", buildingId: "pillory", count: 1 },
      { img: "buildings/Signpost.webp", desc: "1x Wegweiser / Wasserspeier bauen", id: "s12_b7", type: "build", buildingId: "signpost", count: 1 }
    ],
    plans: ["steps/step12_1.jpg", "steps/step12_2.jpg"]
  },
  {
    title: "Schritt 13: Rekrutierung & Güter-Power",
    buildings: [
      { img: "buildings/Multistory_House.webp", desc: "1x Mehrgeschossiges Haus abreißen", id: "s13_a1", special: "sell", type: "sell", buildingId: "multistory_house", count: 1 },
      { img: "buildings/Estate_House.webp", desc: "1x Gutshaus abreißen", id: "s13_a2", special: "sell", type: "sell", buildingId: "estate_house", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei bauen", id: "s13_b1", type: "build", buildingId: "ropery", count: 1 },
      { img: "icons/hourglass50.png", desc: "1 Std. warten (Güter)", id: "s13_w1", special: "wait", waitTime: 60 },
      { img: "icons/Ropery.webp", desc: "16x 20 Güter produzieren", id: "s13_p1" },
      { img: "buildings/expansion.webp", desc: "1x Erweiterung kaufen", id: "s13_b2", type: "build", buildingId: "expansion", count: 1 },
      { img: "buildings/Ropery.webp", desc: "1x Seilerei abreißen", id: "s13_a3", special: "sell", type: "sell", buildingId: "ropery", count: 1 },
      { img: "buildings/Clapboard_House.webp", desc: "3x Schindelhaus bauen", id: "s13_b3", type: "build", buildingId: "clapboard_house", count: 3 },
      { img: "buildings/Signpost.webp", desc: "1x Wegweiser / Wasserspeier bauen", id: "s13_b4", type: "build", buildingId: "signpost", count: 1 },
      { img: "buildings/Trebuchet_Camp.webp", desc: "1x Bliden-Camp bauen", id: "s13_b5", type: "build", buildingId: "trebuchet_camp", count: 1 }
    ],
    plans: ["steps/step13_1.jpg", "steps/step13_2.jpg"]
  },
  {
    title: "Schritt 14: Euphorie-Maximierung",
    buildings: [
      { img: "icons/Trebuchet.webp", desc: "5x 10 Bliden rekrutieren", id: "s13_p2" },
      { img: "buildings/Estate_House.webp", desc: "12x Gutshaus abreißen", id: "s14_a1", special: "sell", type: "sell", buildingId: "estate_house", count: 12 },
      { img: "buildings/Pillory.webp", desc: "8x Pranger bauen", id: "s14_b1", type: "build", buildingId: "pillory", count: 8 },
      { img: "buildings/Signpost.webp", desc: "8x Wegweiser / Wasserspeier bauen", id: "s14_b2", type: "build", buildingId: "signpost", count: 8 }
    ],
    plans: ["steps/step14.jpg"]
  },
  {
    title: "Schritt 15: Dekomaximierung & Platzoptimierung",
    buildings: [
      { img: "buildings/Gallows.webp", desc: "3x Galgen abreißen", id: "s15_a1", special: "sell", type: "sell", buildingId: "gallows", count: 3 },
      { img: "buildings/Pillory.webp", desc: "3x Pranger bauen", id: "s15_b1", type: "build", buildingId: "pillory", count: 3 },
      { img: "buildings/Signpost.webp", desc: "9x Wegweiser / Wasserspeier bauen", id: "s15_b2", type: "build", buildingId: "signpost", count: 9 }
    ],
    plans: ["steps/step15.jpg"]
  },
  {
    title: "Schritt 16: Finaler Umbau & Artillerie",
    buildings: [
      { img: "buildings/Frame_House.webp", desc: "1x Fachwerkhaus abreißen", id: "s16_a1", special: "sell", type: "sell", buildingId: "frame_house", count: 1 },
      { img: "buildings/Brewery.webp", desc: "4x Brauerei abreißen", id: "s16_a2", special: "sell", type: "sell", buildingId: "brewery", count: 4 },
      { img: "buildings/Trebuchet_Camp.webp", desc: "1x Bliden-Camp abreißen", id: "s16_a3", special: "sell", type: "sell", buildingId: "trebuchet_camp", count: 1 },
      { img: "buildings/Pillory.webp", desc: "8x Pranger bauen", id: "s16_b1", type: "build", buildingId: "pillory", count: 8 },
      { img: "buildings/Signpost.webp", desc: "8x Wegweiser / Wasserspeier bauen", id: "s16_b2", type: "build", buildingId: "signpost", count: 8 },
      { img: "buildings/Cannon_camp.webp", desc: "1x Kanonen-Camp bauen", id: "s16_b3", type: "build", buildingId: "cannon_camp", count: 1 }
    ],
    plans: ["steps/step16.jpg"]
  },
  {
    title: "Schritt 17: Endlos-Optimierung",
    buildings: [
      { img: "buildings/Alchemist.webp", desc: "Alchemisten nach Bedarf abreißen", id: "s17_a1", special: "sell", type: "sell", buildingId: "alchemist", count: 0 },
      { img: "buildings/Frame_House.webp", desc: "Fachwerkhäuser nach Bedarf abreißen", id: "s17_a2", special: "sell", type: "sell", buildingId: "frame_house", count: 0 },
      { img: "buildings/Pillory.webp", desc: "Pranger bauen (für mehr Aktionspunkte/h)", id: "s17_b1", type: "build", buildingId: "pillory", count: 0 },
      { img: "buildings/Signpost.webp", desc: "Wegweiser für mehr Kampfkraft bauen", id: "s17_b2", type: "build", buildingId: "signpost", count: 0 },
      { img: "icons/Cannon.webp", desc: "Kanonen rekrutieren & nachbauen", id: "s17_p1" },
      { img: "icons/reward.png", desc: "Regelmäßig ernten & Sektoren angreifen", id: "s17_v1" }
    ]
  },
  {
    title: "Quanten-Rechner",
    isCalculator: true,
    id: "calc_page"
  }
];

// === QUANTUM CALCULATOR LOGIC ===
const CALC_STORAGE_KEY = "ressourcen_state";
const CALC_BURG = { vorrate: 50000, muenzen: 50000, chrono: 15 };
const CALC_DEFAULT_STATE = {
  ui: { ages: { FMA: true, HMA: true, SMA: true } },
  produktion: {
    stadtbonus: 0,
    items: [
      { name: "Gerberei", ertrag: 12000, chrono: 15, anzahl: 0, age: "FMA" },
      { name: "Schusterwerkstatt", ertrag: 24000, chrono: 115, anzahl: 0, age: "FMA" },
      { name: "Bäckerei", ertrag: 60000, chrono: 375, anzahl: 0, age: "FMA" },
      { name: "Bauernhof", ertrag: 7200, chrono: 15, anzahl: 0, bonus: 10, age: "HMA" },
      { name: "Alchemistenlabor", ertrag: 14000, chrono: 115, anzahl: 0, bonus: 10, age: "HMA" },
      { name: "Windmühle", ertrag: 36000, chrono: 375, anzahl: 0, bonus: 10, age: "HMA" },
      { name: "Brauerei", ertrag: 4800, chrono: 15, anzahl: 0, bonus: 20, age: "SMA" },
      { name: "Gewürzhandlung", ertrag: 9600, chrono: 115, anzahl: 0, bonus: 20, age: "SMA" },
      { name: "Küferei", ertrag: 24000, chrono: 375, anzahl: 0, bonus: 20, age: "SMA" }
    ]
  },
  wohnen: {
    stadtbonus: 0,
    items: [
      { name: "Mehrgeschossiges Haus", ertrag: 12500, chrono: 15, anzahl: 0, age: "FMA" },
      { name: "Fachwerkhaus", ertrag: 25000, chrono: 115, anzahl: 0, age: "FMA" },
      { name: "Schindelhaus", ertrag: 130000, chrono: 375, anzahl: 0, age: "FMA" },
      { name: "Herrenhaus", ertrag: 7500, chrono: 15, anzahl: 0, bonus: 10, age: "HMA" },
      { name: "Sandsteinhaus", ertrag: 15000, chrono: 115, anzahl: 0, bonus: 10, age: "HMA" },
      { name: "Stadthaus", ertrag: 117000, chrono: 375, anzahl: 0, bonus: 10, age: "HMA" },
      { name: "Gutshaus", ertrag: 3750, chrono: 15, anzahl: 0, bonus: 20, age: "SMA" },
      { name: "Mietshaus", ertrag: 7500, chrono: 115, anzahl: 0, bonus: 20, age: "SMA" },
      { name: "Landgut", ertrag: 39000, chrono: 375, anzahl: 0, bonus: 20, age: "SMA" }
    ]
  },
  kultur: {
    items: [
      { name: "Marktplatz", euphoria: 125, actions: 50, age: "FMA", anzahl: 0 },
      { name: "Kirche", euphoria: 160, actions: 50, age: "HMA", anzahl: 0 },
      { name: "Galgen", euphoria: 250, actions: 60, age: "HMA", anzahl: 0 },
      { name: "Druckerei", euphoria: 375, actions: 130, age: "HMA", anzahl: 0 },
      { name: "Doktor", euphoria: 500, actions: 260, age: "HMA", anzahl: 0 },
      { name: "Pranger", euphoria: 750, actions: 120, age: "SMA", anzahl: 0 },
      { name: "Palast", euphoria: 225, actions: 90, age: "SMA", anzahl: 0 },
      { name: "Bücherei", euphoria: 500, actions: 200, age: "SMA", anzahl: 0 },
      { name: "Kartograph", euphoria: 900, actions: 180, age: "SMA", anzahl: 0 }
    ]
  },
  deko: {
    items: [
      { name: "Zypresse", euphoria: -25, aa: 10, va: 0, age: "FMA", anzahl: 0 },
      { name: "Hecke", euphoria: -25, aa: 0, va: 10, age: "FMA", anzahl: 0 },
      { name: "Teich", euphoria: -25, aa: 25, va: 25, age: "FMA", anzahl: 0 },
      { name: "Wegweiser", euphoria: -25, aa: 15, va: 0, age: "HMA", anzahl: 0 },
      { name: "Wasserspeier", euphoria: -25, aa: 0, va: 15, age: "HMA", anzahl: 0 },
      { name: "Fahne", euphoria: -25, aa: 20, va: 20, age: "HMA", anzahl: 0 },
      { name: "Turmruine", euphoria: -25, aa: 45, va: 0, age: "SMA", anzahl: 0 },
      { name: "Baumgruppe", euphoria: -25, aa: 0, va: 45, age: "SMA", anzahl: 0 },
      { name: "Seefahrer-Statue", euphoria: -25, aa: 30, va: 30, age: "SMA", anzahl: 0 }
    ]
  }
};

let calcState = null;

function loadCalcState(callback) {
  storage.get([CALC_STORAGE_KEY], (data) => {
    const saved = data[CALC_STORAGE_KEY] || {};
    // Deep merge / Ensure defaults
    calcState = JSON.parse(JSON.stringify(CALC_DEFAULT_STATE));
    if (saved.produktion) {
      calcState.produktion.stadtbonus = saved.produktion.stadtbonus || 0;
      saved.produktion.items.forEach((item, idx) => {
        if (calcState.produktion.items[idx]) calcState.produktion.items[idx].anzahl = item.anzahl || 0;
      });
    }
    if (saved.wohnen) {
      calcState.wohnen.stadtbonus = saved.wohnen.stadtbonus || 0;
      saved.wohnen.items.forEach((item, idx) => {
        if (calcState.wohnen.items[idx]) calcState.wohnen.items[idx].anzahl = item.anzahl || 0;
      });
    }
    if (saved.kultur && saved.kultur.items) {
      saved.kultur.items.forEach((item, idx) => {
        if (calcState.kultur.items[idx]) {
          calcState.kultur.items[idx].anzahl = item.anzahl || 0;
        }
      });
    }
    if (saved.deko && saved.deko.items) {
      saved.deko.items.forEach((item, idx) => {
        if (calcState.deko && calcState.deko.items[idx]) {
          calcState.deko.items[idx].anzahl = item.anzahl || 0;
        }
      });
    }
    if (saved.ui) calcState.ui = { ...calcState.ui, ...saved.ui };

    if (callback) callback();
  });
}

function saveCalcState() {
  storage.set({ [CALC_STORAGE_KEY]: calcState });
}

function updateCalculator() {
  const prodTotal = calculateCalcGroup(calcState.produktion, "produktion", "vorrate");
  const wohnTotal = calculateCalcGroup(calcState.wohnen, "wohnen", "muenzen");
  const kulturTotal = calculateKulturGroup();
  const dekoTotal = calculateDekoGroup();
  const chronoTotal = calculateChronoTotal();

  const totEuphoria = kulturTotal.euphoria + dekoTotal.euphoria;

  const prodEl = document.getElementById('calc-prod-summary');
  const wohnEl = document.getElementById('calc-wohn-summary');
  const kulturEl = document.getElementById('calc-kultur-summary');
  const dekoEl = document.getElementById('calc-deko-summary');

  if (prodEl) prodEl.innerHTML = renderCalcSummary(prodTotal, "Vorräte");
  if (wohnEl) wohnEl.innerHTML = renderCalcSummary(wohnTotal, "Münzen");
  if (kulturEl) kulturEl.innerHTML = `
    <div class="calc-summary-item">Kultur Euphorie: <span>${kulturTotal.euphoria}</span></div>
    <div class="calc-summary-total">Gesamt Aktionen/h: <span>+${kulturTotal.actions}</span></div>
  `;
  if (dekoEl) dekoEl.innerHTML = `
    <div class="calc-summary-item">Deko Euphorie: <span>${dekoTotal.euphoria}</span></div>
    <div class="calc-summary-total">Gesamt Kampfkraft: 
      <span style="color:#ff6b6b">+${dekoTotal.aa}% (A)</span> / 
      <span style="color:#4dabf7">+${dekoTotal.va}% (V)</span>
    </div>
  `;

  updateCalcOverlay(prodTotal.gesamt, wohnTotal.gesamt, chronoTotal, totEuphoria, kulturTotal.actions, dekoTotal.aa, dekoTotal.va, dekoTotal.euphoria);
}

function calculateDekoGroup() {
  let euphoria = 0;
  let aa = 0;
  let va = 0;
  if (!calcState.deko || !calcState.deko.items) return { euphoria: 0, aa: 0, va: 0 };

  calcState.deko.items.forEach((item, i) => {
    const eTot = (item.euphoria || 0) * (item.anzahl || 0);
    const aaTot = (item.aa || 0) * (item.anzahl || 0);
    const vaTot = (item.va || 0) * (item.anzahl || 0);
    euphoria += eTot;
    aa += aaTot;
    va += vaTot;

    const totalDisplay = document.getElementById(`calc_deko_total_${i}`);
    const countDisplay = document.getElementById(`calc_deko_count_${i}`);

    if (totalDisplay) {
      let text = "";
      if (item.euphoria) text += `${eTot} E`;
      if (item.aa) text += (text ? " / " : "") + `<span style="color:#ff6b6b; white-space:nowrap;">+${aaTot}% (A)</span>`;
      if (item.va) text += (text ? " / " : "") + `<span style="color:#4dabf7; white-space:nowrap;">+${vaTot}% (V)</span>`;
      totalDisplay.innerHTML = text || "0";
    }
    if (countDisplay) countDisplay.textContent = item.anzahl || 0;
  });
  return { euphoria, aa, va };
}

function calculateKulturGroup() {
  let euphoria = 0;
  let actions = 0;
  if (!calcState.kultur || !calcState.kultur.items) return { euphoria: 0, actions: 0 };

  calcState.kultur.items.forEach((item, i) => {
    const eTot = (item.euphoria || 0) * (item.anzahl || 0);
    const aTot = (item.actions || 0) * (item.anzahl || 0);
    euphoria += eTot;
    actions += aTot;

    const totalDisplay = document.getElementById(`calc_kultur_total_${i}`);
    const countDisplay = document.getElementById(`calc_kultur_count_${i}`);

    if (totalDisplay) {
      let text = "";
      if (item.euphoria) text += `${eTot} E`;
      if (item.actions) text += (text ? " / " : "") + `<span style="white-space:nowrap;">+${aTot} A</span>`;
      totalDisplay.innerHTML = text || "0";
    }
    if (countDisplay) countDisplay.textContent = item.anzahl || 0;
  });
  return { euphoria, actions };
}

function updateCalcOverlay(vorrate, muenzen, alloys, euphoria, actions, aa, va, dekoEuphoria) {
  let overlay = document.getElementById('calc-sticky-overlay');
  if (!overlay && currentIndex === steps.length - 1) {
    overlay = document.createElement('div');
    overlay.id = 'calc-sticky-overlay';
    document.body.appendChild(overlay);
  }
  if (!overlay) return;

  const euphoriaText = dekoEuphoria < 0 ? `${euphoria} (${dekoEuphoria})` : euphoria;

  overlay.innerHTML = `
    <div class="overlay-item">
      <img src="icons/Münzen.webp">
      <span>${Math.round(muenzen).toLocaleString()}</span>
    </div>
    <div class="overlay-item">
      <img src="icons/Vorrat.webp">
      <span>${Math.round(vorrate).toLocaleString()}</span>
    </div>
    <div class="overlay-item">
      <img src="icons/legierung.png">
      <span>${alloys}</span>
    </div>
    <div class="overlay-item">
      <img src="icons/happy.png" title="Euphorie">
      <span>${euphoriaText}</span>
    </div>
    <div class="overlay-item">
      <img src="icons/action_points.webp" title="Aktionen">
      <span>+${actions}/h</span>
    </div>
    <div class="overlay-item">
      <img src="icons/aap.webp" title="Kampfkraft">
      <span style="font-size:0.65rem">
        <span style="color:#ff6b6b">+${aa}%</span> / 
        <span style="color:#4dabf7">+${va}%</span>
      </span>
    </div>
  `;
}

function calculateCalcGroup(gruppe, containerId, resourceKey) {
  let grund = 0;
  let bonusSumme = 0;

  if (!gruppe || !gruppe.items) return { grund: 0, bonus: 0, gesamt: 0 };

  gruppe.items.forEach((item, i) => {
    const total = (item.ertrag || 0) * (item.anzahl || 0);
    grund += total;

    const totalDisplay = document.getElementById(`calc_${containerId}_total_${i}`);
    const countDisplay = document.getElementById(`calc_${containerId}_count_${i}`);
    if (totalDisplay) totalDisplay.textContent = total.toLocaleString();
    if (countDisplay) countDisplay.textContent = item.anzahl || 0;

    if (item.bonus) {
      bonusSumme += (item.anzahl || 0) * (item.bonus || 0);
    }
  });

  const bonus = bonusSumme + (gruppe.stadtbonus || 0);
  const totalMult = 1 + (bonus / 100);
  const grundMitBurg = grund + (CALC_BURG[resourceKey] || 0);
  const gesamt = Math.round(grundMitBurg * totalMult);

  return { grund: grundMitBurg, bonus, gesamt };
}

function calculateChronoTotal() {
  let summe = CALC_BURG.chrono;
  [...calcState.produktion.items, ...calcState.wohnen.items].forEach(item => {
    summe += item.chrono * item.anzahl;
  });
  return summe;
}

function renderCalcSummary(res, label) {
  return `
    <div class="calc-summary-item">Grundwert (inkl. 150% Euphorie): <span>${res.grund.toLocaleString()}</span></div>
    <div class="calc-summary-item">Stadt/Gebäude-Bonus: <span>+${res.bonus}%</span></div>
    <div class="calc-summary-total">GESAMT ${label.toUpperCase()}: <span>${res.gesamt.toLocaleString()}</span></div>
  `;
}

let manualSelections = {};
let currentIndex = 0;
const activeIntervals = {};

// === INITIALISIERUNG ===
function initializeApp() {
  // Theme & Mode beim Start laden
  storage.get(['theme', 'qi_current_page', 'manual_selections', 'device_mode'], (data) => {
    // 1. Theme
    if (data.theme === 'light') document.body.classList.add('light-mode');

    // 2. Device Mode (PC vs. Mobil)
    const choiceModal = document.getElementById('choice-modal');
    if (typeof chrome === 'undefined' && !data.device_mode) {
      if (choiceModal) choiceModal.classList.remove('hidden');
    } else {
      if (choiceModal) choiceModal.classList.add('hidden');
      if (data.device_mode) document.body.classList.add(`mode-${data.device_mode}`);
    }

    // 3. App State
    if (data.qi_current_page !== undefined) currentIndex = data.qi_current_page;
    if (data.manual_selections) manualSelections = data.manual_selections;

    setupDropdown();
    renderStep();
  });
}
document.addEventListener('DOMContentLoaded', initializeApp);

// === ICON BADGE & TIMER ===
function updateIconBadge(minutes) {
  if (typeof chrome === 'undefined' || !chrome.action) return;
  const text = minutes > 0 ? minutes.toString() : "";
  chrome.action.setBadgeText({ text: text });
  chrome.action.setBadgeBackgroundColor({ color: "#f0d060" });
}

function startTimer(id, minutes) {
  const endTime = Date.now() + minutes * 60 * 1000;
  storage.set({ [`timer_${id}`]: endTime }, () => { tick(id); });
}

function stopAndRemoveTimer(id) {
  if (activeIntervals[id]) { clearInterval(activeIntervals[id]); delete activeIntervals[id]; }
  updateIconBadge(0);

  const cancelBtn = document.getElementById(`timer-cancel-${id}`);
  if (cancelBtn) cancelBtn.classList.remove('visible');

  storage.remove(`timer_${id}`, () => {
    const display = document.getElementById(`timer-display-${id}`);
    if (display) {
      display.innerText = "Start Timer";
      display.classList.remove("timer-active", "timer-done");
    }
  });
}

function tick(id) {
  storage.get([`timer_${id}`], (data) => {
    const endTime = data[`timer_${id}`];
    if (!endTime) return;
    const display = document.getElementById(`timer-display-${id}`);
    const cancelBtn = document.getElementById(`timer-cancel-${id}`);

    if (!display) return;
    display.classList.add("timer-active");
    if (cancelBtn) cancelBtn.classList.add('visible');

    if (activeIntervals[id]) clearInterval(activeIntervals[id]);

    const updateDisplay = () => {
      const now = Date.now();
      const distance = endTime - now;
      if (distance <= 0) {
        clearInterval(activeIntervals[id]); delete activeIntervals[id];
        display.innerText = "FERTIG!";
        display.classList.remove("timer-active"); display.classList.add("timer-done");
        updateIconBadge(0);
        sendNotification();
        storage.remove(`timer_${id}`);
        if (cancelBtn) cancelBtn.classList.remove('visible');
        return;
      }
      const totalMin = Math.ceil(distance / (1000 * 60));
      updateIconBadge(totalMin);
      const h = Math.floor(distance / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      display.innerText = (h > 0 ? h + "h " : "") + (m < 10 && h > 0 ? "0" : "") + m + "m " + (s < 10 ? "0" : "") + s + "s";
    };
    updateDisplay();
    activeIntervals[id] = setInterval(updateDisplay, 1000);
  });
}

function sendNotification() {
  if (typeof chrome === 'undefined' || !chrome.notifications) {
    console.log("Timer abgelaufen!");
    return;
  }
  chrome.notifications.create({
    type: 'basic', iconUrl: 'icons/reward.png',
    title: 'Quantum-Planer: Zeit abgelaufen!',
    message: 'Die Wartezeit ist vorbei.', priority: 2
  });
}

// === DROPDOWN NAVIGATION ===
function setupDropdown() {
  const select = document.getElementById('step-select');
  if (!select) return;
  select.innerHTML = "";
  steps.forEach((step, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    const isCalc = step.isCalculator;
    const hasStep = step.title.toLowerCase().includes("schritt");
    opt.innerText = index === 0 ? "Startseite" : (isCalc ? step.title : (hasStep ? step.title : `Schritt ${index}: ${step.title}`));
    select.appendChild(opt);
  });
  select.value = currentIndex;
  select.onchange = (e) => {
    currentIndex = parseInt(e.target.value);
    storage.set({ 'qi_current_page': currentIndex });
    const overlay = document.getElementById('calc-sticky-overlay');
    if (overlay) overlay.remove();
    renderStep('top');
  };
}

// === UI RENDERING ===
function renderStep(scrollBehavior = 'preserve') {
  const container = document.getElementById('step-content');
  const savedScroll = window.scrollY;
  const step = steps[currentIndex];
  const navOverlay = document.getElementById('main-nav');
  const select = document.getElementById('step-select');

  // Entferne Overlay wenn nicht im Rechner
  const oldOverlay = document.getElementById('calc-sticky-overlay');
  if (oldOverlay && !step.isCalculator) oldOverlay.remove();

  container.innerHTML = "";
  if (select) select.value = currentIndex;

  // Navigation Overlay Logic removed - replaced by Big Finish Navigation at end of step


  // Startseite Layout (Intro)
  if (step.intro) {
    const introDiv = document.createElement('div');
    introDiv.className = 'intro-container';

    let buildingHtml = "";
    step.buildings.forEach((b) => {
      buildingHtml += `
            <div class="intro-group" style="margin-bottom: 25px; text-align: center;">
                <button class="start-building-btn" data-id="${b.id}">
                    <img src="${b.img}">
                </button>
                <div class="intro-desc">${b.desc}</div>
            </div>`;
    });

    introDiv.innerHTML = `
            <div id="sideview-promo" class="promo-box">
                <div class="promo-header">
                    <span>💻 PC Side-View Anleitung</span>
                    <button id="toggle-promo" class="promo-toggle-btn">▼</button>
                </div>
                <div id="promo-content" class="promo-body">
                    <p>Nutze den Planer direkt <b>im Spiel-Tab</b> als Sidepanel:</p>
                    <div class="bookmarklet-tip">
                        1. Ziehe diesen Button in deine Lesezeichen-Leiste:<br>
                        <a id="intro-bookmarklet-link" href="#" onclick="return false;" class="bookmarklet-btn">QP Side-View</a>
                    </div>
                    <p style="font-size: 0.7rem; opacity: 0.7;">Klicke im Spiel auf das Lesezeichen zum Ein-/Ausblenden.</p>
                </div>
            </div>

            <h1>${step.title}</h1>

            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; width: 100%;">
                ${buildingHtml}
            </div>
            
            <div class="theme-switch-container footer-switch">
                <span>HELL</span>
                <label class="switch">
                    <input type="checkbox" id="theme-toggle">
                    <span class="slider"></span>
                </label>
                <span>DUNKEL</span>
            </div>
        `;
    container.appendChild(introDiv);

    // Theme-Logik
    const toggle = document.getElementById('theme-toggle');
    storage.get(['theme'], (data) => {
      const isDark = data.theme !== 'light';
      toggle.checked = isDark;
      document.body.classList.toggle('light-mode', !isDark);
    });

    toggle.onchange = (e) => {
      const isDark = e.target.checked;
      document.body.classList.toggle('light-mode', !isDark);
      storage.set({ 'theme': isDark ? 'dark' : 'light' });
    };

    const startBtns = introDiv.querySelectorAll('.start-building-btn');
    startBtns.forEach((btn, index) => {
      btn.onclick = () => {
        const b = step.buildings[index];
        if (b.id === 'intro_adv') {
          showInfoPopup();
        } else if (b.id === 'intro_calc') {
          currentIndex = steps.length - 1;
          storage.set({ 'qi_current_page': currentIndex });
          renderStep('top');
        } else {
          currentIndex = 1;
          storage.set({ 'qi_current_page': currentIndex });
          renderStep('top');
        }
      };
    });

    // Side-View Promo Toggle & Logic
    const promoToggle = document.getElementById('toggle-promo');
    const promoContent = document.getElementById('promo-content');
    const sideviewPromo = document.getElementById('sideview-promo');

    storage.get(['intro_sideview_collapsed'], (data) => {
      if (data.intro_sideview_collapsed) {
        promoContent.classList.add('collapsed');
        promoToggle.innerText = '▶';
        sideviewPromo.classList.add('is-collapsed');
      }
    });

    promoToggle.onclick = () => {
      const isCollapsed = promoContent.classList.toggle('collapsed');
      sideviewPromo.classList.toggle('is-collapsed', isCollapsed);
      promoToggle.innerText = isCollapsed ? '▶' : '▼';
      storage.set({ 'intro_sideview_collapsed': isCollapsed });
    };

    // Bookmarklet Link auf Intro-Page setzen
    const introBookmarklet = document.getElementById('intro-bookmarklet-link');
    if (introBookmarklet) {
      const baseUrl = window.location.href.split('#')[0];
      const code = `javascript:(function(){var id='qp-side-view';var ex=document.getElementById(id);if(ex){ex.remove();document.body.style.marginRight='0px';return;}var f=document.createElement('iframe');f.id=id;f.src='${baseUrl}';f.style.cssText='position:fixed;top:0;right:0;width:420px;height:100%;z-index:999999;border:none;box-shadow:-5px 0 20px rgba(0,0,0,0.5);border-left:2px solid #f0d060;';document.body.appendChild(f);document.body.style.marginRight='420px';})();`;
      introBookmarklet.href = code;
    }

    return;
  }

  // Quanten-Rechner Layout
  if (step.isCalculator) {
    loadCalcState(() => {
      container.innerHTML = `
        <h3>${step.title}</h3>
        <div class="calc-age-toggle">
          <button class="${calcState.ui.ages.FMA ? 'active' : ''}" data-age="FMA">FMA</button>
          <button class="${calcState.ui.ages.HMA ? 'active' : ''}" data-age="HMA">HMA</button>
          <button class="${calcState.ui.ages.SMA ? 'active' : ''}" data-age="SMA">SMA</button>
        </div>

        <div class="calc-section">
          <h4>📦 VORRÄTE</h4>
          <div class="calc-bonus-row">
            <span>Stadtbonus %:</span>
            <div style="display: flex; gap: 5px; align-items: center;">
              <input type="number" id="calc_bonus_prod" value="${calcState.produktion.stadtbonus || 0}">
              <button class="paste-btn" data-target="calc_bonus_prod" title="Aus Zwischenablage einfügen">📋</button>
            </div>
          </div>
          <div id="calc-produktion-container"></div>
          <div id="calc-prod-summary" class="calc-summary"></div>
        </div>

        <div class="calc-section">
          <h4>💰 MÜNZEN</h4>
          <div class="calc-bonus-row">
            <span>Stadtbonus %:</span>
            <div style="display: flex; gap: 5px; align-items: center;">
              <input type="number" id="calc_bonus_wohn" value="${calcState.wohnen.stadtbonus || 0}">
              <button class="paste-btn" data-target="calc_bonus_wohn" title="Aus Zwischenablage einfügen">📋</button>
            </div>
          </div>
          <div id="calc-wohnen-container"></div>
          <div id="calc-wohn-summary" class="calc-summary"></div>
        </div>

        <div class="calc-section">
          <h4>🏛️ KULTUR & EUPHORIE</h4>
          <div id="calc-kultur-container"></div>
          <div id="calc-kultur-summary" class="calc-summary"></div>
        </div>

        <div class="calc-section">
          <h4>🌳 DEKORATION & KAMPFKRAFT</h4>
          <div id="calc-deko-container"></div>
          <div id="calc-deko-summary" class="calc-summary"></div>
        </div>

        <div class="calc-info">Alle Erträge bei maximaler Euphorie (150%).</div>
        <button id="calc-reset-btn" class="danger" style="width:100%; margin-top:20px;">Rechner zurücksetzen</button>

        <div class="step-navigation">
           <button class="back-step-btn" id="calc-back">Zurück zur Startseite</button>
        </div>
      `;

      renderCalcGroupUI("calc-produktion-container", calcState.produktion, "produktion");
      renderCalcGroupUI("calc-wohnen-container", calcState.wohnen, "wohnen");
      renderCalcGroupUI("calc-kultur-container", calcState.kultur, "kultur");
      renderCalcGroupUI("calc-deko-container", calcState.deko, "deko");
      updateCalculator();

      // Events
      container.querySelectorAll('.calc-age-toggle button').forEach(btn => {
        btn.onclick = () => {
          const age = btn.dataset.age;
          calcState.ui.ages[age] = !calcState.ui.ages[age];
          saveCalcState();
          renderStep();
        };
      });

      const prodIn = document.getElementById('calc_bonus_prod');
      if (prodIn) {
        prodIn.oninput = (e) => {
          calcState.produktion.stadtbonus = parseInt(e.target.value) || 0;
          saveCalcState();
          updateCalculator();
        };
      }
      const wohnIn = document.getElementById('calc_bonus_wohn');
      if (wohnIn) {
        wohnIn.oninput = (e) => {
          calcState.wohnen.stadtbonus = parseInt(e.target.value) || 0;
          saveCalcState();
          updateCalculator();
        };
      }
      document.getElementById('calc-reset-btn').onclick = () => {
        if (confirm("Rechner wirklich zurücksetzen?")) {
          calcState = JSON.parse(JSON.stringify(CALC_DEFAULT_STATE));
          saveCalcState();
          renderStep();
        }
      };

      const backBtn = document.getElementById('calc-back');
      if (backBtn) {
        backBtn.onclick = () => {
          currentIndex = 0;
          storage.set({ 'qi_current_page': currentIndex });
          const overlay = document.getElementById('calc-sticky-overlay');
          if (overlay) overlay.remove();
          renderStep('top');
        };
      }

      // Paste-Buttons Logik
      container.querySelectorAll('.paste-btn').forEach(btn => {
        btn.onclick = async () => {
          try {
            const text = await navigator.clipboard.readText();
            const val = parseInt(text);
            if (!isNaN(val)) {
              const targetId = btn.dataset.target;
              const input = document.getElementById(targetId);
              if (input) {
                input.value = val;
                input.dispatchEvent(new Event('input'));
              }
            }
          } catch (err) {
            console.error('Fehler beim Auslesen der Zwischenablage:', err);
          }
        };
      });
    });
    return;
  }

  // Normales Schritt-Rendering
  storage.get(['done_list'], (data) => {
    const doneList = data.done_list || {};
    const H3 = document.createElement('h3');
    H3.innerText = step.title;
    container.appendChild(H3);

    step.buildings.forEach(b => {
      const isChecked = doneList[b.id] ? 'checked' : '';
      const card = document.createElement('div');
      card.className = `building-row ${isChecked ? 'completed' : ''}`;
      if (b.special) card.setAttribute('data-special', b.special);
      if (b.type) card.setAttribute('data-type', b.type);

      let timerHtml = b.special === "wait" ?
        `<div class="timer-container">
                    <div class="timer-box" id="timer-display-${b.id}">Start Timer</div>
                    <div class="timer-cancel" id="timer-cancel-${b.id}" title="Abbrechen">X</div>
                    <a href="ms-clock:" class="win-clock-btn" title="Windows Uhr öffnen">🕒 Planer</a>
                 </div>` : "";

      card.innerHTML = `<img src="${b.img}"><div class="desc">${b.desc} ${timerHtml}</div>`;
      container.appendChild(card);

      if (b.special === "wait") {
        const tBox = card.querySelector('.timer-box');
        const cBox = card.querySelector('.timer-cancel');

        storage.get([`timer_${b.id}`], (tData) => { if (tData[`timer_${b.id}`]) tick(b.id); });
        tBox.onclick = (e) => { e.stopPropagation(); startTimer(b.id, b.waitTime || 60); };
        cBox.onclick = (e) => { e.stopPropagation(); stopAndRemoveTimer(b.id); };
      }

      // Make entire card clickable to toggle completion
      card.onclick = () => {
        const isCompleted = card.classList.contains('completed');
        card.classList.toggle('completed');
        toggleBuilding(b.id, !isCompleted);
      };
    });

    // === MANUELLE GEBÄUDEAUSWAHL (Schritt 1-17) ===
    if (currentIndex >= 1) {
      for (let i = 0; i < 3; i++) {
        container.appendChild(createManualRow(currentIndex, i));
      }
    }

    // === PLANS (BEFORE HARVEST) ===
    if (step.plans && step.plans.length > 0) {
      const planDiv = document.createElement('div');
      planDiv.className = 'plan-container';
      step.plans.forEach((imgSrc, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'plan-wrapper';
        const labelText = step.plans.length > 1 ? (idx === 0 ? "UMBAU" : "NEUBAU") : "NEUBAU";
        wrapper.innerHTML = `<div class="plan-label">${labelText}</div><img src="${imgSrc}" class="plan-thumb">`;
        wrapper.querySelector('img').onclick = () => openModal(imgSrc);
        planDiv.appendChild(wrapper);
      });
      container.appendChild(planDiv);
    }

    // === HARVEST DISPLAY AT END OF STEP ===
    if (currentIndex >= 1) {
      const harvest = calculateHarvest(currentIndex);
      const harvestDiv = document.createElement('div');
      harvestDiv.className = 'harvest-info';

      const formatWithRefund = (production, refund) => {
        if (refund > 0) {
          return `${Math.floor(production).toLocaleString()} (+${Math.floor(refund).toLocaleString()})`;
        }
        return Math.floor(production).toLocaleString();
      };

      harvestDiv.innerHTML = `
         <div class="harvest-header">Zu erwartende Ernte:</div>
         <div class="harvest-stats">
             <span title="Ernte (+ Rückgewinnung aus Abriss)"><img src="icons/Münzen.webp"> ${formatWithRefund(harvest.coins, harvest.refund.coins)}</span>
             <span title="Ernte (+ Rückgewinnung aus Abriss)"><img src="icons/Vorrat.webp"> ${formatWithRefund(harvest.supplies, harvest.refund.supplies)}</span>
             <span title="Ernte (+ Rückgewinnung aus Abriss)"><img src="icons/legierung.png"> ${formatWithRefund(harvest.alloys, harvest.refund.alloys)}</span>
             <span title="Aktionen:\n${harvest.actionBreakdown.join('\n')}"><img src="icons/action_points.webp"> +${harvest.actions}/h</span>
             <span><img src="icons/aap.webp" title="Kampfkraft"> ${harvest.combat}%</span>
             <span><img src="icons/happy.png" title="Maximale Euphorie (150%)" style="border: 2px solid #4CAF50; border-radius: 50%; padding: 1px; width: 22px; height: 22px; vertical-align: middle;"></span>
         </div>
      `;
      container.appendChild(harvestDiv);
    }

    // === BIG FINISH NAVIGATION ===
    const navDiv = document.createElement('div');
    navDiv.className = 'step-navigation';

    const checkPulsing = () => {
      storage.get(['done_list'], (data) => {
        const currentDoneList = data.done_list || {};
        let allDone = true;
        step.buildings.forEach(b => {
          if (!currentDoneList[b.id]) allDone = false;
        });
        const nextBtn = navDiv.querySelector('.next-step-btn');
        if (nextBtn) {
          if (allDone) nextBtn.classList.add('pulse');
          else nextBtn.classList.remove('pulse');
        }
      });
    };

    // 1. Next Step Button
    if (currentIndex < steps.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-step-btn';
      nextBtn.innerHTML = `<span>NÄCHSTER SCHRITT</span> <span style="font-size: 0.8em; opacity: 0.8;">(${currentIndex + 1})</span>`;
      nextBtn.onclick = () => {
        currentIndex++;
        storage.set({ 'qi_current_page': currentIndex });
        renderStep('top');
      };
      navDiv.appendChild(nextBtn);
      checkPulsing();
    }

    // Update building card click to trigger pulsing check
    container.querySelectorAll('.building-row').forEach(card => {
      const originalOnClick = card.onclick;
      card.onclick = () => {
        originalOnClick();
        setTimeout(checkPulsing, 100);
      };
    });

    // 2. Back Button
    if (currentIndex > 1) {
      const backBtn = document.createElement('button');
      backBtn.className = 'back-step-btn';
      backBtn.innerText = `Zurück zu Schritt ${currentIndex - 1}`;
      backBtn.onclick = () => {
        currentIndex--;
        storage.set({ 'qi_current_page': currentIndex });
        renderStep('top');
      };
      navDiv.appendChild(backBtn);
    }

    // 3. Reset Button
    const resetCont = document.createElement('div');
    resetCont.className = 'reset-container';
    const resetBtn = document.createElement('button');
    resetBtn.className = 'danger';
    resetBtn.innerText = 'Saison Reset';
    resetBtn.onclick = () => {
      if (confirm("Möchtest du wirklich alle Fortschritte dieser Saison löschen?")) {
        storage.clear(() => location.reload());
      }
    };
    resetCont.appendChild(resetBtn);
    navDiv.appendChild(resetCont);

    container.appendChild(navDiv);

    // Scroll-Verhalten anwenden
    if (scrollBehavior === 'top') {
      window.scrollTo(0, 0);
    } else if (scrollBehavior === 'preserve') {
      window.scrollTo(0, savedScroll);
    }
  });
}

function toggleBuilding(id, isDone) {
  storage.get(['done_list'], (data) => {
    let doneList = data.done_list || {};
    doneList[id] = isDone;
    storage.set({ 'done_list': doneList });
  });
}

function showInfoPopup() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content" style="background: var(--card-bg); padding: 30px; text-align: center; max-width: 90%; width: 400px; position: relative; border: 2px solid var(--header-color); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <h3 style="color: var(--header-color); margin-top: 0; margin-bottom: 25px; font-size: 1.4rem;">Mittelalter (Fortgeschritten)</h3>
        
        <div style="text-align: left; margin-bottom: 25px; font-size: 1rem;">
            <strong style="display:block; margin-bottom:10px; color: var(--text-color);">Bevorzugte Gütergebäude:</strong>
            <div style="display: flex; gap: 12px; margin-bottom: 8px; justify-content: center;">
                <img src="buildings/Beekeeper.webp" style="width:50px; height:50px; border-radius:6px; border: 1px solid var(--border-color);">
                <img src="buildings/Ropery.webp" style="width:50px; height:50px; border-radius:6px; border: 1px solid var(--border-color);">
                <img src="buildings/Gunpowder.webp" style="width:50px; height:50px; border-radius:6px; border: 1px solid var(--border-color);">
            </div>
            <div style="text-align: center; color: #aaa; font-size: 0.9rem;">Imker / Seilerei / Schießpulver-Manufaktur</div>
        </div>

        <div style="text-align: left; margin-bottom: 25px; font-size: 1rem;">
            <strong style="display:block; margin-bottom:10px; color: var(--text-color);">Bevorzugte Militärgebäude:</strong>
            <div style="display: flex; gap: 12px; margin-bottom: 8px; justify-content: center;">
                <img src="buildings/Catapultcamp.webp" style="width:50px; height:50px; border-radius:6px; border: 1px solid var(--border-color);">
                <img src="buildings/Trebuchet_Camp.webp" style="width:50px; height:50px; border-radius:6px; border: 1px solid var(--border-color);">
                <img src="buildings/Cannon_camp.webp" style="width:50px; height:50px; border-radius:6px; border: 1px solid var(--border-color);">
            </div>
            <div style="display: flex; align-items: center; gap: 8px; justify-content: center; color: #aaa; font-size: 0.9rem;">
                 Artillerie-Gebäude <img src="icons/ArtillerieEinheit.webp" style="width:24px; height:24px;">
            </div>
        </div>

        <div style="text-align: center; margin-bottom: 30px; font-size: 1rem; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px;">
            <strong style="color: var(--header-color);">Produktionszeit zwischen den Schritten:</strong><br><span style="font-size: 1.2rem; font-weight: bold;">10 Stunden</span>
        </div>

        <div style="text-align: center; margin-bottom: 20px; font-size: 0.85rem; opacity: 0.7; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
            Quelle & Video-Anleitung:<br>
            <a href="https://www.youtube.com/watch?v=B0g2aTwSNCE&t=108s" target="_blank" style="color: var(--header-color); text-decoration: none; font-weight: bold;">Linnun FOE (YouTube)</a>
        </div>

        <div id="popup-close-x" style="
            color: #888; 
            font-size: 24px; 
            cursor: pointer; 
            margin: 0 auto;
            transition: color 0.2s;
            line-height: 1;
        ">✖</div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeX = modal.querySelector('#popup-close-x');

  closeX.onmouseover = () => {
    closeX.style.color = '#ff4444';
  };
  closeX.onmouseout = () => {
    closeX.style.color = '#888';
  };

  const closePopup = () => {
    modal.remove();
    currentIndex = 1;
    storage.set({ 'qi_current_page': currentIndex });
    renderStep('top');
  };

  closeX.onclick = closePopup;

  // Close on background click
  modal.onclick = (e) => {
    if (e.target === modal) {
      closePopup();
    }
  };
}

// === MODAL & UTILS ===
function openModal(src) {
  const modal = document.getElementById('image-modal');
  const fullImg = document.getElementById('full-image');
  if (modal && fullImg) { modal.classList.remove('hidden'); fullImg.src = src; }
}

window.onscroll = () => {
  const btn = document.getElementById('back-to-top');
  if (btn) {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const btt = document.getElementById('back-to-top');
  if (btt) btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const closeBtn = document.querySelector('.modal-close');
  const modal = document.getElementById('image-modal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.add('hidden');
  if (modal) modal.onclick = (e) => { if (e.target.id === 'image-modal') modal.classList.add('hidden'); };

  // Sync Modal Logic
  const syncBtn = document.getElementById('sync-btn');
  const syncModal = document.getElementById('sync-modal');
  const syncClose = document.getElementById('sync-close');
  if (syncBtn && syncModal) {
    syncBtn.onclick = () => showSyncModal();
    if (syncClose) syncClose.onclick = () => syncModal.classList.add('hidden');
    syncModal.onclick = (e) => { if (e.target === syncModal) syncModal.classList.add('hidden'); };
  }

  // Tab Logic for Sync Modal
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(`tab-${btn.dataset.tab}`);
      if (pane) pane.classList.add('active');
    };
  });

  // Bookmarklet Logic
  const bookmarkletLink = document.getElementById('bookmarklet-link');
  if (bookmarkletLink) {
    const baseUrl = window.location.href.split('#')[0];
    const code = `javascript:(function(){var id='qp-side-view';var ex=document.getElementById(id);if(ex){ex.remove();document.body.style.marginRight='0px';return;}var f=document.createElement('iframe');f.id=id;f.src='${baseUrl}';f.style.cssText='position:fixed;top:0;right:0;width:420px;height:100%;z-index:999999;border:none;box-shadow:-5px 0 20px rgba(0,0,0,0.5);border-left:2px solid #f0d060;';document.body.appendChild(f);document.body.style.marginRight='420px';})();`;
    bookmarkletLink.href = code;
  }

  // Choice Modal Logic
  const setMobileBtn = document.getElementById('set-mobile-btn');
  const setDesktopBtn = document.getElementById('set-desktop-btn');
  const choiceModal = document.getElementById('choice-modal');

  const setMode = (mode) => {
    storage.set({ 'device_mode': mode }, () => {
      document.body.className = document.body.className.replace(/mode-\w+/g, '');
      document.body.classList.add(`mode-${mode}`);
      if (choiceModal) choiceModal.classList.add('hidden');
    });
  };

  if (setMobileBtn) setMobileBtn.onclick = () => setMode('mobile');
  if (setDesktopBtn) setDesktopBtn.onclick = () => setMode('desktop');

  const resetModeBtn = document.getElementById('reset-mode-btn');
  if (resetModeBtn) {
    resetModeBtn.onclick = () => {
      if (confirm("Möchtest du die Ansicht wirklich ändern? Die Seite wird neu geladen.")) {
        storage.remove('device_mode', () => location.reload());
      }
    };
  }
});

function showSyncModal() {
  const syncModal = document.getElementById('sync-modal');
  const qrImg = document.getElementById('qrcode-img');
  const baseUrl = window.location.href.split('#')[0];

  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(baseUrl)}`;
  }
  if (syncModal) syncModal.classList.remove('hidden');
}

// NAVIGATION BUTTONS REMOVED - NOW DYNAMICALLY IN RENDERSTEP

// === MANUELLE AUSWAHL HELPER ===
const buildingImages = {
  "multistory_house": "buildings/Multistory_House.webp",
  "frame_house": "buildings/Frame_House.webp",
  "clapboard_house": "buildings/Clapboard_House.webp",
  "mansion": "buildings/Mansion.webp",
  "estate_house": "buildings/Estate_House.webp",
  "tannery": "buildings/Tannery.webp",
  "bakery": "buildings/Bakery.webp",
  "alchemist": "buildings/Alchemist.webp",
  "windmill": "buildings/Windmill.webp",
  "brewery": "buildings/Brewery.webp",
  "spice_trader": "buildings/Spice_Trader.webp",
  "cooperage": "buildings/Barrelproducer.webp",
  "beekeeper": "buildings/Beekeeper.webp",
  "gunpowder": "buildings/Gunpowder.webp",
  "ropery": "buildings/Ropery.webp",
  "brickworks": "buildings/Beekeeper.webp", // Fallback für Ziegelei
  "church": "buildings/Church.webp",
  "gallows": "buildings/Gallows.webp",
  "pillory": "buildings/Pillory.webp",
  "marketplace": "buildings/Marketplace.webp",
  "signpost": "buildings/Signpost.webp",
  "catapultcamp": "buildings/Catapultcamp.webp",
  "trebuchet_camp": "buildings/Trebuchet_Camp.webp",
  "cannon_camp": "buildings/Cannon_camp.webp"
};

function createManualRow(stepIdx, slotIdx) {
  const row = document.createElement('div');
  row.className = 'building-row manual-row';

  const stepData = manualSelections[stepIdx] || [{}, {}, {}];
  const currentData = stepData[slotIdx] || { buildingId: '', count: 0 };

  const getImg = (bid) => buildingImages[bid] || "icons/reward.png";

  const img = document.createElement('img');
  img.src = getImg(currentData.buildingId);

  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.style.display = 'flex';
  desc.style.gap = '5px'; // Reduced from 8px
  desc.style.alignItems = 'center';

  const bSelect = document.createElement('select');
  bSelect.className = 'manual-select building-sel';
  bSelect.style.flex = "1";

  const defaultOpt = document.createElement('option');
  defaultOpt.value = "";
  defaultOpt.innerText = "-- Gebäude --";
  bSelect.appendChild(defaultOpt);

  const sortedStats = Object.entries(buildingStats)
    .filter(([id]) => !['expansion', 'intro_min', 'intro_adv'].includes(id))
    .sort((a, b) => a[1].name.localeCompare(b[1].name));

  sortedStats.forEach(([id, stats]) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.innerText = stats.name;
    if (id === currentData.buildingId) opt.selected = true;
    bSelect.appendChild(opt);
  });

  const cSelect = document.createElement('select');
  cSelect.className = 'manual-select count-sel';
  for (let i = 0; i <= 20; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = i;
    if (i === parseInt(currentData.count || 0)) opt.selected = true;
    cSelect.appendChild(opt);
  }

  const clearBtn = document.createElement('div');
  clearBtn.className = 'manual-clear-btn';
  clearBtn.innerHTML = '✖';
  clearBtn.title = 'Zeile leeren';

  desc.appendChild(bSelect);
  desc.appendChild(cSelect);
  desc.appendChild(clearBtn);

  row.appendChild(img);
  row.appendChild(desc);

  const updateSelection = () => {
    const newData = {
      buildingId: bSelect.value,
      count: parseInt(cSelect.value)
    };

    // Propagate 1:1 to ALL following steps
    for (let s = stepIdx; s < steps.length; s++) {
      if (!manualSelections[s]) manualSelections[s] = [{}, {}, {}];
      manualSelections[s][slotIdx] = { ...newData };
    }

    img.src = getImg(bSelect.value);
    storage.set({ 'manual_selections': manualSelections }, () => {
      renderStep('preserve');
    });
  };

  bSelect.onchange = updateSelection;
  cSelect.onchange = updateSelection;
  clearBtn.onclick = (e) => {
    e.stopPropagation();
    bSelect.value = "";
    cSelect.value = "0";
    updateSelection();
  };

  return row;
}

function renderCalcGroupUI(containerId, gruppe, type) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = "";

  const ages = ["FMA", "HMA", "SMA"];
  ages.forEach(age => {
    if (!calcState.ui.ages[age]) return;
    const items = gruppe.items.filter(i => i.age === age);
    if (items.length === 0) return;

    const h = document.createElement("div");
    h.className = "calc-age-header";
    h.textContent = age;
    c.appendChild(h);

    items.forEach(item => {
      const idx = gruppe.items.indexOf(item);
      const row = document.createElement("div");
      row.className = "calc-row";
      row.innerHTML = `
        <div class="calc-name">${item.name}</div>
        <div class="calc-qty">
          <button class="minus">−</button>
          <span id="calc_${type}_count_${idx}">${item.anzahl}</span>
          <button class="plus">+</button>
        </div>
        <div class="calc-total" id="calc_${type}_total_${idx}">0</div>
      `;

      row.querySelector(".minus").onclick = () => {
        if (item.anzahl > 0) {
          item.anzahl--;
          saveCalcState();
          updateCalculator();
        }
      };
      row.querySelector(".plus").onclick = () => {
        item.anzahl++;
        saveCalcState();
        updateCalculator();
      };
      c.appendChild(row);
    });
  });
}
