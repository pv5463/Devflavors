import { create } from "zustand";
import { Ingredient, Recipe, SubstitutionBlend } from "../types";
import { FlavorDBService } from "../services/flavordb";
import { RecipeDBService } from "../services/recipedb";

interface AppState {
  // Navigation/Flow
  currentScreen: "home" | "scan" | "substitute" | "recipes" | "recipe-detail";
  setCurrentScreen: (screen: AppState["currentScreen"]) => void;

  // Ingredient Scanning
  scannedIngredients: string[];
  addScannedIngredient: (ingredient: string) => void;
  clearScannedIngredients: () => void;

  // Substitution Engine
  selectedForbidden: Ingredient | null;
  setSelectedForbidden: (ingredient: Ingredient | null) => void;
  currentSubstitution: SubstitutionBlend | null;
  setCurrentSubstitution: (substitution: SubstitutionBlend | null) => void;
  isLoadingSubstitution: boolean;
  generateSubstitution: (ingredientId: string) => Promise<void>;

  // Recipe Browser
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  isLoadingRecipes: boolean;
  loadRecipes: () => Promise<void>;
  searchRecipes: (query: string) => Promise<void>;
  filterByTag: (tag: string) => Promise<void>;

  // Favorites
  favorites: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation
  currentScreen: "home",
  setCurrentScreen: (screen) => set({ currentScreen: screen }),

  // Scanning
  scannedIngredients: [],
  addScannedIngredient: (ingredient) =>
    set((state) => ({
      scannedIngredients: [...state.scannedIngredients, ingredient],
    })),
  clearScannedIngredients: () => set({ scannedIngredients: [] }),

  // Substitution
  selectedForbidden: null,
  setSelectedForbidden: (ingredient) => set({ selectedForbidden: ingredient }),
  currentSubstitution: null,
  setCurrentSubstitution: (substitution) =>
    set({ currentSubstitution: substitution }),
  isLoadingSubstitution: false,
  generateSubstitution: async (ingredientId) => {
    set({ isLoadingSubstitution: true });
    try {
      const substitution = await FlavorDBService.getSubstitutes(ingredientId);
      set({ currentSubstitution: substitution });
    } finally {
      set({ isLoadingSubstitution: false });
    }
  },

  // Recipes
  recipes: [],
  filteredRecipes: [],
  selectedRecipe: null,
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeTag: null,
  setActiveTag: (tag) => set({ activeTag: tag }),
  isLoadingRecipes: false,
  loadRecipes: async () => {
    set({ isLoadingRecipes: true });
    try {
      const recipes = await RecipeDBService.getSattvicRecipes();
      set({ recipes, filteredRecipes: recipes });
    } finally {
      set({ isLoadingRecipes: false });
    }
  },
  searchRecipes: async (query) => {
    set({ isLoadingRecipes: true, searchQuery: query });
    try {
      const recipes = query
        ? await RecipeDBService.searchRecipes(query)
        : await RecipeDBService.getSattvicRecipes();
      set({ filteredRecipes: recipes });
    } finally {
      set({ isLoadingRecipes: false });
    }
  },
  filterByTag: async (tag) => {
    set({ isLoadingRecipes: true, activeTag: tag });
    try {
      const recipes = await RecipeDBService.getRecipesByTag(tag);
      set({ filteredRecipes: recipes });
    } finally {
      set({ isLoadingRecipes: false });
    }
  },

  // Favorites
  favorites: [],
  toggleFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites.filter((id) => id !== recipeId)
        : [...state.favorites, recipeId],
    })),
  isFavorite: (recipeId) => get().favorites.includes(recipeId),
}));
