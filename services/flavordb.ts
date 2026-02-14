import { Ingredient, FlavorCompound, SubstitutionBlend } from "../types";
import { FlavorDBAPIService, FlavorDBCompound } from "./flavordb-api";

// Feature flag to toggle between mock and real API
const USE_REAL_API = true;

// Mock FlavorDB Data - Molecular compound database
const FLAVOR_COMPOUNDS: Record<string, FlavorCompound[]> = {
  // Garlic compounds (sulfur-based)
  garlic: [
    {
      compoundId: "C00322",
      compoundName: "Allicin",
      category: "sulfur",
      flavorNotes: ["pungent", "sulfurous", "hot"],
      molecularWeight: 162.28,
      retentionTime: 12.4,
    },
    {
      compoundId: "C00323",
      compoundName: "Diallyl Disulfide",
      category: "sulfur",
      flavorNotes: ["garlic", "onion", "strong"],
      molecularWeight: 146.27,
      retentionTime: 15.2,
    },
    {
      compoundId: "C00324",
      compoundName: "Diallyl Trisulfide",
      category: "sulfur",
      flavorNotes: ["garlic", "pungent", "lingering"],
      molecularWeight: 178.33,
      retentionTime: 18.7,
    },
  ],
  // Onion compounds
  onion: [
    {
      compoundId: "C00567",
      compoundName: "Propylthiosulfinic Acid",
      category: "sulfur",
      flavorNotes: ["pungent", "tear-inducing", "sharp"],
      molecularWeight: 152.24,
      retentionTime: 11.8,
    },
    {
      compoundId: "C00568",
      compoundName: "Dipropyl Disulfide",
      category: "sulfur",
      flavorNotes: ["onion", "sweet", "sulfur"],
      molecularWeight: 150.29,
      retentionTime: 14.3,
    },
  ],
  // Asafoetida (Hing) - sulfur-based substitute
  asafoetida: [
    {
      compoundId: "C00789",
      compoundName: "Ferulic Acid",
      category: "phenolic",
      flavorNotes: ["earthy", "aromatic", "stable"],
      molecularWeight: 194.18,
      retentionTime: 8.5,
    },
    {
      compoundId: "C00790",
      compoundName: "Umbelliferone",
      category: "other",
      flavorNotes: ["sweet", "vanilla-like", "warm"],
      molecularWeight: 162.14,
      retentionTime: 10.2,
    },
    {
      compoundId: "C00791",
      compoundName: "Asaresinotannol",
      category: "sulfur",
      flavorNotes: ["pungent", "garlic-like", "intense"],
      molecularWeight: 246.35,
      retentionTime: 22.1,
    },
  ],
  // Cumin compounds
  cumin: [
    {
      compoundId: "C00912",
      compoundName: "Cuminaldehyde",
      category: "terpene",
      flavorNotes: ["earthy", "warm", "cumin"],
      molecularWeight: 148.2,
      retentionTime: 9.7,
    },
    {
      compoundId: "C00913",
      compoundName: "β-Pinene",
      category: "terpene",
      flavorNotes: ["woody", "pine", "fresh"],
      molecularWeight: 136.24,
      retentionTime: 7.3,
    },
  ],
  // Ginger compounds
  ginger: [
    {
      compoundId: "C01145",
      compoundName: "Gingerol",
      category: "phenolic",
      flavorNotes: ["pungent", "warm", "spicy"],
      molecularWeight: 294.39,
      retentionTime: 16.8,
    },
    {
      compoundId: "C01146",
      compoundName: "Zingiberene",
      category: "terpene",
      flavorNotes: ["ginger", "woody", "peppery"],
      molecularWeight: 204.36,
      retentionTime: 13.5,
    },
    {
      compoundId: "C01147",
      compoundName: "Shogaol",
      category: "phenolic",
      flavorNotes: ["sharp", "pungent", "intense"],
      molecularWeight: 276.38,
      retentionTime: 18.2,
    },
  ],
  // Black Pepper compounds
  black_pepper: [
    {
      compoundId: "C01456",
      compoundName: "Piperine",
      category: "other",
      flavorNotes: ["pungent", "pepper", "warming"],
      molecularWeight: 285.34,
      retentionTime: 19.4,
    },
    {
      compoundId: "C01457",
      compoundName: "β-Caryophyllene",
      category: "terpene",
      flavorNotes: ["peppery", "woody", "spicy"],
      molecularWeight: 204.36,
      retentionTime: 11.6,
    },
  ],
  // Fenugreek compounds
  fenugreek: [
    {
      compoundId: "C01678",
      compoundName: "Sotolone",
      category: "other",
      flavorNotes: ["maple", "sweet", "caramel"],
      molecularWeight: 128.13,
      retentionTime: 6.9,
    },
    {
      compoundId: "C01679",
      compoundName: "4-Hydroxyisoleucine",
      category: "other",
      flavorNotes: ["bitter", "earthy", "complex"],
      molecularWeight: 147.18,
      retentionTime: 5.2,
    },
  ],
  // Turmeric compounds
  turmeric: [
    {
      compoundId: "C01890",
      compoundName: "Curcumin",
      category: "phenolic",
      flavorNotes: ["earthy", "bitter", "peppery"],
      molecularWeight: 368.38,
      retentionTime: 21.3,
    },
    {
      compoundId: "C01891",
      compoundName: "Turmerone",
      category: "terpene",
      flavorNotes: ["turmeric", "woody", "aromatic"],
      molecularWeight: 216.32,
      retentionTime: 17.8,
    },
  ],
};

