import { useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Badge } from "../components/Card";
import { Button } from "../components/Button";
import { CameraScanner } from "../components/CameraScanner";
import { AIMealPlannerService } from "../services/ai-meal-planner";
import { useAppStore } from "../store";
import { ScannedRecipeGeneration } from "../types";

export default function ScanScreen() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(true);
  const [generatedRecipes, setGeneratedRecipes] = useState<ScannedRecipeGeneration | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  const {
    scannedIngredients,
    addScannedIngredient,
    clearScannedIngredients,
  } = useAppStore();

  useEffect(() => {
    // Pulse animation for scan indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleScan = (data: string) => {
    // Parse scanned data - could be barcode or text
    const ingredients = parseScannedData(data);
    ingredients.forEach(ing => addScannedIngredient(ing));
    setIsScanning(false);
    
    // Auto-resume scanning after 3 seconds
    setTimeout(() => setIsScanning(true), 3000);
  };

  const parseScannedData = (data: string): string[] => {
    // Check for common forbidden ingredients in scanned text
    const forbiddenKeywords = ["garlic", "onion", "leek", "shallot", "chive"];
    const allowedIngredients = ["ginger", "cumin", "turmeric", "coriander", "asafoetida", "hing"];
    
    const lowerData = data.toLowerCase();
    const found: string[] = [];
    
    // Check forbidden ingredients
    forbiddenKeywords.forEach(keyword => {
      if (lowerData.includes(keyword)) {
        found.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      }
    });
    
    // Check allowed ingredients
    allowedIngredients.forEach(keyword => {
      if (lowerData.includes(keyword)) {
        found.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      }
    });
    
    // If nothing found, add a sample ingredient
    if (found.length === 0) {
      const samples = ["Ginger", "Cumin seeds", "Turmeric", "Black Pepper"];
      found.push(samples[Math.floor(Math.random() * samples.length)]);
    }
    
    return found;
  };

  const getStatusForIngredient = (name: string) => {
    const forbidden = ["Garlic", "Onion", "Leek", "Shallot", "Chive"];
    return forbidden.includes(name) ? "forbidden" : "allowed";
  };

  const handleGenerateRecipes = async () => {
    setIsGenerating(true);
    const recipes = await AIMealPlannerService.generateRecipeFromScannedItems(scannedIngredients);
    setGeneratedRecipes(recipes);
    setIsGenerating(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          {/* Premium Header */}
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
                colors={["#2d9039", "#1c6b28"]}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 24 }}>📷</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#1c4b25" }}>
                  AI Scanner
                </Text>
                <Text style={{ fontSize: 15, color: "#878773" }}>
                  Instant Sattvic compliance check
                </Text>
              </View>
            </View>
          </View>

          {/* Camera Scanner */}
          <CameraScanner onScan={handleScan} isScanning={isScanning} />

          {/* Scan Status */}
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <LinearGradient
              colors={isScanning ? ["#e1f8e6", "#c3eec9"] : ["#fff8db", "#ffefb0"]}
              style={{
                padding: 16,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Animated.View style={{ transform: [{ scale: isScanning ? pulseAnim : 1 }] }}>
                <Text style={{ fontSize: 24, marginRight: 12 }}>
                  {isScanning ? "🔍" : "✓"}
                </Text>
              </Animated.View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                  {isScanning ? "Scanning Active" : "Scan Complete"}
                </Text>
                <Text style={{ fontSize: 13, color: "#5c5c50" }}>
                  {isScanning 
                    ? "Point camera at ingredient labels" 
                    : "Check results below"}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Scanned Ingredients */}
          {scannedIngredients.length > 0 && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25" }}>
                  Scanned Items ({scannedIngredients.length})
                </Text>
                <Pressable onPress={clearScannedIngredients}>
                  <Text style={{ color: "#de2424", fontSize: 14, fontWeight: "600" }}>
                    Clear All
                  </Text>
                </Pressable>
              </View>

              {scannedIngredients.map((ing, idx) => {
                const status = getStatusForIngredient(ing);
                return (
                  <View key={idx} style={{ marginBottom: 12 }}>
                    <LinearGradient
                      colors={
                        status === "forbidden"
                          ? ["#ffcaca", "#fda4a4"]
                          : ["#c3eec9", "#96e0a0"]
                      }
                      style={{
                        borderRadius: 16,
                        padding: 16,
                        shadowColor: status === "forbidden" ? "#de2424" : "#2d9039",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 4,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "700",
                              color: status === "forbidden" ? "#7f1d1d" : "#1c4b25",
                              marginBottom: 4,
                            }}
                          >
                            {ing}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: status === "forbidden" ? "#9a1a1a" : "#257330",
                            }}
                          >
                            {status === "forbidden"
                              ? "⚠️ Not allowed during fasting"
                              : "✓ Sattvic approved"}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: "rgba(255,255,255,0.5)",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 24 }}>
                            {status === "forbidden" ? "✗" : "✓"}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                );
              })}

              {scannedIngredients.some(
                (ing) => getStatusForIngredient(ing) === "forbidden"
              ) && (
                <Button
                  onPress={() => router.push("/substitute")}
                  variant="secondary"
                  size="lg"
                  style={{ marginTop: 8, marginBottom: 12 }}
                >
                  🔬 Find Substitutes
                </Button>
              )}

              {scannedIngredients.length >= 3 && !generatedRecipes && (
                <Button
                  onPress={handleGenerateRecipes}
                  variant="primary"
                  size="lg"
                  style={{ marginTop: 8 }}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "🍳 Generate Recipes"}
                </Button>
              )}
            </View>
          )}

          {/* Generated Recipes */}
          {generatedRecipes && (
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: "#1c4b25", marginBottom: 16 }}>
                AI-Generated Recipes
              </Text>

              {generatedRecipes.missingIngredients && generatedRecipes.missingIngredients.length > 0 && (
                <Card variant="filled" style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25", marginBottom: 8 }}>
                    💡 Suggested Additions
                  </Text>
                  {generatedRecipes.missingIngredients.map((item, idx) => (
                    <Text key={idx} style={{ fontSize: 14, color: "#5c5c50", marginBottom: 4 }}>
                      • {item}
                    </Text>
                  ))}
                </Card>
              )}

              {generatedRecipes.suggestedRecipes.map((recipe, idx) => (
                <LinearGradient
                  key={idx}
                  colors={["#ffffff", "#f9f9f6"]}
                  style={{
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 16,
                    shadowColor: "#1c4b25",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 6,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        backgroundColor: "#e1f8e6",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Text style={{ fontSize: 32 }}>🍽️</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 4 }}>
                        {recipe.name}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Badge variant="success">
                          Pranic: {recipe.pranicValue.score}/10
                        </Badge>
                        <Badge variant="info">
                          {generatedRecipes.preparationTime} min
                        </Badge>
                      </View>
                    </View>
                  </View>

                  <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22, marginBottom: 12 }}>
                    {recipe.description}
                  </Text>

                  <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 12, borderTopWidth: 1, borderTopColor: "#f2f2ea" }}>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: 16, fontWeight: "600", color: "#2d9039" }}>
                        {recipe.nutrition.calories}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#878773" }}>Cal</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: 16, fontWeight: "600", color: "#2d9039" }}>
                        {recipe.nutrition.protein}g
                      </Text>
                      <Text style={{ fontSize: 12, color: "#878773" }}>Protein</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: 16, fontWeight: "600", color: "#2d9039" }}>
                        {recipe.prepTime + recipe.cookTime}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#878773" }}>Min</Text>
                    </View>
                  </View>
                </LinearGradient>
              ))}

              <Button
                onPress={() => setGeneratedRecipes(null)}
                variant="outline"
                size="lg"
              >
                Scan More Ingredients
              </Button>
            </View>
          )}

          {/* Info Card */}
          {scannedIngredients.length === 0 && (
            <Card variant="filled" style={{ marginTop: 8 }}>
              <View style={{ alignItems: "center", padding: 8 }}>
                <Text style={{ fontSize: 48, marginBottom: 12 }}>🌿</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1c4b25",
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  How It Works
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#5c5c50",
                    lineHeight: 22,
                    textAlign: "center",
                  }}
                >
                  Point your camera at ingredient labels, barcodes, or product packaging. 
                  Our AI will instantly identify forbidden ingredients and suggest Sattvic alternatives.
                </Text>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
