import { PersonalizedRecipe, UserProfile, PranicValue, FastFoodSubstitution, ScannedRecipeGeneration } from "../types";

// AI-Powered Meal Planning Service
export const AIMealPlannerService = {
  // Generate personalized meal based on user profile
  generatePersonalizedMeal: async (
    userProfile: UserProfile,
    mealType: "breakfast" | "lunch" | "dinner" | "snack" | "post_yoga"
  ): Promise<PersonalizedRecipe> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const recipes = getPersonalizedRecipes(userProfile, mealType);
    return recipes[0];
  },

  // Generate fast food substitution
  generateFastFoodSubstitution: async (
    fastFoodName: string
  ): Promise<FastFoodSubstitution> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const substitutions = FAST_FOOD_SUBSTITUTIONS[fastFoodName.toLowerCase()] || 
                          FAST_FOOD_SUBSTITUTIONS["default"];
    
    return substitutions;
  },

  // Generate recipes from scanned ingredients
  generateRecipeFromScannedItems: async (
    scannedItems: string[]
  ): Promise<ScannedRecipeGeneration> => {
    await new Promise(resolve => setTimeout(resolve, 1200));

    return generateRecipesFromIngredients(scannedItems);
  },

  // Get mood-balancing spices
  getMoodBalancingSpices: (mood: string): string[] => {
    const spiceMap: Record<string, string[]> = {
      anxious: ["Fennel", "Cardamom", "Coriander", "Mint"],
      lethargic: ["Ginger", "Black Pepper", "Cinnamon", "Turmeric"],
      stressed: ["Ashwagandha", "Tulsi", "Brahmi", "Saffron"],
      balanced: ["Cumin", "Turmeric", "Coriander", "Cardamom"],
      energetic: ["Fennel", "Cumin", "Coriander", "Mint"],
    };
    return spiceMap[mood] || spiceMap.balanced;
  },

  // Calculate Pranic Score
  calculatePranicScore: (ingredients: string[]): PranicValue => {
    let score = 10;
    let freshness: PranicValue["freshness"] = "very_fresh";
    let energyType: PranicValue["energyType"] = "neutral";

    // Reduce score for processed items
    const processedKeywords = ["canned", "packaged", "frozen", "refined"];
    ingredients.forEach(ing => {
      if (processedKeywords.some(kw => ing.toLowerCase().includes(kw))) {
        score -= 2;
        freshness = "processed";
      }
    });

    // Check for cooling/warming ingredients
    const coolingIngredients = ["cucumber", "mint", "fennel", "coconut", "coriander"];
    const warmingIngredients = ["ginger", "pepper", "cinnamon", "cumin"];

    const hasCooling = ingredients.some(ing => 
      coolingIngredients.some(ci => ing.toLowerCase().includes(ci))
    );
    const hasWarming = ingredients.some(ing => 
      warmingIngredients.some(wi => ing.toLowerCase().includes(wi))
    );

    if (hasCooling && !hasWarming) energyType = "cooling";
    else if (hasWarming && !hasCooling) energyType = "warming";

    return {
      score: Math.max(1, Math.min(10, score)),
      explanation: `High life-force energy from fresh, whole ingredients. ${
        energyType === "cooling" ? "Cooling properties calm the mind." :
        energyType === "warming" ? "Warming properties energize the body." :
        "Balanced energy for overall wellness."
      }`,
      freshness,
      energyType,
    };
  },
};