// Ingredient database
const INGREDIENT_DB: Ingredient[] = [
  {
    id: "ing_garlic",
    name: "Garlic",
    category: "aromatic",
    sattvicStatus: "forbidden",
    compounds: FLAVOR_COMPOUNDS.garlic,
    flavorProfile: {
      pungency: 9,
      umami: 7,
      sweetness: 2,
      bitterness: 3,
      astringency: 2,
    },
    molecularSubstitutes: ["ing_asafoetida", "ing_cumin", "ing_ginger"],
  },
  {
    id: "ing_onion",
    name: "Onion",
    category: "vegetable",
    sattvicStatus: "forbidden",
    compounds: FLAVOR_COMPOUNDS.onion,
    flavorProfile: {
      pungency: 8,
      umami: 6,
      sweetness: 5,
      bitterness: 3,
      astringency: 2,
    },
    molecularSubstitutes: ["ing_asafoetida", "ing_fenugreek", "ing_cumin"],
  },
  {
    id: "ing_asafoetida",
    name: "Asafoetida (Hing)",
    category: "spice",
    sattvicStatus: "allowed",
    compounds: FLAVOR_COMPOUNDS.asafoetida,
    flavorProfile: {
      pungency: 10,
      umami: 4,
      sweetness: 1,
      bitterness: 3,
      astringency: 2,
    },
  },
  {
    id: "ing_cumin",
    name: "Cumin",
    category: "spice",
    sattvicStatus: "allowed",
    compounds: FLAVOR_COMPOUNDS.cumin,
    flavorProfile: {
      pungency: 5,
      umami: 6,
      sweetness: 2,
      bitterness: 4,
      astringency: 3,
    },
  },
  {
    id: "ing_ginger",
    name: "Ginger",
    category: "spice",
    sattvicStatus: "allowed",
    compounds: FLAVOR_COMPOUNDS.ginger,
    flavorProfile: {
      pungency: 8,
      umami: 3,
      sweetness: 2,
      bitterness: 4,
      astringency: 2,
    },
  },
  {
    id: "ing_black_pepper",
    name: "Black Pepper",
    category: "spice",
    sattvicStatus: "allowed",
    compounds: FLAVOR_COMPOUNDS.black_pepper,
    flavorProfile: {
      pungency: 9,
      umami: 4,
      sweetness: 1,
      bitterness: 4,
      astringency: 3,
    },
  },
  {
    id: "ing_fenugreek",
    name: "Fenugreek Leaves (Kasuri Methi)",
    category: "herb",
    sattvicStatus: "allowed",
    compounds: FLAVOR_COMPOUNDS.fenugreek,
    flavorProfile: {
      pungency: 4,
      umami: 5,
      sweetness: 6,
      bitterness: 5,
      astringency: 4,
    },
  },
  {
    id: "ing_turmeric",
    name: "Turmeric",
    category: "spice",
    sattvicStatus: "allowed",
    compounds: FLAVOR_COMPOUNDS.turmeric,
    flavorProfile: {
      pungency: 4,
      umami: 3,
      sweetness: 2,
      bitterness: 6,
      astringency: 3,
    },
  },
];

