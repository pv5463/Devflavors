import { Recipe, MythologicalStory } from "../types";
import { RecipeDBAPIService, RecipeDBRecipe, RecipeDBNutrition } from "./recipedb-api";

// Feature flag to toggle between mock and real API
const USE_REAL_API = true;

// Mythological Stories Database
const MYTHOLOGY_DB: Record<string, MythologicalStory> = {
  sabudana_khichdi: {
    title: "The Divine Food of Lord Shiva",
    deity: "Lord Shiva",
    story: "During the great churning of the ocean (Samudra Manthan), when Lord Shiva consumed the deadly poison Halahala to save the universe, Goddess Parvati offered him Sabudana Khichdi to soothe his burning throat. The cooling properties of tapioca pearls and the purity of rock salt helped neutralize the poison's effects. Since then, Sabudana has been considered a sacred fasting food, blessed by Lord Shiva himself.",
    significance: "Sabudana represents purity and simplicity. Its white color symbolizes the divine light of consciousness, while its ability to provide sustained energy during fasting represents spiritual strength. Consuming this during Mahashivratri connects devotees to Lord Shiva's sacrifice for humanity.",
    ritual: "Prepare Sabudana Khichdi before sunrise on fasting days. Offer it to Lord Shiva with bilva leaves and pure water. Chant 'Om Namah Shivaya' 108 times before consuming.",
    benefits: [
      "Enhances spiritual awareness and meditation depth",
      "Purifies the body and mind for divine connection",
      "Provides sustained energy for long prayer sessions",
      "Balances the throat chakra (Vishuddha)",
      "Promotes mental clarity and focus"
    ]
  },
  singhare_poori: {
    title: "Goddess Durga's Blessed Grain",
    deity: "Goddess Durga",
    story: "Legend says that during Navratri, when Goddess Durga descended to Earth to battle the demon Mahishasura, she blessed the water chestnut (Singhara) growing in sacred ponds. The goddess infused these nuts with divine energy to sustain her devotees during the nine nights of worship. Warriors who consumed Singhara flour gained extraordinary strength and mental clarity to support the goddess in her cosmic battle.",
    significance: "Water chestnuts grow in pure water, symbolizing the purity required during Navratri. Their ability to grow in water represents adaptability and resilience - qualities embodied by Goddess Durga. The flour's cooling nature balances the intense spiritual heat generated during fasting.",
    ritual: "On the first day of Navratri, wash Singhara flour with Ganga jal (holy water). While preparing pooris, chant the Durga Chalisa. Offer the first poori to the goddess before consuming.",
    benefits: [
      "Awakens the divine feminine energy (Shakti)",
      "Strengthens willpower and determination",
      "Enhances courage to face life's challenges",
      "Balances all seven chakras",
      "Protects against negative energies"
    ]
  },
  makhana_kheer: {
    title: "Goddess Lakshmi's Prosperity Offering",
    deity: "Goddess Lakshmi",
    story: "In ancient times, when the gods sought Goddess Lakshmi's blessings for prosperity, she revealed that Makhana (fox nuts) were her favorite offering. These lotus seeds, born from the sacred lotus flower on which she sits, carry her divine essence. Sages discovered that preparing Makhana in milk and sweetening it with jaggery creates a dessert that attracts wealth, health, and happiness. During Ekadashi, offering Makhana Kheer to Lord Vishnu and Goddess Lakshmi ensures their blessings for the entire family.",
    significance: "Makhana grows from the lotus, the seat of Goddess Lakshmi. Each seed represents a blessing of abundance. The white color signifies purity of intentions, while the creamy texture represents the flow of prosperity. Consuming this kheer during fasting opens channels for divine grace.",
    ritual: "Prepare Makhana Kheer on Ekadashi evening. Light a ghee lamp and offer the kheer with tulsi leaves. Recite the Lakshmi Ashtakam before distribution. Share with family and neighbors to multiply blessings.",
    benefits: [
      "Attracts wealth and material prosperity",
      "Enhances mental peace and contentment",
      "Strengthens family bonds and harmony",
      "Improves concentration for spiritual practices",
      "Balances the heart chakra (Anahata)"
    ]
  },
  sattvic_dal: {
    title: "The Sage's Wisdom Food",
    deity: "Sage Vishwamitra",
    story: "Sage Vishwamitra, during his intense penance to become a Brahmarishi, survived on simple moong dal cooked with pure ingredients. The dal's golden color reminded him of divine light, and its easy digestibility allowed him to maintain deep meditation for years. When he finally achieved enlightenment, he blessed moong dal as the perfect food for spiritual seekers. He taught that dal prepared without onion and garlic keeps the mind pure and receptive to higher consciousness.",
    significance: "Yellow moong dal represents the golden light of wisdom (Jnana). Its split form symbolizes the breaking of ego, while its ability to nourish without heaviness represents spiritual sustenance. The dal's protein content supports the body during fasting without disturbing mental clarity.",
    ritual: "Before cooking dal, meditate for 5 minutes holding the dal in your palms. Visualize golden light entering the grains. Cook with pure intentions and offer to your chosen deity before consuming.",
    benefits: [
      "Enhances wisdom and spiritual understanding",
      "Purifies the subtle energy body",
      "Supports long meditation sessions",
      "Balances the solar plexus chakra (Manipura)",
      "Promotes emotional stability and peace"
    ]
  },
  aloo_jeera: {
    title: "Lord Krishna's Favorite Simple Meal",
    deity: "Lord Krishna",
    story: "When Lord Krishna lived in Vrindavan, Mother Yashoda would prepare simple Aloo Jeera for him using potatoes from their garden and cumin from the fields. Krishna loved this dish because it reminded him of the earth's bounty and the simple joys of life. He once said that elaborate dishes feed only the body, but simple, pure food prepared with love feeds the soul. During his teachings in the Bhagavad Gita, he emphasized that Sattvic food like Aloo Jeera promotes clarity, strength, and spiritual growth.",
    significance: "Potatoes grow underground, symbolizing humility and groundedness. Cumin seeds represent the tiny but powerful nature of devotion. Together, they create a dish that nourishes while keeping one connected to earthly wisdom and divine love.",
    ritual: "While preparing Aloo Jeera, sing bhajans or chant Krishna's names. Offer the first serving to Krishna's image with tulsi leaves. Share the meal with others to spread Krishna's love.",
    benefits: [
      "Promotes humility and gratitude",
      "Grounds spiritual energy in daily life",
      "Enhances devotion and bhakti",
      "Balances the root chakra (Muladhara)",
      "Brings joy and contentment"
    ]
  },
  paneer_bhurji: {
    title: "The Protein of the Himalayas",
    deity: "Lord Shiva (as Bholenath)",
    story: "In the Himalayan regions where Lord Shiva meditated, yogis discovered that paneer (cottage cheese) provided the perfect protein for maintaining physical strength during intense spiritual practices. The bhurji (scrambled) form was created by wandering sadhus who needed quick, nourishing meals. They learned to prepare it without onion and garlic to maintain their meditative state. Lord Shiva blessed this preparation, making it a favorite among spiritual seekers in the mountains.",
    significance: "Paneer's white color represents purity and the snow-capped Himalayas where Shiva resides. Its high protein content supports the physical body during spiritual austerities. The scrambled form represents the breaking down of ego and material attachments.",
    ritual: "Prepare Paneer Bhurji with mindfulness, treating each ingredient as sacred. Offer to Shiva with bael leaves. Consume while maintaining silence to honor the meditative quality of the dish.",
    benefits: [
      "Builds physical strength for spiritual practices",
      "Enhances endurance during fasting",
      "Supports muscle health for yoga and meditation",
      "Balances the sacral chakra (Svadhisthana)",
      "Promotes inner peace and stability"
    ]
  }
};