// Personalized Recipe Database
function getPersonalizedRecipes(profile: UserProfile, mealType: string): PersonalizedRecipe[] {
  const baseRecipes: Record<string, any> = {
    weight_loss_breakfast: {
      id: "ai_wl_breakfast_001",
      name: "Pranic Sprout Bowl with Quinoa",
      description: "High-protein, low-calorie breakfast designed for sustainable weight loss while maintaining high energy levels.",
      cuisine: "Sattvic Fusion",
      category: "Breakfast",
      prepTime: 10,
      cookTime: 15,
      servings: 1,
      ingredients: [
        { item: "Quinoa", quantity: "1/2 cup", isForbidden: false },
        { item: "Mixed sprouts (moong, chana)", quantity: "1 cup", isForbidden: false },
        { item: "Cucumber", quantity: "1/2 cup diced", isForbidden: false },
        { item: "Tomato", quantity: "1 small diced", isForbidden: false },
        { item: "Lemon juice", quantity: "1 tbsp", isForbidden: false },
        { item: "Rock salt", quantity: "to taste", isForbidden: false },
        { item: "Cumin powder", quantity: "1/2 tsp", isForbidden: false },
        { item: "Fresh coriander", quantity: "2 tbsp", isForbidden: false },
        { item: "Ginger", quantity: "1/2 inch grated", isForbidden: false },
      ],
      instructions: [
        "Cook quinoa in water until fluffy (12-15 minutes). Let it cool.",
        "Steam sprouts lightly for 3-4 minutes to enhance digestibility.",
        "Mix quinoa, sprouts, cucumber, and tomato in a bowl.",
        "Add lemon juice, rock salt, cumin powder, and grated ginger.",
        "Garnish with fresh coriander.",
        "Eat mindfully, chewing each bite 20-30 times.",
      ],
      nutrition: { calories: 285, protein: 14, carbs: 48, fat: 4, fiber: 8, pranaScore: 9 },
      sattvicStatus: "pure",
      tags: ["weight-loss", "high-protein", "breakfast", "pranic"],
      pranicValue: {
        score: 9,
        explanation: "Extremely high prana from fresh sprouts and raw vegetables. Quinoa provides sustained energy without heaviness.",
        freshness: "very_fresh",
        energyType: "cooling",
      },
      mindfulnessTip: "Chew slowly and observe the natural sweetness of quinoa and the crisp texture of sprouts awakening your senses.",
      moodBalance: profile.currentMood === "lethargic" 
        ? "Ginger and cumin provide gentle warming energy to combat lethargy"
        : "Cooling cucumber and lemon balance any excess heat or anxiety",
      chakraAlignment: "Solar Plexus (Manipura) - Enhances willpower and metabolism",
      bestTimeToEat: "6:00 AM - 8:00 AM",
      seasonalNote: "Perfect for all seasons, especially summer",
    },
    muscle_gain_lunch: {
      id: "ai_mg_lunch_001",
      name: "Warrior's Protein Power Bowl",
      description: "High-protein Sattvic meal designed for muscle building and recovery, perfect for active individuals and athletes.",
      cuisine: "Sattvic Power",
      category: "Lunch",
      prepTime: 15,
      cookTime: 25,
      servings: 1,
      ingredients: [
        { item: "Paneer (cottage cheese)", quantity: "150g cubed", isForbidden: false },
        { item: "Chickpeas (boiled)", quantity: "1 cup", isForbidden: false },
        { item: "Quinoa", quantity: "3/4 cup cooked", isForbidden: false },
        { item: "Spinach", quantity: "2 cups", isForbidden: false },
        { item: "Sweet potato", quantity: "1 medium cubed", isForbidden: false },
        { item: "Almonds", quantity: "10 pieces", isForbidden: false },
        { item: "Ghee", quantity: "1 tbsp", isForbidden: false },
        { item: "Cumin seeds", quantity: "1 tsp", isForbidden: false },
        { item: "Turmeric", quantity: "1/2 tsp", isForbidden: false },
        { item: "Black pepper", quantity: "1/4 tsp", isForbidden: false },
        { item: "Rock salt", quantity: "to taste", isForbidden: false },
      ],
      instructions: [
        "Roast sweet potato cubes with 1/2 tbsp ghee until golden.",
        "Heat remaining ghee, add cumin seeds until they crackle.",
        "Add paneer cubes and sauté until lightly golden.",
        "Add chickpeas, turmeric, black pepper, and salt. Mix well.",
        "Add spinach and cook until wilted.",
        "Serve over quinoa, topped with roasted sweet potato and crushed almonds.",
        "Consume within 30 minutes post-workout for optimal muscle recovery.",
      ],
      nutrition: { calories: 685, protein: 42, carbs: 68, fat: 24, fiber: 14, pranaScore: 8 },
      sattvicStatus: "pure",
      tags: ["muscle-gain", "high-protein", "lunch", "post-workout"],
      pranicValue: {
        score: 8,
        explanation: "High prana from fresh paneer and vegetables. Complex carbs provide sustained energy for muscle recovery.",
        freshness: "fresh",
        energyType: "warming",
      },
      mindfulnessTip: "Visualize the protein nourishing your muscles as you eat, feeling gratitude for your body's strength.",
      moodBalance: "Black pepper and turmeric provide warming energy and anti-inflammatory benefits for muscle recovery",
      chakraAlignment: "Root (Muladhara) & Sacral (Svadhisthana) - Builds physical strength and vitality",
      bestTimeToEat: "12:00 PM - 2:00 PM or post-workout",
      seasonalNote: "Ideal for winter and post-exercise recovery",
    },
    mental_clarity_snack: {
      id: "ai_mc_snack_001",
      name: "Brahmi Bliss Energy Balls",
      description: "Brain-boosting snack with adaptogens and healthy fats to enhance focus, memory, and mental clarity.",
      cuisine: "Sattvic Wellness",
      category: "Snack",
      prepTime: 15,
      cookTime: 0,
      servings: 6,
      ingredients: [
        { item: "Dates (pitted)", quantity: "1 cup", isForbidden: false },
        { item: "Almonds", quantity: "1/2 cup", isForbidden: false },
        { item: "Walnuts", quantity: "1/2 cup", isForbidden: false },
        { item: "Brahmi powder", quantity: "1 tsp", isForbidden: false },
        { item: "Ashwagandha powder", quantity: "1/2 tsp", isForbidden: false },
        { item: "Cardamom powder", quantity: "1/4 tsp", isForbidden: false },
        { item: "Coconut oil", quantity: "1 tbsp", isForbidden: false },
        { item: "Sesame seeds", quantity: "2 tbsp", isForbidden: false },
        { item: "Saffron strands", quantity: "few", isForbidden: false },
      ],
      instructions: [
        "Soak dates in warm water for 10 minutes, then drain.",
        "Blend almonds and walnuts into a coarse powder.",
        "Add dates, brahmi, ashwagandha, cardamom, and coconut oil. Blend until sticky.",
        "Roll mixture into small balls (about 1 inch diameter).",
        "Roll balls in sesame seeds to coat.",
        "Garnish with saffron strands.",
        "Store in refrigerator for up to 2 weeks.",
      ],
      nutrition: { calories: 180, protein: 5, carbs: 18, fat: 11, fiber: 3, pranaScore: 9 },
      sattvicStatus: "pure",
      tags: ["mental-clarity", "brain-food", "snack", "adaptogen"],
      pranicValue: {
        score: 9,
        explanation: "Extremely high prana from raw nuts, dates, and adaptogenic herbs. Brahmi enhances cognitive function.",
        freshness: "very_fresh",
        energyType: "neutral",
      },
      mindfulnessTip: "Eat one ball slowly, letting it melt in your mouth while focusing on your breath and mental clarity.",
      moodBalance: "Ashwagandha reduces stress and anxiety while Brahmi enhances focus and memory",
      chakraAlignment: "Third Eye (Ajna) - Enhances intuition and mental clarity",
      bestTimeToEat: "3:00 PM - 5:00 PM or before meditation",
      seasonalNote: "Perfect year-round, especially during exam season",
    },
  };

  // Select recipe based on goal and meal type
  const key = `${profile.goal}_${mealType}`;
  const recipe = baseRecipes[key] || baseRecipes.mental_clarity_snack;

  // Adjust spices based on mood
  if (profile.currentMood) {
    const moodSpices = AIMealPlannerService.getMoodBalancingSpices(profile.currentMood);
    recipe.moodBalance = `Includes ${moodSpices.join(", ")} to balance ${profile.currentMood} state`;
  }

  return [recipe as PersonalizedRecipe];
}

