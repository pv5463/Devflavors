import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Badge } from "../../components/Card";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { MythologyCard } from "../../components/MythologyCard";
import { RecipeDBService } from "../../services/recipedb";
import { Recipe } from "../../types";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    setIsLoading(true);
    const data = await RecipeDBService.getRecipeById(id as string);
    setRecipe(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
        <Loading message="Loading recipe details..." />
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#878773" }}>Recipe not found</Text>
          <Button onPress={() => router.back()} style={{ marginTop: 16 }}>
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const forbiddenIngredients = recipe.ingredients.filter((i) => i.isForbidden);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Image Placeholder */}
        <View
          style={{
            height: 200,
            backgroundColor: "#e1f8e6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 64 }}>
            {recipe.category === "Dessert"
              ? "🍮"
              : recipe.category === "Bread"
              ? "🫓"
              : recipe.category === "Breakfast"
              ? "🌅"
              : "🍛"}
          </Text>
        </View>

        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 60,
            left: 20,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 24,
            padding: 8,
          }}
        >
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>

        {/* Content */}
        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#1c4b25",
              marginBottom: 8,
            }}
          >
            {recipe.name}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#878773",
              marginBottom: 16,
              lineHeight: 20,
            }}
          >
            {recipe.description}
          </Text>

          {/* Tags */}
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
            <Badge variant={recipe.sattvicStatus === "pure" ? "success" : "warning"}>
              {recipe.sattvicStatus === "pure" ? "Sattvic Pure" : "Modified"}
            </Badge>
            <Badge variant="default">{recipe.cuisine}</Badge>
            <Badge variant="default">{recipe.category}</Badge>
          </View>

          {/* Time & Servings */}
          <Card style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>⏱️</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.prepTime + recipe.cookTime} min
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>Total Time</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>👥</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.servings}
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>Servings</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>🔥</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.nutrition.calories}
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>Calories</Text>
              </View>
            </View>
          </Card>

          {/* Ingredients */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1c4b25",
              marginBottom: 12,
            }}
          >
            Ingredients
          </Text>

          <Card style={{ marginBottom: 20 }}>
            {recipe.ingredients.map((ing, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  paddingVertical: 8,
                  borderBottomWidth: idx < recipe.ingredients.length - 1 ? 1 : 0,
                  borderBottomColor: "#f2f2ea",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: ing.isForbidden ? "600" : "400",
                      color: ing.isForbidden ? "#de2424" : "#1c4b25",
                      textDecorationLine: ing.isForbidden ? "line-through" : "none",
                    }}
                  >
                    {ing.item}
                  </Text>
                  {ing.substitute && (
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#2d9039",
                        marginTop: 2,
                      }}
                    >
                      ✓ Use: {ing.substitute}
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#878773",
                    marginLeft: 8,
                  }}
                >
                  {ing.quantity}
                </Text>
              </View>
            ))}
          </Card>

          {/* Substitutions Note */}
          {forbiddenIngredients.length > 0 && (
            <Card variant="filled" style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1c4b25",
                  marginBottom: 8,
                }}
              >
                ⚡ Sattvic Substitutions Applied
              </Text>
              <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 20 }}>
                This recipe uses molecular flavor substitutes to replace{" "}
                {forbiddenIngredients.length} forbidden ingredient(s) while
                maintaining authentic taste.
              </Text>
            </Card>
          )}

          {/* Mythological Story */}
          {recipe.mythology && (
            <MythologyCard mythology={recipe.mythology} />
          )}

          {/* Instructions */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1c4b25",
              marginBottom: 12,
            }}
          >
            Instructions
          </Text>

          {recipe.instructions.map((step, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                marginBottom: 16,
                paddingRight: 8,
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "#e1f8e6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#2d9039",
                  }}
                >
                  {idx + 1}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: "#5c5c50",
                  lineHeight: 22,
                  paddingTop: 2,
                }}
              >
                {step}
              </Text>
            </View>
          ))}

          {/* Nutrition */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1c4b25",
              marginBottom: 12,
              marginTop: 8,
            }}
          >
            Nutrition (per serving)
          </Text>

          <Card style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.nutrition.calories}
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>kcal</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.nutrition.protein}g
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>protein</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.nutrition.carbs}g
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>carbs</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {recipe.nutrition.fat}g
                </Text>
                <Text style={{ fontSize: 12, color: "#878773" }}>fat</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
