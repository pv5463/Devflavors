// RecipeDB API Configuration
const RECIPEDB_API_KEY = "vycVFejHYvzkX71rJpoDEvjE6NUY9d3LWd8eE28sdX0Nna28";
const RECIPEDB_BASE_URL = "https://api.foodoscope.com/recipe2-api";

// Fetch wrapper with default config and retry logic
const recipeDBFetch = async (endpoint: string, params?: Record<string, any>, retries: number = 1) => {
  const url = new URL(`${RECIPEDB_BASE_URL}${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key].toString());
      }
    });
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`[RecipeDB API] Fetching: ${endpoint} (attempt ${attempt + 1}/${retries + 1})`);
      if (params) {
        console.log(`[RecipeDB API] Params:`, params);
      }
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": RECIPEDB_API_KEY,
          "x-api-key": RECIPEDB_API_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details');
        console.error(`[RecipeDB API] HTTP ${response.status}:`, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[RecipeDB API] Success: ${endpoint}`, typeof data === 'object' ? `(${Array.isArray(data) ? data.length : Object.keys(data).length} items)` : '');
      return data;
    } catch (error) {
      console.error(`[RecipeDB API] Attempt ${attempt + 1} failed:`, error);
      if (attempt === retries) {
        throw error;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
};

// API Response Types
export interface RecipeDBRecipe {
  id: string;
  title: string;
  cuisine: string;
  category: string;
  cooktime: string;
  preptime: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  ingredients: string[];
  instructions: string[];
  img_url?: string;
  url?: string;
  cholesterol?: number;
  fiber?: number;
  satfat?: number;
  sodium?: number;
  sugar?: number;
}

export interface RecipeDBNutrition {
  calories: number;
  carbs: number;
  cholesterol: number;
  fat: number;
  fiber: number;
  protein: number;
  satfat: number;
  sodium: number;
  sugar: number;
}

export interface RecipeDBSearchResult {
  recipe_id: string;
  title: string;
  cuisine: string;
  category: string;
  calories: number;
  img_url?: string;
}

// API Service
export const RecipeDBAPIService = {
  // Get recipe of the day
  getRecipeOfTheDay: async (): Promise<RecipeDBRecipe | null> => {
    try {
      const data = await recipeDBFetch("/recipe/recipeofday");
      return data;
    } catch (error) {
      console.error("Error fetching recipe of the day:", error);
      return null;
    }
  },

  // Get all recipes info (paginated)
  getAllRecipes: async (page: number = 1, limit: number = 20): Promise<RecipeDBRecipe[]> => {
    try {
      // Try without parameters first, as API might not support pagination
      const data = await recipeDBFetch("/recipe/recipesinfo");
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data.slice(0, limit);
      }
      if (data.recipes && Array.isArray(data.recipes)) {
        return data.recipes.slice(0, limit);
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data.slice(0, limit);
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  },

  // Get recipe by ID
  getRecipeById: async (recipeId: string): Promise<RecipeDBRecipe | null> => {
    try {
      const data = await recipeDBFetch(`/recipe/search-recipe/${recipeId}`);
      return data;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      return null;
    }
  },

  // Get recipe instructions
  getRecipeInstructions: async (recipeId: string): Promise<string[]> => {
    try {
      const data = await recipeDBFetch(`/recipe/instructions/${recipeId}`);
      return data.instructions || [];
    } catch (error) {
      console.error("Error fetching instructions:", error);
      return [];
    }
  },

  // Get recipe nutrition info
  getRecipeNutrition: async (recipeId: string): Promise<RecipeDBNutrition | null> => {
    try {
      const data = await recipeDBFetch("/recipe/nutritioninfo", { recipe_id: recipeId });
      return data;
    } catch (error) {
      console.error("Error fetching nutrition:", error);
      return null;
    }
  },

  // Search recipes by title
  searchByTitle: async (title: string): Promise<RecipeDBSearchResult[]> => {
    try {
      const data = await recipeDBFetch("/recipe/recipeByTitle", { title });
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      }
      if (data.recipes && Array.isArray(data.recipes)) {
        return data.recipes;
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      
      return [];
    } catch (error) {
      console.error("Error searching recipes:", error);
      return [];
    }
  },

  // Get recipes by cuisine
  getRecipesByCuisine: async (cuisine: string): Promise<RecipeDBRecipe[]> => {
    try {
      // Try the path parameter format
      const data = await recipeDBFetch(`/recipe/recipes_cuisine/cuisine/${cuisine}`);
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      }
      if (data.recipes && Array.isArray(data.recipes)) {
        return data.recipes;
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching recipes by cuisine:", error);
      return [];
    }
  },

  // Get recipes by category
  getRecipesByCategory: async (category: string): Promise<RecipeDBRecipe[]> => {
    try {
      // Try different endpoint formats
      let data;
      try {
        // Try with query parameter
        data = await recipeDBFetch("/recipe/category", { category });
      } catch (e) {
        // Try as path parameter
        data = await recipeDBFetch(`/recipe/category/${category}`);
      }
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      }
      if (data.recipes && Array.isArray(data.recipes)) {
        return data.recipes;
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
      return [];
    }
  },
};

export default RecipeDBAPIService;