// Fast Food Substitution Database
const FAST_FOOD_SUBSTITUTIONS: Record<string, FastFoodSubstitution> = {
  "burger": {
    originalFood: "Fast Food Burger",
    sattvicAlternative: {
      id: "sub_burger_001",
      name: "Sattvic Veggie Tikki Burger",
      description: "Wholesome burger with homemade tikki, fresh vegetables, and mint chutney - all the taste, none of the guilt!",
      cuisine: "Sattvic Fusion",
      category: "Main Course",
      prepTime: 20,
      cookTime: 15,
      servings: 2,
      ingredients: [
        { item: "Whole wheat buns", quantity: "2", isForbidden: false },
        { item: "Boiled potatoes", quantity: "2 large", isForbidden: false },
        { item: "Green peas (boiled)", quantity: "1/2 cup", isForbidden: false },
        { item: "Paneer (grated)", quantity: "1/4 cup", isForbidden: false },
        { item: "Oats powder", quantity: "2 tbsp", isForbidden: false },
        { item: "Cumin powder", quantity: "1 tsp", isForbidden: false },
        { item: "Coriander powder", quantity: "1 tsp", isForbidden: false },
        { item: "Ginger", quantity: "1 inch grated", isForbidden: false },
        { item: "Green chili", quantity: "1 chopped", isForbidden: false },
        { item: "Lettuce", quantity: "4 leaves", isForbidden: false },
        { item: "Tomato", quantity: "1 sliced", isForbidden: false },
        { item: "Cucumber", quantity: "1/2 sliced", isForbidden: false },
        { item: "Mint chutney", quantity: "4 tbsp", isForbidden: false },
        { item: "Ghee", quantity: "2 tsp", isForbidden: false },
      ],
      instructions: [
        "Mash potatoes and peas together. Add grated paneer, oats, spices, ginger, and green chili.",
        "Form into 2 patties and shallow fry in ghee until golden on both sides.",
        "Toast whole wheat buns lightly.",
        "Spread mint chutney on buns.",
        "Layer lettuce, tikki patty, tomato, and cucumber.",
        "Serve immediately with a side of baked sweet potato fries.",
      ],
      nutrition: { calories: 385, protein: 14, carbs: 58, fat: 12, fiber: 9, pranaScore: 7 },
      sattvicStatus: "pure",
      tags: ["fast-food-sub", "burger", "healthy"],
      pranicValue: {
        score: 7,
        explanation: "Good prana from fresh vegetables and whole grains. Homemade preparation preserves life force.",
        freshness: "fresh",
        energyType: "neutral",
      },
      mindfulnessTip: "Take small bites and appreciate the crunch of fresh vegetables and the warmth of spices.",
      moodBalance: "Balanced meal that satisfies cravings while maintaining mental clarity",
      chakraAlignment: "All chakras - Balanced nutrition for overall wellness",
      bestTimeToEat: "Lunch or early dinner",
    } as PersonalizedRecipe,
    tasteMatch: 85,
    healthImprovement: [
      "70% less saturated fat",
      "No trans fats or preservatives",
      "3x more fiber",
      "Rich in vitamins from fresh vegetables",
      "No artificial additives or MSG",
    ],
    calorieReduction: 315,
    nutritionComparison: {
      original: { calories: 700, protein: 25, carbs: 52, fat: 42 },
      sattvic: { calories: 385, protein: 14, carbs: 58, fat: 12 },
    },
  },
  "pizza": {
    originalFood: "Fast Food Pizza",
    sattvicAlternative: {
      id: "sub_pizza_001",
      name: "Sattvic Whole Wheat Veggie Pizza",
      description: "Homemade pizza with whole wheat base, fresh vegetables, and paneer - guilt-free indulgence!",
      cuisine: "Sattvic Italian",
      category: "Main Course",
      prepTime: 30,
      cookTime: 20,
      servings: 2,
      ingredients: [
        { item: "Whole wheat flour", quantity: "2 cups", isForbidden: false },
        { item: "Yeast", quantity: "1 tsp", isForbidden: false },
        { item: "Warm water", quantity: "3/4 cup", isForbidden: false },
        { item: "Olive oil", quantity: "2 tbsp", isForbidden: false },
        { item: "Tomato puree", quantity: "1 cup", isForbidden: false },
        { item: "Paneer (grated)", quantity: "1 cup", isForbidden: false },
        { item: "Bell peppers", quantity: "1 cup sliced", isForbidden: false },
        { item: "Tomatoes", quantity: "1 cup sliced", isForbidden: false },
        { item: "Olives", quantity: "1/4 cup", isForbidden: false },
        { item: "Basil leaves", quantity: "handful", isForbidden: false },
        { item: "Oregano", quantity: "1 tsp", isForbidden: false },
        { item: "Rock salt", quantity: "to taste", isForbidden: false },
      ],
      instructions: [
        "Mix flour, yeast, salt, and warm water. Knead into soft dough. Let rise for 1 hour.",
        "Roll dough into pizza base.",
        "Spread tomato puree, sprinkle oregano.",
        "Top with bell peppers, tomatoes, olives, and grated paneer.",
        "Bake at 200°C for 15-20 minutes until crust is golden.",
        "Garnish with fresh basil leaves.",
      ],
      nutrition: { calories: 420, protein: 18, carbs: 62, fat: 14, fiber: 10, pranaScore: 7 },
      sattvicStatus: "pure",
      tags: ["fast-food-sub", "pizza", "italian"],
      pranicValue: {
        score: 7,
        explanation: "Good prana from whole wheat and fresh vegetables. Homemade preparation ensures quality.",
        freshness: "fresh",
        energyType: "warming",
      },
      mindfulnessTip: "Savor each bite, noticing the blend of herbs and the satisfaction of homemade food.",
      moodBalance: "Comforting yet light, perfect for social gatherings",
      chakraAlignment: "Heart (Anahata) - Sharing food with loved ones",
    } as PersonalizedRecipe,
    tasteMatch: 80,
    healthImprovement: [
      "60% less calories",
      "No processed cheese",
      "Whole grain base for sustained energy",
      "Fresh vegetables add vitamins",
      "No artificial flavors or preservatives",
    ],
    calorieReduction: 480,
    nutritionComparison: {
      original: { calories: 900, protein: 32, carbs: 88, fat: 38 },
      sattvic: { calories: 420, protein: 18, carbs: 62, fat: 14 },
    },
  },
  "default": {
    originalFood: "Fast Food Item",
    sattvicAlternative: {
      id: "sub_default_001",
      name: "Sattvic Wholesome Bowl",
      description: "A balanced, nutritious meal that satisfies cravings while nourishing body and soul.",
      cuisine: "Sattvic",
      category: "Main Course",
      prepTime: 15,
      cookTime: 20,
      servings: 1,
      ingredients: [
        { item: "Brown rice", quantity: "1 cup cooked", isForbidden: false },
        { item: "Mixed vegetables", quantity: "2 cups", isForbidden: false },
        { item: "Paneer", quantity: "100g", isForbidden: false },
        { item: "Ghee", quantity: "1 tbsp", isForbidden: false },
      ],
      instructions: [
        "Cook brown rice until fluffy.",
        "Sauté vegetables and paneer in ghee with mild spices.",
        "Serve vegetables over rice.",
      ],
      nutrition: { calories: 450, protein: 20, carbs: 55, fat: 16, fiber: 8, pranaScore: 8 },
      sattvicStatus: "pure",
      tags: ["healthy", "balanced"],
      pranicValue: {
        score: 8,
        explanation: "High prana from fresh, whole ingredients.",
        freshness: "fresh",
        energyType: "neutral",
      },
      mindfulnessTip: "Eat slowly and appreciate the natural flavors.",
      moodBalance: "Balanced and nourishing",
    } as PersonalizedRecipe,
    tasteMatch: 75,
    healthImprovement: ["Lower calories", "No preservatives", "Fresh ingredients"],
    calorieReduction: 250,
    nutritionComparison: {
      original: { calories: 700, protein: 20, carbs: 70, fat: 35 },
      sattvic: { calories: 450, protein: 20, carbs: 55, fat: 16 },
    },
  },
};

