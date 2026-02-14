import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "../components/Card";
import { RecipeList } from "../components/RecipeList";
import { useAppStore } from "../store";
import { Recipe } from "../types";

export default function RecipesScreen() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const {
    filteredRecipes,
    isLoadingRecipes,
    loadRecipes,
    searchRecipes,
    filterByTag,
    activeTag,
    setSelectedRecipe,
    favorites,
    toggleFavorite,
  } = useAppStore();

  useEffect(() => {
    loadRecipes();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = () => {
    searchRecipes(searchInput);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    router.push(`/recipe/${recipe.id}`);
  };

  const tags = ["navratri", "ekadashi", "fasting", "quick", "protein"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <View style={{ flex: 1 }}>
        {/* Premium Header with Gradient */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <LinearGradient
            colors={["#2d9039", "#1c6b28"]}
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 24,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              shadowColor: "#2d9039",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 40 }}>📖</Text>
              </View>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "800",
                  color: "#ffffff",
                  textAlign: "center",
                  letterSpacing: -0.5,
                }}
              >
                Sacred Recipes
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.9)",
                  textAlign: "center",
                  marginTop: 6,
                  fontWeight: "500",
                }}
              >
                No Onion • No Garlic • Pure Sattvic
              </Text>
            </View>

            {/* Search Bar */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 14,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 12 }}>🔍</Text>
              <TextInput
                value={searchInput}
                onChangeText={setSearchInput}
                placeholder="Search recipes..."
                placeholderTextColor="#878773"
                onSubmitEditing={handleSearch}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#1c4b25",
                  fontWeight: "500",
                }}
              />
              {searchInput.length > 0 && (
                <Pressable
                  onPress={() => {
                    setSearchInput("");
                    loadRecipes();
                  }}
                  style={{ padding: 4 }}
                >
                  <Text style={{ fontSize: 18, color: "#878773" }}>✕</Text>
                </Pressable>
              )}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Tags Section */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#1c4b25",
              marginBottom: 12,
            }}
          >
            Filter by Category
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            <Pressable onPress={() => loadRecipes()}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: activeTag === null ? "#2d9039" : "#f9f9f6",
                  borderWidth: 2,
                  borderColor: activeTag === null ? "#2d9039" : "#e8e8e0",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: activeTag === null ? "#ffffff" : "#878773",
                  }}
                >
                  All Recipes
                </Text>
              </View>
            </Pressable>
            {tags.map((tag) => (
              <Pressable key={tag} onPress={() => filterByTag(tag)}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: activeTag === tag ? "#2d9039" : "#f9f9f6",
                    borderWidth: 2,
                    borderColor: activeTag === tag ? "#2d9039" : "#e8e8e0",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: activeTag === tag ? "#ffffff" : "#878773",
                      textTransform: "capitalize",
                    }}
                  >
                    {tag}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Recipe List */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <RecipeList
            recipes={filteredRecipes}
            onSelectRecipe={handleSelectRecipe}
            isLoading={isLoadingRecipes}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
