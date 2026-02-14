// Foodoscope API Configuration
const FOODOSCOPE_API_KEY = "vycVFejHYvzkX71rJpoDEvjE6NUY9d3LWd8eE28sdX0Nna28";
const RECIPE_API_BASE = "http://cosylab.iiitd.edu.in:6969/recipedb";
const FLAVOR_API_BASE = "http://cosylab.iiitd.edu.in:6969/flavordb";
const MEAL_PLAN_API_BASE = "http://cosylab.iiitd.edu.in:6969/meal-plan-api";

// Generic fetch wrapper
const foodoscopeFetch = async (baseUrl: string, endpoint: string, params?: Record<string, any>) => {
  const url = new URL(`${baseUrl}${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key].toString());
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": FOODOSCOPE_API_KEY,
        "x-api-key": FOODOSCOPE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Don't log 400 errors - they're expected for invalid searches
    if (error instanceof Error && !error.message.includes('400')) {
      console.error(`[Foodoscope API] Error fetching ${endpoint}:`, error);
    }
    throw error;
  }
};

// ============= RECIPE API TYPES =============
export interface RecipeIngredient {
  ingredient: string;
  quantity?: string;
  unit?: string;
  state?: string;
  phrase: string;
}

export interface FoodoscopeRecipe {
  _id?: string;
  Recipe_id: string;
  Recipe_title: string;
  Calories?: string;
  cook_time?: string;
  prep_time?: string;
  total_time?: string;
  servings?: string;
  Region?: string;
  Sub_region?: string;
  Continent?: string;
  Source?: string;
  img_url?: string;
  url?: string;
  "Carbohydrate, by difference (g)"?: string;
  "Energy (kcal)"?: string;
  "Protein (g)"?: string;
  "Total lipid (fat) (g)"?: string;
  Utensils?: string;
  Processes?: string;
  vegan?: string;
  pescetarian?: string;
  ovo_vegetarian?: string;
  lacto_vegetarian?: string;
  ovo_lacto_vegetarian?: string;
  ingredients?: RecipeIngredient[];
}

export interface RecipeAPIResponse {
  success: string;
  message: string;
  payload: {
    data: FoodoscopeRecipe | FoodoscopeRecipe[];
  };
}

// ============= MEAL PLAN API TYPES =============
export interface MealPlanRecipe {
  Recipe_id: string;
  Recipe_title: string;
  Calories: string;
  total_time: string;
  Region: string;
  ingredients: RecipeIngredient[];
}

export interface DayMealPlan {
  Breakfast: MealPlanRecipe;
  Lunch: MealPlanRecipe;
  Dinner: MealPlanRecipe;
}

export interface MealPlanData {
  diet_type: string;
  days: number;
  exclude_ingredients: string[];
  meal_plan: {
    [key: string]: DayMealPlan; // "Day 1", "Day 2", etc.
  };
}

export interface MealPlanAPIResponse {
  message: string;
  data: MealPlanData;
}

// ============= FLAVOR DB TYPES =============
export interface FlavorCompound {
  id: string;
  name: string;
  commonName?: string;
  flavorProfile?: string[];
  naturalSource?: string[];
  category?: string;
}

// ============= RECIPE API SERVICE =============
export const RecipeAPIService = {
  // Get all recipes with pagination
  getAllRecipes: async (page: number = 1, limit: number = 50): Promise<FoodoscopeRecipe[]> => {
    try {
      const response: RecipeAPIResponse = await foodoscopeFetch(
        RECIPE_API_BASE,
        "/recipe/all-recipes",
        { page, limit }
      );
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("[Recipe API] Error fetching all recipes:", error);
      return [];
    }
  },

  // Get recipe by ID
  getRecipeById: async (recipeId: string): Promise<FoodoscopeRecipe | null> => {
    try {
      const response: RecipeAPIResponse = await foodoscopeFetch(
        RECIPE_API_BASE,
        `/recipe/recipe-by-id/${recipeId}`
      );
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data[0] : data;
      }
      
      return null;
    } catch (error) {
      console.error("[Recipe API] Error fetching recipe by ID:", error);
      return null;
    }
  },

  // Search recipes by title
  searchByTitle: async (title: string): Promise<FoodoscopeRecipe[]> => {
    try {
      const response: RecipeAPIResponse = await foodoscopeFetch(
        RECIPE_API_BASE,
        "/recipe/search-by-title",
        { title }
      );
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      // Silently handle 400 errors - search term might not exist
      return [];
    }
  },

  // Get vegetarian recipes
  getVegetarianRecipes: async (): Promise<FoodoscopeRecipe[]> => {
    try {
      const response: RecipeAPIResponse = await foodoscopeFetch(
        RECIPE_API_BASE,
        "/recipe/vegetarian-recipes"
      );
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("[Recipe API] Error fetching vegetarian recipes:", error);
      return [];
    }
  },

  // Get vegan recipes
  getVeganRecipes: async (): Promise<FoodoscopeRecipe[]> => {
    try {
      const response: RecipeAPIResponse = await foodoscopeFetch(
        RECIPE_API_BASE,
        "/recipe/vegan-recipes"
      );
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("[Recipe API] Error fetching vegan recipes:", error);
      return [];
    }
  },

  // Get recipes by region
  getRecipesByRegion: async (region: string): Promise<FoodoscopeRecipe[]> => {
    try {
      const response: RecipeAPIResponse = await foodoscopeFetch(
        RECIPE_API_BASE,
        "/recipe/recipes-by-region",
        { region }
      );
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      // Silently handle 400 errors - region might not exist
      return [];
    }
  },
};

// ============= MEAL PLAN API SERVICE =============
export const MealPlanAPIService = {
  // Generate meal plan
  generateMealPlan: async (
    dietType: "vegan" | "vegetarian" | "pescetarian" | "keto" | "paleo" = "vegan",
    days: number = 7,
    excludeIngredients: string[] = []
  ): Promise<MealPlanData | null> => {
    try {
      const params: Record<string, any> = {
        diet_type: dietType,
        days: days.toString(),
      };
      
      if (excludeIngredients.length > 0) {
        params.exclude_ingredients = excludeIngredients.join(",");
      }
      
      const response: MealPlanAPIResponse = await foodoscopeFetch(
        MEAL_PLAN_API_BASE,
        "/meal-plan/generate",
        params
      );
      
      if (response.data) {
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error("[Meal Plan API] Error generating meal plan:", error);
      return null;
    }
  },
};

// ============= FLAVOR DB API SERVICE =============
export const FlavorAPIService = {
  // Search by common name
  searchByCommonName: async (name: string): Promise<FlavorCompound[]> => {
    try {
      const response = await foodoscopeFetch(
        FLAVOR_API_BASE,
        "/properties/by-commonName",
        { name }
      );
      
      return response || [];
    } catch (error) {
      console.error("[Flavor API] Error searching by common name:", error);
      return [];
    }
  },

  // Get compound by ID
  getCompoundById: async (id: string): Promise<FlavorCompound | null> => {
    try {
      const response = await foodoscopeFetch(
        FLAVOR_API_BASE,
        `/compounds/${id}`
      );
      
      return response || null;
    } catch (error) {
      console.error("[Flavor API] Error fetching compound by ID:", error);
      return null;
    }
  },

  // Search compounds
  searchCompounds: async (query: string): Promise<FlavorCompound[]> => {
    try {
      const response = await foodoscopeFetch(
        FLAVOR_API_BASE,
        "/search",
        { q: query }
      );
      
      return response || [];
    } catch (error) {
      console.error("[Flavor API] Error searching compounds:", error);
      return [];
    }
  },
};

export default {
  RecipeAPIService,
  MealPlanAPIService,
  FlavorAPIService,
};