// Generate recipes from scanned ingredients
function generateRecipesFromIngredients(scannedItems: string[]): ScannedRecipeGeneration {
  const normalizedItems = scannedItems.map(item => item.toLowerCase());
  
  // Check what we have
  const hasProtein = normalizedItems.some(item => 
    ["paneer", "dal", "chickpeas", "lentils", "tofu"].some(p => item.includes(p))
  );
  const hasGrains = normalizedItems.some(item => 
    ["rice", "quinoa", "wheat", "oats"].some(g => item.includes(g))
  );
  const hasVegetables = normalizedItems.some(item => 
    ["potato", "tomato", "spinach", "carrot", "peas"].some(v => item.includes(v))
  );

  const suggestedRecipes: PersonalizedRecipe[] = [];

  // Recipe 1: If we have basic ingredients
  if (hasProtein && hasGrains && hasVegetables) {
    suggestedRecipes.push({
      id: "scan_recipe_001",
      name: "Quick Sattvic Bowl",
      description: "A nourishing bowl made from your scanned ingredients",
      cuisine: "Sattvic",
      category: "Main Course",
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      ingredients: scannedItems.map(item => ({
        item,
        quantity: "as available",
        isForbidden: false,
      })),
      instructions: [
        "Prepare your grain (rice/quinoa) as base.",
        "Sauté vegetables with cumin and turmeric.",
        "Add protein source and cook until done.",
        "Season with rock salt and fresh herbs.",
        "Serve hot with a squeeze of lemon.",
      ],
      nutrition: { calories: 380, protein: 16, carbs: 52, fat: 10, fiber: 8, pranaScore: 8 },
      sattvicStatus: "pure",
      tags: ["quick", "scanned-recipe"],
      pranicValue: {
        score: 8,
        explanation: "Fresh ingredients maintain high life force energy.",
        freshness: "fresh",
        energyType: "neutral",
      },
      mindfulnessTip: "Appreciate the journey of these ingredients from nature to your plate.",
      moodBalance: "Balanced and satisfying",
      chakraAlignment: "All chakras - Complete nutrition",
      bestTimeToEat: "Lunch or Dinner",
    } as PersonalizedRecipe);
  }

  // Recipe 2: Simple preparation
  suggestedRecipes.push({
    id: "scan_recipe_002",
    name: "Pranic Stir-Fry",
    description: "Quick stir-fry maximizing the prana of your ingredients",
    cuisine: "Sattvic",
    category: "Main Course",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    ingredients: scannedItems.map(item => ({
      item,
      quantity: "as available",
      isForbidden: false,
    })),
    instructions: [
      "Heat ghee in a pan.",
      "Add cumin seeds and let them crackle.",
      "Add all vegetables and stir-fry on high heat.",
      "Add minimal spices to preserve prana.",
      "Serve immediately for maximum freshness.",
    ],
    nutrition: { calories: 220, protein: 8, carbs: 32, fat: 8, fiber: 6, pranaScore: 9 },
    sattvicStatus: "pure",
    tags: ["quick", "high-prana"],
    pranicValue: {
      score: 9,
      explanation: "Minimal cooking preserves maximum life force.",
      freshness: "very_fresh",
      energyType: "neutral",
    },
    mindfulnessTip: "Eat within 15 minutes of cooking to absorb maximum prana.",
    moodBalance: "Light and energizing",
    chakraAlignment: "Solar Plexus - Digestive fire",
    bestTimeToEat: "Lunch",
  } as PersonalizedRecipe);

  const missingIngredients: string[] = [];
  if (!hasProtein) missingIngredients.push("Protein source (paneer, dal, chickpeas)");
  if (!hasGrains) missingIngredients.push("Grain (rice, quinoa, wheat)");
  if (!hasVegetables) missingIngredients.push("Fresh vegetables");

  return {
    scannedItems,
    suggestedRecipes,
    missingIngredients: missingIngredients.length > 0 ? missingIngredients : undefined,
    preparationTime: 30,
    difficulty: "easy",
  };
}

export default AIMealPlannerService;
