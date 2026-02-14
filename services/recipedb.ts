import { Recipe } from "../types";
import { RecipeAPIService, FoodoscopeRecipe } from "./foodoscope-api";
import mockRecipesData from "./mock-recipes.json";

// Cast mock data to FoodoscopeRecipe array
const MOCK_RECIPES = mockRecipesData as FoodoscopeRecipe[];

// Helper function to convert Foodoscope API format to our Recipe type
function convertFoodoscopeToRecipe(apiRecipe: FoodoscopeRecipe): Recipe {
  // Parse numeric values safely
  const parseNumber = (value: string | undefined, defaultValue: number = 0): number => {
    if (!value) return defaultValue;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Check for forbidden ingredients (onion, garlic, meat, etc.)
  const forbiddenKeywords = ["onion", "garlic", "shallot", "leek", "chive", "meat", "chicken", "beef", "pork", "fish", "egg"];
  
  // Convert ingredients
  const ingredients = (apiRecipe.ingredients || []).map(ing => {
    const isForbidden = forbiddenKeywords.some(keyword => 
      ing.ingredient.toLowerCase().includes(keyword)
    );
    
    return {
      item: ing.ingredient,
      quantity: ing.phrase || `${ing.quantity || ''} ${ing.unit || ''}`.trim(),
      isForbidden,
      substitute: isForbidden ? "See Sattvic substitution guide" : undefined,
    };
  });

  // Parse utensils and processes for instructions
  const processes = apiRecipe.Processes?.split("||").filter(Boolean) || [];
  const instructions = processes.length > 0
    ? processes.map((process, idx) => 
        `Step ${idx + 1}: ${process.charAt(0).toUpperCase() + process.slice(1)} the ingredients as needed.`
      )
    : ["Follow the recipe instructions from the source."];

  // Determine if recipe is vegetarian/vegan
  const isVegan = apiRecipe.vegan === "1.0" || apiRecipe.vegan === "1";
  const isVegetarian = apiRecipe.ovo_lacto_vegetarian === "1.0" || apiRecipe.lacto_vegetarian === "1.0";
  
  // Determine cuisine and category
  const cuisine = apiRecipe.Region || apiRecipe.Sub_region || apiRecipe.Continent || "International";
  const category = isVegan ? "Vegan" : isVegetarian ? "Vegetarian" : "Main Course";

  // Calculate prep and cook times
  const totalTime = parseNumber(apiRecipe.total_time, 45);
  const prepTime = parseNumber(apiRecipe.prep_time, Math.floor(totalTime * 0.3));
  const cookTime = parseNumber(apiRecipe.cook_time, totalTime - prepTime);

  // Check if recipe has forbidden ingredients
  const hasForbidden = ingredients.some(i => i.isForbidden);

  return {
    id: apiRecipe.Recipe_id || apiRecipe._id || `api_${Date.now()}`,
    name: apiRecipe.Recipe_title || "Untitled Recipe",
    description: `Delicious ${cuisine} recipe. ${isVegan ? 'Vegan-friendly.' : isVegetarian ? 'Vegetarian-friendly.' : ''} ${hasForbidden ? 'Contains ingredients that need Sattvic substitution.' : 'Sattvic-compliant.'}`,
    cuisine,
    category,
    prepTime,
    cookTime,
    servings: parseNumber(apiRecipe.servings, 4),
    ingredients,
    instructions,
    nutrition: {
      calories: parseNumber(apiRecipe["Energy (kcal)"] || apiRecipe.Calories, 0),
      protein: parseNumber(apiRecipe["Protein (g)"], 0),
      carbs: parseNumber(apiRecipe["Carbohydrate, by difference (g)"], 0),
      fat: parseNumber(apiRecipe["Total lipid (fat) (g)"], 0),
    },
    sattvicStatus: hasForbidden ? "modified" : (isVegan || isVegetarian ? "pure" : "modified"),
    tags: [
      cuisine.toLowerCase().replace(/\s+/g, '-'),
      category.toLowerCase(),
      isVegan ? "vegan" : "",
      isVegetarian ? "vegetarian" : "",
      hasForbidden ? "" : "sattvic",
    ].filter(Boolean),
  };
}

// Main RecipeDB Service with real API integration
export const RecipeDBService = {
  // Get all recipes - uses real API only
  getAllRecipes: async (): Promise<Recipe[]> => {
    try {
      const apiRecipes = await RecipeAPIService.getAllRecipes(1, 100);
      
      if (apiRecipes.length === 0) {
        // Fallback to mock recipes if API returns nothing
        console.log("[RecipeDB] API returned no recipes, using mock data");
        return MOCK_RECIPES.map(convertFoodoscopeToRecipe);
      }

      const recipes = apiRecipes.map(apiRecipe => convertFoodoscopeToRecipe(apiRecipe));
      return recipes;
    } catch (error) {
      // Fallback to mock recipes on error
      console.log("[RecipeDB] API error, using mock data");
      return MOCK_RECIPES.map(convertFoodoscopeToRecipe);
    }
  },

  // Get recipe by ID
  getRecipeById: async (id: string): Promise<Recipe | null> => {
    try {
      const apiRecipe = await RecipeAPIService.getRecipeById(id);
      
      if (!apiRecipe) {
        // Check mock recipes
        const mockRecipe = MOCK_RECIPES.find(r => r.Recipe_id === id);
        if (mockRecipe) {
          return convertFoodoscopeToRecipe(mockRecipe);
        }
        return null;
      }
      
      const recipe = convertFoodoscopeToRecipe(apiRecipe);
      return recipe;
    } catch (error) {
      // Check mock recipes on error
      const mockRecipe = MOCK_RECIPES.find(r => r.Recipe_id === id);
      if (mockRecipe) {
        return convertFoodoscopeToRecipe(mockRecipe);
      }
      return null;
    }
  },

  // Search recipes
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    if (!query) {
      return RecipeDBService.getAllRecipes();
    }

    try {
      const searchResults = await RecipeAPIService.searchByTitle(query);
      
      if (searchResults.length === 0) {
        return [];
      }
      
      const recipes = searchResults.map(convertFoodoscopeToRecipe);
      return recipes;
    } catch (error) {
      return [];
    }
  },

  // Get recipes by tag (uses region/diet type)
  getRecipesByTag: async (tag: string): Promise<Recipe[]> => {
    try {
      // Map tags to API calls
      if (tag === "vegetarian") {
        const apiRecipes = await RecipeAPIService.getVegetarianRecipes();
        return apiRecipes.map(convertFoodoscopeToRecipe);
      }
      
      if (tag === "vegan") {
        const apiRecipes = await RecipeAPIService.getVeganRecipes();
        return apiRecipes.map(convertFoodoscopeToRecipe);
      }
      
      // For other tags, just return all recipes and let the UI filter
      // since the API doesn't support custom tags like "navratri", "ekadashi"
      return RecipeDBService.getAllRecipes();
    } catch (error) {
      return [];
    }
  },

  // Get Sattvic-safe recipes (vegetarian/vegan only)
  getSattvicRecipes: async (): Promise<Recipe[]> => {
    try {
      const apiRecipes = await RecipeAPIService.getVegetarianRecipes();
      const recipes = apiRecipes.map(convertFoodoscopeToRecipe);
      
      // Filter out recipes with forbidden ingredients
      return recipes.filter(r => r.sattvicStatus === "pure");
    } catch (error) {
      return [];
    }
  },

  // Check recipe Sattvic status
  checkRecipeSattvicStatus: async (
    recipeId: string
  ): Promise<{
    status: "pure" | "modified" | "forbidden";
    forbiddenIngredients: string[];
    suggestedSubstitutes: string[];
  } | null> => {
    const recipe = await RecipeDBService.getRecipeById(recipeId);
    if (!recipe) return null;

    const forbidden = recipe.ingredients.filter((i) => i.isForbidden);
    const forbiddenNames = forbidden.map((i) => i.item);
    const substitutes = forbidden
      .filter((i) => i.substitute)
      .map((i) => `${i.item} → ${i.substitute}`);

    return {
      status: recipe.sattvicStatus,
      forbiddenIngredients: forbiddenNames,
      suggestedSubstitutes: substitutes,
    };
  },

  // Get recipe of the day (random from API)
  getRecipeOfTheDay: async (): Promise<Recipe | null> => {
    try {
      const allRecipes = await RecipeDBService.getAllRecipes();
      if (allRecipes.length === 0) return null;
      
      const randomIndex = Math.floor(Math.random() * Math.min(allRecipes.length, 20));
      return allRecipes[randomIndex];
    } catch (error) {
      return null;
    }
  },
};
