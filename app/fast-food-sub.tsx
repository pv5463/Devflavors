import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Badge } from "../components/Card";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { AIMealPlannerService } from "../services/ai-meal-planner";
import { FastFoodSubstitution } from "../types";

export default function FastFoodSubScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [substitution, setSubstitution] = useState<FastFoodSubstitution | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const popularFastFoods = [
    { name: "Burger", icon: "🍔", query: "burger" },
    { name: "Pizza", icon: "🍕", query: "pizza" },
    { name: "Fries", icon: "🍟", query: "fries" },
    { name: "Sandwich", icon: "🥪", query: "sandwich" },
    { name: "Noodles", icon: "🍜", query: "noodles" },
    { name: "Fried Chicken", icon: "🍗", query: "chicken" },
  ];

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    const result = await AIMealPlannerService.generateFastFoodSubstitution(query);
    setSubstitution(result);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          {/* Header */}
          <View style={{ marginBottom: 24 }}>
            <Pressable 
              onPress={() => router.back()} 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 12,
                backgroundColor: "#f2fcf4",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 20, color: "#1c4b25" }}>←</Text>
            </Pressable>
            
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <LinearGradient
                colors={["#de2424", "#bb1a1a"]}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 24 }}>🍔</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#1c4b25" }}>
                  Fast Food → Sattvic
                </Text>
                <Text style={{ fontSize: 15, color: "#878773" }}>
                  Healthy alternatives, same taste!
                </Text>
              </View>
            </View>
          </View>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: "#f9f9f6",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 14,
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, marginRight: 8 }}>🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search fast food (e.g., burger, pizza)..."
              placeholderTextColor="#878773"
              onSubmitEditing={() => handleSearch(searchQuery)}
              style={{
                flex: 1,
                fontSize: 16,
                color: "#1c4b25",
              }}
            />
          </View>

          {!substitution && !isLoading && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25", marginBottom: 16 }}>
                Popular Fast Foods
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                {popularFastFoods.map((food) => (
                  <Pressable
                    key={food.query}
                    onPress={() => handleSearch(food.query)}
                    style={{ width: "48%" }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "#f9f9f6"]}
                      style={{
                        borderRadius: 16,
                        padding: 16,
                        alignItems: "center",
                        shadowColor: "#1c4b25",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                      }}
                    >
                      <Text style={{ fontSize: 48, marginBottom: 8 }}>{food.icon}</Text>
                      <Text style={{ fontSize: 14, fontWeight: "600", color: "#1c4b25" }}>
                        {food.name}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                ))}
              </View>

              <Card variant="filled">
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25", marginBottom: 8 }}>
                  💡 How It Works
                </Text>
                <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                  Our AI analyzes your favorite fast food and creates a Sattvic alternative that matches the taste 
                  while being healthier, using fresh ingredients and traditional cooking methods.
                </Text>
              </Card>
            </View>
          )}

          {isLoading && <Loading message="Creating your Sattvic alternative..." />}

          {substitution && !isLoading && (
            <View>
              {/* Comparison Header */}
              <LinearGradient
                colors={["#ffcaca", "#fda4a4"]}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <Text style={{ fontSize: 40, marginRight: 12 }}>⚠️</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#7f1d1d" }}>
                      {substitution.originalFood}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#9a1a1a" }}>
                      Original Fast Food
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 12 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#7f1d1d" }}>
                      {substitution.nutritionComparison.original.calories}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#9a1a1a" }}>Calories</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#7f1d1d" }}>
                      {substitution.nutritionComparison.original.fat}g
                    </Text>
                    <Text style={{ fontSize: 12, color: "#9a1a1a" }}>Fat</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#7f1d1d" }}>
                      {substitution.nutritionComparison.original.protein}g
                    </Text>
                    <Text style={{ fontSize: 12, color: "#9a1a1a" }}>Protein</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Arrow Down */}
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ fontSize: 48 }}>⬇️</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#2d9039" }}>
                  {substitution.tasteMatch}% Taste Match
                </Text>
              </View>

              {/* Sattvic Alternative */}
              <LinearGradient
                colors={["#c3eec9", "#96e0a0"]}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <Text style={{ fontSize: 40, marginRight: 12 }}>✨</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25" }}>
                      {substitution.sattvicAlternative.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#257330" }}>
                      Sattvic Alternative
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 12 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25" }}>
                      {substitution.nutritionComparison.sattvic.calories}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#257330" }}>Calories</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25" }}>
                      {substitution.nutritionComparison.sattvic.fat}g
                    </Text>
                    <Text style={{ fontSize: 12, color: "#257330" }}>Fat</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25" }}>
                      {substitution.nutritionComparison.sattvic.protein}g
                    </Text>
                    <Text style={{ fontSize: 12, color: "#257330" }}>Protein</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Health Improvements */}
              <Card style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 12 }}>
                  🌟 Health Improvements
                </Text>
                {substitution.healthImprovement.map((improvement, idx) => (
                  <View key={idx} style={{ flexDirection: "row", marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, color: "#2d9039", marginRight: 8 }}>✓</Text>
                    <Text style={{ flex: 1, fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                      {improvement}
                    </Text>
                  </View>
                ))}
              </Card>

              {/* Calorie Reduction */}
              <LinearGradient
                colors={["#fff8db", "#ffefb0"]}
                style={{
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#472805", marginBottom: 4 }}>
                  You Save
                </Text>
                <Text style={{ fontSize: 36, fontWeight: "700", color: "#f59e0b" }}>
                  {substitution.calorieReduction}
                </Text>
                <Text style={{ fontSize: 14, color: "#7d4e12" }}>
                  Calories per serving
                </Text>
              </LinearGradient>

              {/* Recipe Details */}
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25", marginBottom: 12 }}>
                Recipe
              </Text>
              
              <Card style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "#878773", marginBottom: 8 }}>
                  Prep: {substitution.sattvicAlternative.prepTime} min • Cook: {substitution.sattvicAlternative.cookTime} min
                </Text>
                <Text style={{ fontSize: 15, color: "#5c5c50", lineHeight: 22 }}>
                  {substitution.sattvicAlternative.description}
                </Text>
              </Card>

              <Button 
                onPress={() => router.push(`/recipe/${substitution.sattvicAlternative.id}`)}
                variant="secondary"
                size="lg"
                style={{ marginBottom: 12 }}
              >
                View Full Recipe →
              </Button>

              <Button 
                onPress={() => setSubstitution(null)}
                variant="outline"
                size="lg"
              >
                Try Another Food
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