// Mock API service with real API integration
export const FlavorDBService = {
  // Search ingredient by name
  searchIngredient: async (query: string): Promise<Ingredient[]> => {
    // Always search local DB first
    const lowerQuery = query.toLowerCase();
    const localResults = INGREDIENT_DB.filter(
      (ing) =>
        ing.name.toLowerCase().includes(lowerQuery) ||
        ing.compounds.some((c) =>
          c.compoundName.toLowerCase().includes(lowerQuery)
        )
    );

    if (!USE_REAL_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return localResults;
    }

    try {
      // Try to get API results
      const apiCompounds = await FlavorDBAPIService.getByCommonName(query);
      
      if (apiCompounds.length === 0) {
        return localResults;
      }
      
      // Map API results to our Ingredient type
      const apiIngredients: Ingredient[] = apiCompounds.slice(0, 5).map((compound: FlavorDBCompound) => ({
        id: `api_${compound.id}`,
        name: compound.commonName || compound.name,
        category: compound.category?.toLowerCase().includes("spice") ? "spice" : 
                  compound.category?.toLowerCase().includes("herb") ? "herb" : "aromatic",
        sattvicStatus: "allowed",
        compounds: [{
          compoundId: compound.id,
          compoundName: compound.name,
          category: (compound.functionalGroups?.[0] || "other") as "sulfur" | "allicin" | "phenolic" | "terpene" | "other",
          flavorNotes: compound.flavorProfile || [],
          molecularWeight: compound.molecularWeight || 0,
          retentionTime: 0,
        }],
        flavorProfile: {
          pungency: compound.alogp ? Math.min(10, Math.max(1, compound.alogp * 2)) : 5,
          umami: compound.hbdCount ? Math.min(10, compound.hbdCount * 2) : 5,
          sweetness: 0,
          bitterness: 0,
          astringency: 0,
        },
      }));

      // Combine local and API results
      return [...localResults, ...apiIngredients];
    } catch (error) {
      // Always return local results on error
      return localResults;
    }
  },

  // Get ingredient by ID
  getIngredient: async (id: string): Promise<Ingredient | null> => {
    if (!USE_REAL_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return INGREDIENT_DB.find((ing) => ing.id === id) || null;
    }

    try {
      // Check local DB first
      const localIngredient = INGREDIENT_DB.find((ing) => ing.id === id);
      if (localIngredient) return localIngredient;

      // Try API if it's an API ingredient
      if (id.startsWith("api_")) {
        const compoundId = id.replace("api_", "");
        const compound = await FlavorDBAPIService.getCompoundById(compoundId);
        if (!compound) return null;

        return {
          id: `api_${compound.id}`,
          name: compound.commonName || compound.name,
          category: compound.category?.toLowerCase().includes("spice") ? "spice" : 
                    compound.category?.toLowerCase().includes("herb") ? "herb" : "aromatic",
          sattvicStatus: "allowed",
          compounds: [{
            compoundId: compound.id,
            compoundName: compound.name,
            category: (compound.functionalGroups?.[0] || "other") as "sulfur" | "allicin" | "phenolic" | "terpene" | "other",
            flavorNotes: compound.flavorProfile || [],
            molecularWeight: compound.molecularWeight || 0,
            retentionTime: 0,
          }],
          flavorProfile: {
            pungency: compound.alogp ? Math.min(10, Math.max(1, compound.alogp * 2)) : 5,
            umami: compound.hbdCount ? Math.min(10, compound.hbdCount * 2) : 5,
            sweetness: 0,
            bitterness: 0,
            astringency: 0,
          },
        };
      }

      return null;
    } catch (error) {
      console.error("API fetch failed, falling back to local data:", error);
      return INGREDIENT_DB.find((ing) => ing.id === id) || null;
    }
  },

  // Get molecular substitutes for forbidden ingredients
  getSubstitutes: async (
    ingredientId: string
  ): Promise<SubstitutionBlend | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ingredient = INGREDIENT_DB.find((ing) => ing.id === ingredientId);
    if (!ingredient) return null;

    if (!ingredient.molecularSubstitutes) {
      return null;
    }

    const substitutes = ingredient.molecularSubstitutes
      .map((subId) => INGREDIENT_DB.find((ing) => ing.id === subId))
      .filter((ing): ing is Ingredient => ing !== undefined);

    // Calculate matching compounds
    const matchingCompounds: string[] = [];
    ingredient.compounds.forEach((targetComp) => {
      substitutes.forEach((sub) => {
        sub.compounds.forEach((subComp) => {
          // Match by flavor notes overlap
          const overlap = targetComp.flavorNotes.filter((note) =>
            subComp.flavorNotes.includes(note)
          );
          if (overlap.length > 0) {
            matchingCompounds.push(subComp.compoundName);
          }
        });
      });
    });

    // Calculate similarity score based on flavor profile
    const targetProfile = ingredient.flavorProfile;
    const blend: SubstitutionBlend = {
      targetIngredient: ingredient.name,
      substitutes: substitutes.map((sub) => {
        const subProfile = sub.flavorProfile;
        const profileDiff =
          Math.abs(targetProfile.pungency - subProfile.pungency) +
          Math.abs(targetProfile.umami - subProfile.umami) +
          Math.abs(targetProfile.sweetness - subProfile.sweetness);
        const similarity = Math.max(0, 100 - profileDiff * 5);

        // Determine ratio and reason
        let ratio = 0.3;
        let reason = "Complements base flavors";

        if (sub.name.includes("Asafoetida")) {
          ratio = 0.05; // Pinch only
          reason =
            "Sulfur compounds (Asaresinotannol) mimic garlic's allicin pungency";
        } else if (sub.name.includes("Cumin")) {
          ratio = 0.4;
          reason =
            "Cuminaldehyde provides earthy umami base similar to cooked onions";
        } else if (sub.name.includes("Ginger")) {
          ratio = 0.3;
          reason = "Gingerol and shogaol add pungent heat without sulfur";
        } else if (sub.name.includes("Fenugreek")) {
          ratio = 0.25;
          reason = "Sotolone adds sweet caramelized onion notes";
        }

        return {
          ingredient: sub,
          ratio,
          reason,
          matchingCompounds: sub.compounds.map((c) => c.compoundName),
        };
      }),
      flavorSimilarity: 85,
      scientificBasis: getScientificBasis(ingredient.name),
      preparationNotes: getPreparationNotes(ingredient.name),
    };

    return blend;
  },

  // Get all forbidden ingredients (Navratri/Ekadashi)
  getForbiddenIngredients: async (): Promise<Ingredient[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return INGREDIENT_DB.filter((ing) => ing.sattvicStatus === "forbidden");
  },

  // Get all allowed substitutes
  getAllowedSubstitutes: async (): Promise<Ingredient[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return INGREDIENT_DB.filter((ing) => ing.sattvicStatus === "allowed");
  },
};

