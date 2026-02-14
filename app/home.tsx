import { useRouter } from "expo-router";
import { View, Text, ScrollView, Animated, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { AuthService } from "../services/supabase";

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    checkUser();
  }, []);

  const checkUser = async () => {
    const { user } = await AuthService.getCurrentUser();
    setUser(user);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Button */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 20 }}>
          <Pressable
            onPress={() => router.push(user ? "/profile" : "/login")}
            style={{
              backgroundColor: "#e1f8e6",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#1c6b28" }}>
              {user ? "Profile" : "Sign In"}
            </Text>
          </Pressable>
        </View>

        {/* Premium Hero Section */}
        <Animated.View 
          style={{ 
            alignItems: "center", 
            marginBottom: 32,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <LinearGradient
            colors={["#2d9039", "#1c6b28"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              shadowColor: "#2d9039",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
              elevation: 16,
            }}
          >
            <Text style={{ fontSize: 48, color: "#ffffff" }}>🌿</Text>
          </LinearGradient>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "900",
              color: "#1c4b25",
              textAlign: "center",
              letterSpacing: -1,
              marginBottom: 8,
            }}
          >
            Devflavors
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#878773",
              textAlign: "center",
              fontWeight: "600",
              letterSpacing: 0.5,
            }}
          >
            Sacred Science and Pure Living
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              backgroundColor: "#e1f8e6",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#1c6b28",
                fontWeight: "700",
              }}
            >
              100% Sattvic - No Onion - No Garlic
            </Text>
          </View>
        </Animated.View>

        {/* Mission Statement */}
        <LinearGradient
          colors={["#ffffff", "#f9f9f6"]}
          style={{
            borderRadius: 24,
            padding: 24,
            marginBottom: 32,
            shadowColor: "#1c4b25",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 8,
            borderWidth: 1,
            borderColor: "#e8e8e0",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: "#e1f8e6",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Text style={{ fontSize: 28, color: "#2d9039" }}>🔬</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#1c4b25", marginBottom: 4 }}>
                Molecular Precision
              </Text>
              <Text style={{ fontSize: 14, color: "#2d9039", fontWeight: "600" }}>
                FlavorDB-Powered Engine
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, color: "#5c5c50", lineHeight: 24 }}>
            Our advanced molecular engine analyzes flavor compounds to find scientifically-valid 
            Sattvic substitutes that replicate forbidden ingredients while maintaining authentic taste.
          </Text>
        </LinearGradient>

        {/* Quick Actions */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: "#1c4b25",
            marginBottom: 20,
          }}
        >
          Explore Features
        </Text>

        {/* Stats Grid */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#e1f8e6",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: "900", color: "#1c6b28", marginBottom: 4 }}>
              8+
            </Text>
            <Text style={{ fontSize: 13, color: "#257330", fontWeight: "600", textAlign: "center" }}>
              Sacred Recipes
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff8e1",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: "900", color: "#92400e", marginBottom: 4 }}>
              100%
            </Text>
            <Text style={{ fontSize: 13, color: "#92400e", fontWeight: "600", textAlign: "center" }}>
              Sattvic Pure
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fce7f3",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: "900", color: "#9f1239", marginBottom: 4 }}>
              AI
            </Text>
            <Text style={{ fontSize: 13, color: "#9f1239", fontWeight: "600", textAlign: "center" }}>
              Powered
            </Text>
          </View>
        </View>

        <Button
          onPress={() => router.push("/substitute")}
          size="lg"
          style={{ marginBottom: 16 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#ffffff" }}>
              Find Molecular Substitutes
            </Text>
          </View>
        </Button>

        {/* Popular Substitutions */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: "#1c4b25",
            marginBottom: 20,
            marginTop: 16,
          }}
        >
          Popular Substitutions
        </Text>

        <Pressable 
          onPress={() => router.push("/substitute")}
          style={{ marginBottom: 16 }}
        >
          <LinearGradient
            colors={["#ffffff", "#fff5f5"]}
            style={{
              borderRadius: 24,
              padding: 24,
              shadowColor: "#1c4b25",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 8,
              borderWidth: 1,
              borderColor: "#ffe0e0",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  backgroundColor: "#ffcaca",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                }}
              >
                <Text style={{ fontSize: 40, color: "#dc2626" }}>🧄</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: "#1c4b25", marginBottom: 6 }}>
                  Garlic Substitute
                </Text>
                <Text style={{ fontSize: 14, color: "#878773", marginBottom: 10 }}>
                  Molecular flavor matching
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#e1f8e6",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#2d9039", fontWeight: "700" }}>
                    Asafoetida + Cumin + Ginger
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Pressable>

        <Pressable 
          onPress={() => router.push("/substitute")}
          style={{ marginBottom: 32 }}
        >
          <LinearGradient
            colors={["#ffffff", "#fffef5"]}
            style={{
              borderRadius: 24,
              padding: 24,
              shadowColor: "#1c4b25",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 8,
              borderWidth: 1,
              borderColor: "#fff0d0",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  backgroundColor: "#ffefb0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                }}
              >
                <Text style={{ fontSize: 40, color: "#ca8a04" }}>🧅</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: "#1c4b25", marginBottom: 6 }}>
                  Onion Substitute
                </Text>
                <Text style={{ fontSize: 14, color: "#878773", marginBottom: 10 }}>
                  Compound-level analysis
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#e1f8e6",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#2d9039", fontWeight: "700" }}>
                    Asafoetida + Fenugreek + Cumin
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Features */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: "#1c4b25",
            marginBottom: 20,
          }}
        >
          Why Devflavors?
        </Text>

        <View style={{ marginBottom: 32 }}>
          <LinearGradient
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
              borderWidth: 1,
              borderColor: "#e8e8e0",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "#e1f8e6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 28, color: "#2d9039" }}>📖</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 6 }}>
                  Sacred Stories
                </Text>
                <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                  Every fasting recipe comes with authentic mythological stories and spiritual significance
                </Text>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
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
              borderWidth: 1,
              borderColor: "#e8e8e0",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "#e1f8e6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 28, color: "#2d9039" }}>🧠</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 6 }}>
                  AI Meal Planner
                </Text>
                <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                  Personalized meal plans based on your goals, activity level, and mood with pranic scoring
                </Text>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#ffffff", "#f9f9f6"]}
            style={{
              borderRadius: 20,
              padding: 20,
              shadowColor: "#1c4b25",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
              borderWidth: 1,
              borderColor: "#e8e8e0",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "#e1f8e6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 28, color: "#2d9039" }}>📷</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 6 }}>
                  Smart Scanner
                </Text>
                <Text style={{ fontSize: 14, color: "#5c5c50", lineHeight: 22 }}>
                  Real-time camera scanning to instantly check Sattvic compliance and generate recipes
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", marginTop: 32, marginBottom: 20 }}>
          <Text style={{ fontSize: 12, color: "#a8a890" }}>
            Powered by FlavorDB and RecipeDB
          </Text>
          <Text style={{ fontSize: 12, color: "#a8a890", marginTop: 4 }}>
            Sacred Science and Modern Technology
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