// Mock Recipe Database with Sattvic modifications (fallback)
const RECIPE_DB: Recipe[] = [
  {
    id: "rec_001",
    name: "Aloo Jeera (Cumin Potatoes)",
    description:
      "Classic Indian comfort food with crispy cumin-crusted potatoes. Traditional recipe calls for onion and garlic, but this version uses hing and extra cumin for the same aromatic base.",
    cuisine: "North Indian",
    category: "Main Course",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    ingredients: [
      { item: "Potatoes", quantity: "500g", isForbidden: false },
      { item: "Onion", quantity: "1 large", isForbidden: true, substitute: "Asafoetida (pinch) + 2 tbsp Cumin" },
      { item: "Garlic", quantity: "3 cloves", isForbidden: true, substitute: "1/2 tsp Ginger paste + pinch of Hing" },
      { item: "Cumin seeds", quantity: "2 tbsp", isForbidden: false },
      { item: "Asafoetida (Hing)", quantity: "1/4 tsp", isForbidden: false },
      { item: "Turmeric", quantity: "1/2 tsp", isForbidden: false },
      { item: "Green chilies", quantity: "2", isForbidden: false },
      { item: "Coriander powder", quantity: "1 tsp", isForbidden: false },
      { item: "Fresh coriander", quantity: "handful", isForbidden: false },
      { item: "Oil", quantity: "3 tbsp", isForbidden: false },
      { item: "Salt", quantity: "to taste", isForbidden: false },
    ],
    instructions: [
      "Boil potatoes until 80% cooked, peel and cube into 1-inch pieces.",
      "Heat oil in a wide pan. Add cumin seeds and let them crackle.",
      "Add asafoetida and immediately add potatoes. Sauté on medium-high heat.",
      "Add turmeric, coriander powder, and salt. Mix well.",
      "Cook until potatoes are golden and crispy on edges (8-10 minutes).",
      "Garnish with fresh coriander and serve hot.",
    ],
    nutrition: { calories: 220, protein: 4, carbs: 35, fat: 8 },
    sattvicStatus: "modified",
    tags: ["navratri", "ekadashi", "comfort-food", "quick"],
    fastingType: "general",
    mythology: MYTHOLOGY_DB.aloo_jeera,
  },
  {
    id: "rec_002",
    name: "Sattvic Dal (No Onion/Garlic)",
    description:
      "A pure Sattvic yellow lentil curry. The secret is the ginger-cumin tempering with a hint of hing that creates depth without tamasic ingredients.",
    cuisine: "North Indian",
    category: "Main Course",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      { item: "Yellow moong dal", quantity: "1 cup", isForbidden: false },
      { item: "Tomatoes", quantity: "2 medium", isForbidden: false },
      { item: "Ginger", quantity: "1 inch", isForbidden: false },
      { item: "Green chilies", quantity: "2", isForbidden: false },
      { item: "Turmeric", quantity: "1/2 tsp", isForbidden: false },
      { item: "Cumin seeds", quantity: "1 tsp", isForbidden: false },
      { item: "Asafoetida", quantity: "1/4 tsp", isForbidden: false },
      { item: "Ghee", quantity: "2 tbsp", isForbidden: false },
      { item: "Coriander powder", quantity: "1 tsp", isForbidden: false },
      { item: "Salt", quantity: "to taste", isForbidden: false },
      { item: "Fresh coriander", quantity: "handful", isForbidden: false },
    ],
    instructions: [
      "Wash and pressure cook dal with turmeric and salt for 3 whistles.",
      "Mash the cooked dal until smooth and creamy.",
      "Heat ghee in a pan. Add cumin seeds and let them sizzle.",
      "Add asafoetida, grated ginger, and green chilies. Sauté for 30 seconds.",
      "Add chopped tomatoes and cook until soft.",
      "Add coriander powder and mix well.",
      "Pour this tempering over the cooked dal and simmer for 5 minutes.",
      "Garnish with fresh coriander leaves.",
    ],
    nutrition: { calories: 180, protein: 12, carbs: 28, fat: 6 },
    sattvicStatus: "pure",
    tags: ["navratri", "ekadashi", "protein", "comfort-food"],
    fastingType: "ekadashi",
    mythology: MYTHOLOGY_DB.sattvic_dal,
  },
  {
    id: "rec_003",
    name: "Paneer Bhurji (Scrambled Paneer)",
    description:
      "Scrambled paneer with aromatic spices. Uses kasuri methi and extra ginger to replace the usual onion-garlic base while maintaining the rich flavor.",
    cuisine: "North Indian",
    category: "Main Course",
    prepTime: 10,
    cookTime: 15,
    servings: 3,
    ingredients: [
      { item: "Paneer", quantity: "250g", isForbidden: false },
      { item: "Onion", quantity: "1", isForbidden: true, substitute: "1 tbsp Kasuri Methi + extra ginger" },
      { item: "Garlic", quantity: "2 cloves", isForbidden: true, substitute: "1/2 tsp Hing in oil" },
      { item: "Tomatoes", quantity: "2", isForbidden: false },
      { item: "Ginger", quantity: "1 tbsp grated", isForbidden: false },
      { item: "Green chilies", quantity: "2", isForbidden: false },
      { item: "Cumin seeds", quantity: "1 tsp", isForbidden: false },
      { item: "Turmeric", quantity: "1/4 tsp", isForbidden: false },
      { item: "Coriander powder", quantity: "1 tsp", isForbidden: false },
      { item: "Garam masala", quantity: "1/2 tsp", isForbidden: false },
      { item: "Kasuri Methi", quantity: "1 tbsp", isForbidden: false },
      { item: "Oil", quantity: "2 tbsp", isForbidden: false },
      { item: "Salt", quantity: "to taste", isForbidden: false },
    ],
    instructions: [
      "Crumble paneer into small pieces. Set aside.",
      "Heat oil, add cumin seeds and let them crackle.",
      "Add hing and grated ginger. Sauté for 30 seconds.",
      "Add chopped tomatoes and green chilies. Cook until tomatoes soften.",
      "Add turmeric, coriander powder, and salt. Mix well.",
      "Add crumbled paneer and toss everything together.",
      "Crush kasuri methi between palms and sprinkle over the bhurji.",
      "Add garam masala and cook for 2 more minutes.",
    ],
    nutrition: { calories: 280, protein: 18, carbs: 8, fat: 20 },
    sattvicStatus: "modified",
    tags: ["navratri", "ekadashi", "high-protein", "quick"],
    fastingType: "general",
    mythology: MYTHOLOGY_DB.paneer_bhurji,
  },
  {
    id: "rec_004",
    name: "Sattvic Vegetable Pulao",
    description:
      "A fragrant one-pot rice dish with vegetables. Cumin and whole spices provide the aromatic backbone without any onion or garlic.",
    cuisine: "North Indian",
    category: "Rice Dish",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      { item: "Basmati rice", quantity: "1.5 cups", isForbidden: false },
      { item: "Mixed vegetables", quantity: "2 cups", isForbidden: false },
      { item: "Onion", quantity: "1", isForbidden: true, substitute: "2 tbsp fried cashews (garnish)" },
      { item: "Cumin seeds", quantity: "1.5 tsp", isForbidden: false },
      { item: "Bay leaf", quantity: "1", isForbidden: false },
      { item: "Cinnamon", quantity: "1 inch", isForbidden: false },
      { item: "Cloves", quantity: "3", isForbidden: false },
      { item: "Cardamom", quantity: "2", isForbidden: false },
      { item: "Ginger", quantity: "1 inch", isForbidden: false },
      { item: "Green chilies", quantity: "2", isForbidden: false },
      { item: "Turmeric", quantity: "1/4 tsp", isForbidden: false },
      { item: "Ghee", quantity: "2 tbsp", isForbidden: false },
      { item: "Salt", quantity: "to taste", isForbidden: false },
    ],
    instructions: [
      "Wash and soak rice for 20 minutes.",
      "Heat ghee in a pressure cooker or pot.",
      "Add whole spices (cumin, bay leaf, cinnamon, cloves, cardamom).",
      "Add slit green chilies and grated ginger. Sauté for 30 seconds.",
      "Add mixed vegetables and sauté for 2 minutes.",
      "Add soaked rice, turmeric, and salt. Mix gently.",
      "Add 3 cups water and pressure cook for 2 whistles or cook covered until done.",
      "Let rest for 5 minutes, then fluff with fork.",
    ],
    nutrition: { calories: 320, protein: 8, carbs: 58, fat: 8 },
    sattvicStatus: "modified",
    tags: ["navratri", "ekadashi", "one-pot", "festival"],
  },
  {
    id: "rec_005",
    name: "Mint-Coriander Chutney",
    description:
      "Fresh green chutney that's naturally Sattvic. Bright, tangy, and perfect for fasting days.",
    cuisine: "Indian",
    category: "Accompaniment",
    prepTime: 5,
    cookTime: 0,
    servings: 6,
    ingredients: [
      { item: "Fresh mint leaves", quantity: "1 cup", isForbidden: false },
      { item: "Fresh coriander", quantity: "1 cup", isForbidden: false },
      { item: "Green chilies", quantity: "2", isForbidden: false },
      { item: "Ginger", quantity: "1 inch", isForbidden: false },
      { item: "Lemon juice", quantity: "2 tbsp", isForbidden: false },
      { item: "Cumin powder", quantity: "1/2 tsp", isForbidden: false },
      { item: "Black salt", quantity: "1/2 tsp", isForbidden: false },
      { item: "Water", quantity: "2-3 tbsp", isForbidden: false },
    ],
    instructions: [
      "Wash and clean mint and coriander leaves thoroughly.",
      "Blend all ingredients with minimal water until smooth.",
      "Adjust consistency and seasoning to taste.",
      "Serve fresh with snacks or meals.",
    ],
    nutrition: { calories: 15, protein: 1, carbs: 3, fat: 0 },
    sattvicStatus: "pure",
    tags: ["navratri", "ekadashi", "raw", "accompaniment"],
  },
  {
    id: "rec_006",
    name: "Sabudana Khichdi",
    description:
      "A fasting favorite made with tapioca pearls, peanuts, and potatoes. Naturally Sattvic and perfect for Navratri.",
    cuisine: "North Indian",
    category: "Breakfast",
    prepTime: 30,
    cookTime: 15,
    servings: 3,
    ingredients: [
      { item: "Sabudana (tapioca pearls)", quantity: "1 cup", isForbidden: false },
      { item: "Peanuts", quantity: "1/2 cup", isForbidden: false },
      { item: "Potatoes", quantity: "2 medium", isForbidden: false },
      { item: "Cumin seeds", quantity: "1 tsp", isForbidden: false },
      { item: "Green chilies", quantity: "2", isForbidden: false },
      { item: "Curry leaves", quantity: "8-10 leaves", isForbidden: false },
      { item: "Lemon juice", quantity: "1 tbsp", isForbidden: false },
      { item: "Rock salt (sendha namak)", quantity: "to taste", isForbidden: false },
      { item: "Ghee", quantity: "2 tbsp", isForbidden: false },
    ],
    instructions: [
      "Soak sabudana in water for 4-6 hours or overnight. Drain well.",
      "Roast peanuts, peel and coarsely crush them.",
      "Cube potatoes and microwave or boil until tender.",
      "Mix soaked sabudana with peanuts, salt, and lemon juice.",
      "Heat ghee, add cumin, curry leaves, and green chilies.",
      "Add potatoes and sauté for a minute.",
      "Add sabudana mixture and cook on low, stirring gently, until pearls turn translucent.",
    ],
    nutrition: { calories: 350, protein: 8, carbs: 55, fat: 12 },
    sattvicStatus: "pure",
    tags: ["navratri", "ekadashi", "fasting", "breakfast"],
    fastingType: "navratri",
    mythology: MYTHOLOGY_DB.sabudana_khichdi,
  },
  {
    id: "rec_007",
    name: "Singhare ke Atte ki Poori",
    description:
      "Crispy deep-fried bread made from water chestnut flour. Perfect for fasting days with any curry.",
    cuisine: "North Indian",
    category: "Bread",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    ingredients: [
      { item: "Singhara atta (water chestnut flour)", quantity: "2 cups", isForbidden: false },
      { item: "Sendha namak", quantity: "1 tsp", isForbidden: false },
      { item: "Cumin powder", quantity: "1/2 tsp", isForbidden: false },
      { item: "Black pepper", quantity: "1/4 tsp", isForbidden: false },
      { item: "Warm water", quantity: "as needed", isForbidden: false },
      { item: "Ghee/oil for frying", quantity: "for deep frying", isForbidden: false },
    ],
    instructions: [
      "Mix flour with salt, cumin powder, and black pepper.",
      "Add warm water gradually to make a firm dough.",
      "Knead well and rest for 10 minutes.",
      "Divide into small balls and roll into pooris.",
      "Deep fry in hot oil until golden and puffed.",
      "Serve hot with curry or yogurt.",
    ],
    nutrition: { calories: 180, protein: 3, carbs: 28, fat: 7 },
    sattvicStatus: "pure",
    tags: ["navratri", "ekadashi", "fasting", "bread"],
    fastingType: "navratri",
    mythology: MYTHOLOGY_DB.singhare_poori,
  },
  {
    id: "rec_008",
    name: "Makhana Kheer",
    description:
      "Creamy fox nut pudding sweetened with jaggery or sugar. A delicious dessert for fasting days.",
    cuisine: "North Indian",
    category: "Dessert",
    prepTime: 5,
    cookTime: 25,
    servings: 4,
    ingredients: [
      { item: "Makhana (fox nuts)", quantity: "2 cups", isForbidden: false },
      { item: "Milk", quantity: "1 liter", isForbidden: false },
      { item: "Sugar/jaggery", quantity: "1/2 cup", isForbidden: false },
      { item: "Cardamom powder", quantity: "1/4 tsp", isForbidden: false },
      { item: "Cashews", quantity: "10-12", isForbidden: false },
      { item: "Almonds", quantity: "10-12", isForbidden: false },
      { item: "Ghee", quantity: "1 tbsp", isForbidden: false },
      { item: "Saffron strands", quantity: "few", isForbidden: false },
    ],
    instructions: [
      "Roast makhana in ghee until crisp. Coarsely crush half of them.",
      "Boil milk in a heavy-bottomed pan.",
      "Add crushed makhana and cook until milk thickens.",
      "Add sugar and cardamom powder. Simmer for 5 minutes.",
      "Fry cashews and almonds in ghee until golden.",
      "Add whole makhana, nuts, and saffron to the kheer.",
      "Serve warm or chilled.",
    ],
    nutrition: { calories: 280, protein: 10, carbs: 40, fat: 10 },
    sattvicStatus: "pure",
    tags: ["navratri", "ekadashi", "dessert", "sweet"],
    fastingType: "ekadashi",
    mythology: MYTHOLOGY_DB.makhana_kheer,
  },
];