function getScientificBasis(ingredientName: string): string {
  const bases: Record<string, string> = {
    Garlic:
      "Allicin (C6H10OS2) in garlic creates sulfur-based pungency. Asafoetida contains asaresinotannols which release sulfur compounds when heated, mimicking garlic's flavor profile at the molecular level. Cumin's cuminaldehyde provides the Maillard-reaction umami that cooked garlic contributes.",
    Onion:
      "Propylthiosulfinic acid creates onion's characteristic tear-inducing pungency. The blend uses Asafoetida for sulfur notes, fenugreek's sotolone for caramelized sweetness (similar to cooked onion's reducing sugars), and cumin for earthy base notes.",
  };
  return (
    bases[ingredientName] ||
    "Molecular substitution targets similar flavor compound classes (terpenes, phenolics, sulfur compounds) to replicate the sensory experience."
  );
}

function getPreparationNotes(ingredientName: string): string {
  const notes: Record<string, string> = {
    Garlic:
      "Heat asafoetida in oil first to release sulfur compounds (2-3 seconds only, burns easily). Add cumin early in cooking for Maillard reaction depth. Ginger works best when added mid-cooking to preserve pungency.",
    Onion:
      "Toast fenugreek leaves lightly before adding. Bloom asafoetida in hot oil/ghee. Cumin should be whole seeds toasted until fragrant, then ground.",
  };
  return (
    notes[ingredientName] ||
    "Add substitutes in order of oil-solubility: terpenes first, then phenolics, then sulfur compounds."
  );
}
