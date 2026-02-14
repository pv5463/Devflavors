import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { AIMealPlannerService } from "../services/ai-meal-planner";
import { PersonalizedRecipe, UserProfile } from "../types";

export default function MealPlannerScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    goal: "mental_clarity",
    activityLevel: "active",
    currentMood: "balanced",
  });
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack" | "post_yoga">("breakfast");
  const [generatedMeal, setGeneratedMeal] = useState<PersonalizedRecipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMeal = async () => {
    setIsGenerating(true);
    const meal = await AIMealPlannerService.generatePersonalizedMeal(profile, mealType);
    setGeneratedMeal(meal);
    setIsGenerating(false);
    setStep(3);
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
                colors={["#f59e0b", "#d97706"]}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 24 }}>🧠</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#1c4b25" }}>
                  AI Meal Planner
                </Text>
                <Text style={{ fontSize: 15, color: "#878773" }}>
                  Personalized Sattvic nutrition
                </Text>
              </View>
            </View>
          </View>

          {/* Step 1: Goal Selection */}
          {step === 1 && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25", marginBottom: 16 }}>
                What's your goal?
              </Text>

              {[
                { key: "weight_loss", label: "Weight Loss", icon: "⚖️", desc: "Sustainable fat loss with energy" },
                { key: "muscle_gain", label: "Muscle Gain", icon: "💪", desc: "Build strength naturally" },
                { key: "mental_clarity", label: "Mental Clarity", icon: "🧠", desc: "Focus & cognitive enhancement" },
                { key: "energy_boost", label: "Energy Boost", icon: "⚡", desc: "Sustained vitality" },
                { key: "spiritual_growth", label: "Spiritual Growth", icon: "🕉️", desc: "Enhance meditation & prana" },
              ].map((goal) => (
                <Pressable
                  key={goal.key}
                  onPress={() => setProfile({ ...profile, goal: goal.key as any })}
                >
                  <LinearGradient
                    colors={profile.goal === goal.key ? ["#e1f8e6", "#c3eec9"] : ["#ffffff", "#f9f9f6"]}
                    style={{
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 12,
                      borderWidth: profile.goal === goal.key ? 2 : 0,
                      borderColor: "#2d9039",
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 32, marginRight: 12 }}>{goal.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                          {goal.label}
                        </Text>
                        <Text style={{ fontSize: 13, color: "#878773" }}>
                          {goal.desc}
                        </Text>
                      </View>
                      {profile.goal === goal.key && (
                        <Text style={{ fontSize: 24, color: "#2d9039" }}>✓</Text>
                      )}
                    </View>
                  </LinearGradient>
                </Pressable>
              ))}

              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25", marginTop: 24, marginBottom: 16 }}>
                Activity Level
              </Text>

              {[
                { key: "sedentary", label: "Sedentary", icon: "🪑", desc: "Desk job, minimal exercise" },
                { key: "active", label: "Active", icon: "🚶", desc: "Regular exercise 3-4x/week" },
                { key: "yoga_practitioner", label: "Yoga Practitioner", icon: "🧘", desc: "Daily yoga & meditation" },
                { key: "athlete", label: "Athlete", icon: "🏃", desc: "Intense training daily" },
              ].map((activity) => (
                <Pressable
                  key={activity.key}
                  onPress={() => setProfile({ ...profile, activityLevel: activity.key as any })}
                >
                  <LinearGradient
                    colors={profile.activityLevel === activity.key ? ["#fff8db", "#ffefb0"] : ["#ffffff", "#f9f9f6"]}
                    style={{
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 12,
                      borderWidth: profile.activityLevel === activity.key ? 2 : 0,
                      borderColor: "#f59e0b",
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 32, marginRight: 12 }}>{activity.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                          {activity.label}
                        </Text>
                        <Text style={{ fontSize: 13, color: "#878773" }}>
                          {activity.desc}
                        </Text>
                      </View>
                      {profile.activityLevel === activity.key && (
                        <Text style={{ fontSize: 24, color: "#f59e0b" }}>✓</Text>
                      )}
                    </View>
                  </LinearGradient>
                </Pressable>
              ))}

              <Button onPress={() => setStep(2)} size="lg" style={{ marginTop: 24 }}>
                Continue →
              </Button>
            </View>
          )}

          {/* Step 2: Mood & Meal Type */}
          {step === 2 && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25", marginBottom: 16 }}>
                How are you feeling?
              </Text>

              {[
                { key: "balanced", label: "Balanced", icon: "😌", desc: "Feeling good overall" },
                { key: "anxious", label: "Anxious", icon: "😰", desc: "Need calming foods" },
                { key: "lethargic", label: "Lethargic", icon: "😴", desc: "Need energizing foods" },
                { key: "stressed", label: "Stressed", icon: "😓", desc: "Need stress relief" },
                { key: "energetic", label: "Energetic", icon: "😄", desc: "Feeling great!" },
              ].map((mood) => (
                <Pressable
                  key={mood.key}
                  onPress={() => setProfile({ ...profile, currentMood: mood.key as any })}
                >
                  <Card style={{ marginBottom: 12, borderWidth: profile.currentMood === mood.key ? 2 : 0, borderColor: "#2d9039" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 32, marginRight: 12 }}>{mood.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25" }}>
                          {mood.label}
                        </Text>
                        <Text style={{ fontSize: 13, color: "#878773" }}>
                          {mood.desc}
                        </Text>
                      </View>
                      {profile.currentMood === mood.key && (
                        <Text style={{ fontSize: 24, color: "#2d9039" }}>✓</Text>
                      )}
                    </View>
                  </Card>
                </Pressable>
              ))}

              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25", marginTop: 24, marginBottom: 16 }}>
                Meal Type
              </Text>

              {[
                { key: "breakfast", label: "Breakfast", icon: "🌅" },
                { key: "lunch", label: "Lunch", icon: "☀️" },
                { key: "dinner", label: "Dinner", icon: "🌙" },
                { key: "snack", label: "Snack", icon: "🍎" },
                { key: "post_yoga", label: "Post-Yoga", icon: "🧘" },
              ].map((meal) => (
                <Pressable
                  key={meal.key}
                  onPress={() => setMealType(meal.key as any)}
                >
                  <Card style={{ marginBottom: 12, borderWidth: mealType === meal.key ? 2 : 0, borderColor: "#f59e0b" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 32, marginRight: 12 }}>{meal.icon}</Text>
                      <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25", flex: 1 }}>
                        {meal.label}
                      </Text>
                      {mealType === meal.key && (
                        <Text style={{ fontSize: 24, color: "#f59e0b" }}>✓</Text>
                      )}
                    </View>
                  </Card>
                </Pressable>
              ))}

              <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                <Button onPress={() => setStep(1)} variant="outline" style={{ flex: 1 }}>
                  ← Back
                </Button>
                <Button onPress={handleGenerateMeal} variant="secondary" style={{ flex: 1 }}>
                  Generate Meal 🎯
                </Button>
              </View>
            </View>
          )}

          {/* Step 3: Generated Meal */}
          {step === 3 && (
            <View>
              {isGenerating ? (
                <Loading message="AI is crafting your perfect Sattvic meal..." />
              ) : generatedMeal && (
                <View>
                  {/* Pranic Score */}
                  <LinearGradient
                    colors={["#fff8db", "#ffefb0"]}
                    style={{
                      borderRadius: 20,
                      padding: 20,
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <Text style={{ fontSize: 48, marginRight: 12 }}>✨</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#472805" }}>
                          Pranic Score: {generatedMeal.pranicValue.score}/10
                        </Text>
                        <Text style={{ fontSize: 13, color: "#7d4e12" }}>
                          {generatedMeal.pranicValue.energyType.toUpperCase()} Energy
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 14, color: "#5c4a0e", lineHeight: 22 }}>
                      {generatedMeal.pranicValue.explanation}
                    </Text>
                  </LinearGradient>

                  {/* Recipe Name */}
                  <Text style={{ fontSize: 26, fontWeight: "700", color: "#1c4b25", marginBottom: 8 }}>
                    {generatedMeal.name}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#878773", lineHeight: 22, marginBottom: 20 }}>
                    {generatedMeal.description}
                  </Text>

                  {/* Macros */}
                  <Card style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#1c4b25", marginBottom: 12 }}>
                      Nutrition Profile
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "700", color: "#2d9039" }}>
                          {generatedMeal.nutrition.calories}
                        </Text>
                        <Text style={{ fontSize: 12, color: "#878773" }}>Calories</Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "700", color: "#2d9039" }}>
                          {generatedMeal.nutrition.protein}g
                        </Text>
                        <Text style={{ fontSize: 12, color: "#878773" }}>Protein</Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "700", color: "#2d9039" }}>
                          {generatedMeal.nutrition.carbs}g
                        </Text>
                        <Text style={{ fontSize: 12, color: "#878773" }}>Carbs</Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "700", color: "#2d9039" }}>
                          {generatedMeal.nutrition.fat}g
                        </Text>
                        <Text style={{ fontSize: 12, color: "#878773" }}>Fat</Text>
                      </View>
                    </View>
                  </Card>

                  {/* Mood Balance */}
                  <Card variant="filled" style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#1c4b25", marginBottom: 8 }}>
                      🎭 Mood Balance
                    </Text>
                    <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                      {generatedMeal.moodBalance}
                    </Text>
                  </Card>

                  {/* Chakra Alignment */}
                  {generatedMeal.chakraAlignment && (
                    <Card variant="filled" style={{ marginBottom: 20 }}>
                      <Text style={{ fontSize: 16, fontWeight: "700", color: "#1c4b25", marginBottom: 8 }}>
                        🕉️ Chakra Alignment
                      </Text>
                      <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                        {generatedMeal.chakraAlignment}
                      </Text>
                    </Card>
                  )}

                  {/* Mindfulness Tip */}
                  <LinearGradient
                    colors={["#e1f8e6", "#c3eec9"]}
                    style={{
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#1c4b25", marginBottom: 8 }}>
                      🧘 Mindfulness Tip
                    </Text>
                    <Text style={{ fontSize: 14, color: "#1c4b25", lineHeight: 22, fontStyle: "italic" }}>
                      "{generatedMeal.mindfulnessTip}"
                    </Text>
                  </LinearGradient>

                  {/* Ingredients */}
                  <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 12 }}>
                    Ingredients
                  </Text>
                  <Card style={{ marginBottom: 20 }}>
                    {generatedMeal.ingredients.map((ing, idx) => (
                      <View
                        key={idx}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: 8,
                          borderBottomWidth: idx < generatedMeal.ingredients.length - 1 ? 1 : 0,
                          borderBottomColor: "#f2f2ea",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#1c4b25", flex: 1 }}>
                          • {ing.item}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#878773" }}>
                          {ing.quantity}
                        </Text>
                      </View>
                    ))}
                  </Card>

                  {/* Instructions */}
                  <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 12 }}>
                    Instructions
                  </Text>
                  {generatedMeal.instructions.map((step, idx) => (
                    <View key={idx} style={{ flexDirection: "row", marginBottom: 12 }}>
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: "#e1f8e6",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                        }}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "600", color: "#2d9039" }}>
                          {idx + 1}
                        </Text>
                      </View>
                      <Text style={{ flex: 1, fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                        {step}
                      </Text>
                    </View>
                  ))}

                  <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                    <Button onPress={() => setStep(1)} variant="outline" style={{ flex: 1 }}>
                      New Plan
                    </Button>
                    <Button onPress={() => router.back()} variant="secondary" style={{ flex: 1 }}>
                      Done ✓
                    </Button>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