// Helper function to convert RecipeDB API format to our Recipe type
function convertRecipeDBToRecipe(apiRecipe: RecipeDBRecipe, nutrition?: RecipeDBNutrition | null): Recipe {
  // Check for forbidden ingredients in the recipe
  const forbiddenKeywords = ["onion", "garlic", "shallots", "leeks", "chives"];
  const ingredients = apiRecipe.ingredients?.map((ing: string) => {
    const isForbidden = forbiddenKeywords.some(keyword => 
      ing.toLowerCase().includes(keyword)
    );
    return {
      item: ing,
      quantity: "as per recipe",
      isForbidden,
      substitute: isForbidden ? "See substitution guide" : undefined,
    };
  }) || [];

  const forbiddenCount = ingredients.filter(i => i.isForbidden).length;
  
  return {
    id: apiRecipe.id || apiRecipe.url || `api_${Date.now()}`,
    name: apiRecipe.title || "Untitled Recipe",
    description: `${apiRecipe.cuisine || 'Various'} ${apiRecipe.category || 'Recipe'}. ${
      forbiddenCount > 0 
        ? `Contains ${forbiddenCount} ingredient(s) that need substitution for Sattvic diet.` 
        : 'Sattvic-compliant recipe.'
    }`,
    cuisine: apiRecipe.cuisine || "International",
    category: apiRecipe.category || "Main Course",
    prepTime: parseInt(apiRecipe.preptime) || 15,
    cookTime: parseInt(apiRecipe.cooktime) || 20,
    servings: 4,
    ingredients,
    instructions: apiRecipe.instructions || [],
    nutrition: {
      calories: nutrition?.calories || apiRecipe.calories || 0,
      protein: nutrition?.protein || apiRecipe.protein || 0,
      carbs: nutrition?.carbs || apiRecipe.carbs || 0,
      fat: nutrition?.fat || apiRecipe.fat || 0,
    },
    sattvicStatus: forbiddenCount > 0 ? "modified" : "pure",
    tags: [apiRecipe.cuisine?.toLowerCase(), apiRecipe.category?.toLowerCase()].filter(Boolean) as string[],
  };
}

