import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { IngredientSearch } from "../components/IngredientSearch";
import { SubstitutionDisplay } from "../components/SubstitutionDisplay";
import { useAppStore } from "../store";
import { Ingredient } from "../types";
import { FlavorDBService } from "../services/flavordb";

export default function SubstituteScreen() {
  const router = useRouter();
  const [forbiddenIngredients, setForbiddenIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    selectedForbidden,
    setSelectedForbidden,
    currentSubstitution,
    setCurrentSubstitution,
    isLoadingSubstitution,
    generateSubstitution,
  } = useAppStore();

  useEffect(() => {
    loadForbiddenIngredients();
  }, []);

  const loadForbiddenIngredients = async () => {
    setIsLoading(true);
    const ingredients = await FlavorDBService.getForbiddenIngredients();
    setForbiddenIngredients(ingredients);
    setIsLoading(false);
    setHasLoaded(true);
  };

  const handleSelectIngredient = async (ingredient: Ingredient) => {
    setSelectedForbidden(ingredient);
    await generateSubstitution(ingredient.id);
  };

  const handleBack = () => {
    if (currentSubstitution) {
      setCurrentSubstitution(null);
      setSelectedForbidden(null);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <View style={{ flex: 1, padding: 20 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={handleBack} style={{ padding: 8, marginRight: 8 }}>
            <Text style={{ fontSize: 24, color: "#1c4b25" }}>←</Text>
          </Pressable>
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#1c4b25",
              }}
            >
              {currentSubstitution ? "Substitution" : "Find Substitute"}
            </Text>
            <Text style={{ fontSize: 14, color: "#878773" }}>
              {currentSubstitution
                ? `For ${selectedForbidden?.name}`
                : "Select a forbidden ingredient"}
            </Text>
          </View>
        </View>

        {/* Content */}
        {currentSubstitution ? (
          <View style={{ flex: 1 }}>
            <SubstitutionDisplay substitution={currentSubstitution} />
            <Button
              onPress={() => {
                setCurrentSubstitution(null);
                setSelectedForbidden(null);
              }}
              variant="outline"
              style={{ marginTop: 12 }}
            >
              Try Another Ingredient
            </Button>
          </View>
        ) : isLoading ? (
          <Loading message="Loading forbidden ingredients..." />
        ) : (
          <View style={{ flex: 1 }}>
            {/* API Status Indicator */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#e1f8e6",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#2d9039",
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: "#1c6b28",
                  fontWeight: "600",
                }}
              >
                Molecular data from FlavorDB
              </Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1c4b25",
                marginBottom: 12,
              }}
            >
              Forbidden Ingredients
            </Text>

            {hasLoaded && forbiddenIngredients.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                {forbiddenIngredients.map((ing) => (
                  <Pressable
                    key={ing.id}
                    onPress={() => handleSelectIngredient(ing)}
                  >
                    <Card style={{ marginBottom: 8 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "600",
                              color: "#1c4b25",
                            }}
                          >
                            {ing.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#878773",
                            }}
                          >
                            {ing.compounds.length} compounds • Click to substitute
                          </Text>
                        </View>
                        <Text style={{ fontSize: 20, color: "#f14141" }}>✕</Text>
                      </View>
                    </Card>
                  </Pressable>
                ))}
              </View>
            )}

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1c4b25",
                marginBottom: 12,
              }}
            >
              Or Search
            </Text>
            <IngredientSearch
              onSelectIngredient={handleSelectIngredient}
              showForbiddenOnly={true}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
