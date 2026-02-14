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
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

// API Response Types
export interface RecipeDBRecipe {
  _id?: string;
  Recipe_id: string;
  Recipe_title: string;
  Region?: string;
  Sub_region?: string;
  Continent?: string;
  cook_time?: string;
  prep_time?: string;
  total_time?: string;
  servings?: string;
  Calories?: string;
  "Carbohydrate, by difference (g)"?: string;
  "Energy (kcal)"?: string;
  "Protein (g)"?: string;
  "Total lipid (fat) (g)"?: string;
  img_url?: string;
  url?: string;
  Utensils?: string;
  Processes?: string;
  vegan?: string;
  pescetarian?: string;
  ovo_vegetarian?: string;
  lacto_vegetarian?: string;
  ovo_lacto_vegetarian?: string;
}

export interface RecipeDBAPIResponse {
  success: string;
  message: string;
  payload: {
    data: RecipeDBRecipe | RecipeDBRecipe[];
  };
}

// API Service
export const RecipeDBAPIService = {
  // Get all recipes with pagination
  getAllRecipes: async (page: number = 1, limit: number = 50): Promise<RecipeDBRecipe[]> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch("/recipe/all-recipes", { 
        page, 
        limit 
      });
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      return [];
    }
  },

  // Get recipe by ID
  getRecipeById: async (recipeId: string): Promise<RecipeDBRecipe | null> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch(`/recipe/recipe-by-id/${recipeId}`);
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data[0] : data;
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      return null;
    }
  },

  // Search recipes by title
  searchByTitle: async (title: string): Promise<RecipeDBRecipe[]> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch("/recipe/search-by-title", { title });
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("Error searching recipes:", error);
      return [];
    }
  },

  // Get recipes by region
  getRecipesByRegion: async (region: string): Promise<RecipeDBRecipe[]> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch("/recipe/recipes-by-region", { region });
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching recipes by region:", error);
      return [];
    }
  },

  // Get recipes by continent
  getRecipesByContinent: async (continent: string): Promise<RecipeDBRecipe[]> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch("/recipe/recipes-by-continent", { continent });
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching recipes by continent:", error);
      return [];
    }
  },

  // Get vegetarian recipes
  getVegetarianRecipes: async (): Promise<RecipeDBRecipe[]> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch("/recipe/vegetarian-recipes");
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching vegetarian recipes:", error);
      return [];
    }
  },

  // Get vegan recipes
  getVeganRecipes: async (): Promise<RecipeDBRecipe[]> => {
    try {
      const response: RecipeDBAPIResponse = await recipeDBFetch("/recipe/vegan-recipes");
      
      if (response.success === "true" && response.payload?.data) {
        const data = response.payload.data;
        return Array.isArray(data) ? data : [data];
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching vegan recipes:", error);
      return [];
    }
  },
};

export default RecipeDBAPIService;