// Helper function to convert search results
function convertSearchResultToRecipe(searchResult: any): Recipe {
  return {
    id: searchResult.recipe_id || searchResult.id || `search_${Date.now()}`,
    name: searchResult.title || "Untitled Recipe",
    description: `${searchResult.cuisine || 'Various'} ${searchResult.category || 'Recipe'}`,
    cuisine: searchResult.cuisine || "International",
    category: searchResult.category || "Main Course",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [],
    instructions: [],
    nutrition: {
      calories: searchResult.calories || 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    sattvicStatus: "pure",
    tags: [searchResult.cuisine?.toLowerCase(), searchResult.category?.toLowerCase()].filter(Boolean) as string[],
  };
}

// Main RecipeDB Service with API integration
export const RecipeDBService = {
  // Get all recipes - uses API if enabled
  getAllRecipes: async (): Promise<Recipe[]> => {
    if (!USE_REAL_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return RECIPE_DB;
    }

    try {
      console.log('[RecipeDB] Fetching recipes from API...');
      const apiRecipes = await RecipeDBAPIService.getAllRecipes(1, 50);
      console.log(`[RecipeDB] Received ${apiRecipes.length} recipes from API`);
      
      if (apiRecipes.length === 0) {
        console.log('[RecipeDB] No recipes from API, using mock data');
        return RECIPE_DB;
      }

      // Convert API recipes (don't fetch nutrition for all to avoid rate limits)
      const recipes = apiRecipes.map(apiRecipe => convertRecipeDBToRecipe(apiRecipe, null));
      
      console.log(`[RecipeDB] Successfully converted ${recipes.length} recipes`);
      return recipes;
    } catch (error) {
      console.error("[RecipeDB] API error, using mock data:", error);
      return RECIPE_DB;
    }
  },

  // Get recipe by ID
  getRecipeById: async (id: string): Promise<Recipe | null> => {
    // Check mock data first
    const mockRecipe = RECIPE_DB.find((r) => r.id === id);
    
    if (!USE_REAL_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockRecipe || null;
    }

    try {
      console.log(`[RecipeDB] Fetching recipe ${id} from API...`);
      const apiRecipe = await RecipeDBAPIService.getRecipeById(id);
      
      if (!apiRecipe) {
        console.log(`[RecipeDB] Recipe ${id} not found in API, checking mock data`);
        return mockRecipe || null;
      }
      
      // Fetch additional details
      const [nutrition, instructions] = await Promise.all([
        RecipeDBAPIService.getRecipeNutrition(id).catch(() => null),
        RecipeDBAPIService.getRecipeInstructions(id).catch(() => []),
      ]);
      
      const recipe = convertRecipeDBToRecipe(apiRecipe, nutrition);
      if (instructions && instructions.length > 0) {
        recipe.instructions = instructions;
      }
      
      console.log(`[RecipeDB] Successfully fetched recipe: ${recipe.name}`);
      return recipe;
    } catch (error) {
      console.error(`[RecipeDB] Error fetching recipe ${id}:`, error);
      return mockRecipe || null;
    }
  },

  // Search recipes
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    if (!query) {
      return RecipeDBService.getAllRecipes();
    }

    if (!USE_REAL_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const lowerQuery = query.toLowerCase();
      return RECIPE_DB.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery) ||
          r.tags.some((t) => t.includes(lowerQuery)) ||
          r.ingredients.some((i) => i.item.toLowerCase().includes(lowerQuery))
      );
    }

    try {
      console.log(`[RecipeDB] Searching for: ${query}`);
      const searchResults = await RecipeDBAPIService.searchByTitle(query);
      console.log(`[RecipeDB] Found ${searchResults.length} search results`);
      
      if (searchResults.length === 0) {
        // Fallback to local search
        const lowerQuery = query.toLowerCase();
        return RECIPE_DB.filter(
          (r) =>
            r.name.toLowerCase().includes(lowerQuery) ||
            r.description.toLowerCase().includes(lowerQuery)
        );
      }
      
      return searchResults.map(convertSearchResultToRecipe);
    } catch (error) {
      console.error("[RecipeDB] Search error, using mock data:", error);
      const lowerQuery = query.toLowerCase();
      return RECIPE_DB.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery)
      );
    }
  },

  // Get recipes by tag (uses category/cuisine endpoints)
  getRecipesByTag: async (tag: string): Promise<Recipe[]> => {
    if (!USE_REAL_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return RECIPE_DB.filter((r) => r.tags.includes(tag.toLowerCase()));
    }

    try {
      console.log(`[RecipeDB] Filtering by tag: ${tag}`);
      
      // Map common tags to API-compatible values
      const tagMapping: Record<string, { type: 'cuisine' | 'category' | 'search', value: string }> = {
        'navratri': { type: 'search', value: 'navratri' },
        'ekadashi': { type: 'search', value: 'ekadashi' },
        'fasting': { type: 'search', value: 'fasting' },
        'quick': { type: 'category', value: 'Quick' },
        'protein': { type: 'search', value: 'protein' },
        'indian': { type: 'cuisine', value: 'Indian' },
        'italian': { type: 'cuisine', value: 'Italian' },
        'chinese': { type: 'cuisine', value: 'Chinese' },
        'mexican': { type: 'cuisine', value: 'Mexican' },
      };

      const mapping = tagMapping[tag.toLowerCase()];
      let apiRecipes: RecipeDBRecipe[] = [];

      if (mapping) {
        if (mapping.type === 'cuisine') {
          apiRecipes = await RecipeDBAPIService.getRecipesByCuisine(mapping.value);
        } else if (mapping.type === 'category') {
          apiRecipes = await RecipeDBAPIService.getRecipesByCategory(mapping.value);
        } else if (mapping.type === 'search') {
          // Use search for special tags
          const searchResults = await RecipeDBAPIService.searchByTitle(mapping.value);
          // Convert search results to recipes (they're already in the right format)
          return searchResults.map(convertSearchResultToRecipe);
        }
      } else {
        // Try as category first, then cuisine
        try {
          apiRecipes = await RecipeDBAPIService.getRecipesByCategory(tag);
        } catch (e) {
          apiRecipes = await RecipeDBAPIService.getRecipesByCuisine(tag);
        }
      }

      if (apiRecipes.length === 0) {
        console.log(`[RecipeDB] No API results for tag ${tag}, using mock data`);
        return RECIPE_DB.filter((r) => r.tags.includes(tag.toLowerCase()));
      }

      // Convert API recipes (skip nutrition fetch to avoid rate limits)
      const recipes = apiRecipes.map(apiRecipe => convertRecipeDBToRecipe(apiRecipe, null));
      console.log(`[RecipeDB] Found ${recipes.length} recipes for tag: ${tag}`);
      
      return recipes;
    } catch (error) {
      console.error(`[RecipeDB] Error filtering by tag ${tag}, using mock data:`, error);
      return RECIPE_DB.filter((r) => r.tags.includes(tag.toLowerCase()));
    }
  },

  // Get Sattvic-safe recipes
  getSattvicRecipes: async (): Promise<Recipe[]> => {
    const allRecipes = await RecipeDBService.getAllRecipes();
    return allRecipes.filter(
      (r) => r.sattvicStatus === "pure" || r.sattvicStatus === "modified"
    );
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

  // Get recipe of the day
  getRecipeOfTheDay: async (): Promise<Recipe | null> => {
    if (!USE_REAL_API) {
      return RECIPE_DB[0];
    }

    try {
      const apiRecipe = await RecipeDBAPIService.getRecipeOfTheDay();
      if (!apiRecipe) return RECIPE_DB[0];
      
      const nutrition = await RecipeDBAPIService.getRecipeNutrition(apiRecipe.id);
      return convertRecipeDBToRecipe(apiRecipe, nutrition);
    } catch (error) {
      return RECIPE_DB[0];
    }
  },
};
