// RecipeDB API Configuration
const RECIPEDB_API_KEY = "vycVFejHYvzkX71rJpoDEvjE6NUY9d3LWd8eE28sdX0Nna28";
const RECIPEDB_BASE_URL = "https://api.foodoscope.com/recipe2-api";

// Fetch wrapper with default config and comprehensive error handling
const recipeDBFetch = async (endpoint: string, params?: Record<string, any>, retries: number = 0) => {
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
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": RECIPEDB_API_KEY,
          "x-api-key": RECIPEDB_API_KEY,
        },
      });

      if (!response.ok) {
        // Don't retry on 400 errors (bad request)
        if (response.status === 400) {
          throw new Error(`Bad Request: ${endpoint}`);
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Don't retry on 400 errors
      if (error instanceof Error && error.message.includes('Bad Request')) {
        throw error;
      }
      
      if (attempt === retries) {
        throw error;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 500));
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
      // This endpoint has issues, skip it
      return null;
    } catch (error) {
      return null;
    }
  },

  // Get all recipes info (paginated)
  getAllRecipes: async (page: number = 1, limit: number = 20): Promise<RecipeDBRecipe[]> => {
    try {
      // Try to search for common terms to get real recipes
      const searchTerms = ['chicken', 'pasta', 'rice', 'curry', 'salad'];
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      
      const searchResults = await RecipeDBAPIService.searchByTitle(randomTerm);
      
      if (searchResults.length > 0) {
        // Convert search results to full recipes
        const recipes: RecipeDBRecipe[] = searchResults.slice(0, limit).map(result => ({
          id: result.recipe_id,
          title: result.title,
          cuisine: result.cuisine,
          category: result.category,
          cooktime: '30',
          preptime: '15',
          calories: result.calories,
          carbs: 0,
          fat: 0,
          protein: 0,
          ingredients: [],
          instructions: [],
          img_url: result.img_url,
        }));
        return recipes;
      }
      
      return [];
    } catch (error) {
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
      // Silently fail and return empty array
      return [];
    }
  },

  // Get recipes by cuisine
  getRecipesByCuisine: async (cuisine: string): Promise<RecipeDBRecipe[]> => {
    try {
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
      // Silently fail and return empty array
      return [];
    }
  },

  // Get recipes by category
  getRecipesByCategory: async (category: string): Promise<RecipeDBRecipe[]> => {
    try {
      // Try as path parameter (more likely to work)
      const data = await recipeDBFetch(`/recipe/category/${category}`);
      
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
      // Silently fail and return empty array
      return [];
    }
  },
};

export default RecipeDBAPIService;
