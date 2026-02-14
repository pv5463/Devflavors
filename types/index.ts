export interface Molecule {
  id: string;
  name: string;
  flavorProfile: string[];
  functionalGroups: string[];
  intensity: number;
}

export interface FlavorCompound {
  compoundId: string;
  compoundName: string;
  category: "sulfur" | "allicin" | "phenolic" | "terpene" | "other";
  flavorNotes: string[];
  molecularWeight: number;
  retentionTime: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: "vegetable" | "spice" | "herb" | "aromatic";
  sattvicStatus: "allowed" | "forbidden" | "restricted";
  compounds: FlavorCompound[];
  flavorProfile: {
    pungency: number;
    umami: number;
    sweetness: number;
    bitterness: number;
    astringency: number;
  };
  molecularSubstitutes?: string[];
}

export interface SubstitutionBlend {
  targetIngredient: string;
  substitutes: {
    ingredient: Ingredient;
    ratio: number;
    reason: string;
    matchingCompounds: string[];
  }[];
  flavorSimilarity: number;
  scientificBasis: string;
  preparationNotes: string;
}

export interface MythologicalStory {
  title: string;
  deity?: string;
  story: string;
  significance: string;
  ritual?: string;
  benefits: string[];
}

export interface UserProfile {
  goal: "weight_loss" | "muscle_gain" | "mental_clarity" | "energy_boost" | "spiritual_growth";
  activityLevel: "sedentary" | "active" | "yoga_practitioner" | "athlete";
  currentMood?: "anxious" | "lethargic" | "balanced" | "stressed" | "energetic";
  restrictions?: string[];
}

export interface PranicValue {
  score: number; // 1-10
  explanation: string;
  freshness: "very_fresh" | "fresh" | "moderate" | "processed";
  energyType: "cooling" | "warming" | "neutral";
}

export interface MacroNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  pranaScore?: number;
}

export interface PersonalizedRecipe extends Recipe {
  pranicValue: PranicValue;
  mindfulnessTip: string;
  moodBalance: string;
  chakraAlignment?: string;
  bestTimeToEat?: string;
  seasonalNote?: string;
}

export interface FastFoodSubstitution {
  originalFood: string;
  originalImage?: string;
  sattvicAlternative: PersonalizedRecipe;
  tasteMatch: number; // 1-100%
  healthImprovement: string[];
  calorieReduction: number;
  nutritionComparison: {
    original: MacroNutrition;
    sattvic: MacroNutrition;
  };
}

export interface ScannedRecipeGeneration {
  scannedItems: string[];
  suggestedRecipes: PersonalizedRecipe[];
  missingIngredients?: string[];
  preparationTime: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: {
    item: string;
    quantity: string;
    isForbidden: boolean;
    substitute?: string;
  }[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  sattvicStatus: "pure" | "modified" | "forbidden";
  tags: string[];
  mythology?: MythologicalStory;
  fastingType?: "navratri" | "ekadashi" | "mahashivratri" | "janmashtami" | "general";
}
