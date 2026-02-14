import { useRouter } from "expo-router";
import { View, Text, ScrollView, Animated, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader } from "../components/Card";
import { Button } from "../components/Button";
import { APIHealthService, APIHealthStatus } from "../services/api-health";

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [apiStatus, setApiStatus] = useState<APIHealthStatus | null>(null);

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

    // Check API health on mount
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    const status = await APIHealthService.checkAll();
    setApiStatus(status);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Header */}
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
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              shadowColor: "#2d9039",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Text style={{ fontSize: 48 }}>≡ƒî┐</Text>
          </LinearGradient>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#1c4b25",
              textAlign: "center",
              letterSpacing: -0.5,
            }}
          >
            Devflavors
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "#878773",
              textAlign: "center",
              marginTop: 8,
              fontWeight: "500",
            }}
          >
            Sacred Science ΓÇó Pure Living
          </Text>
        </Animated.View>

        {/* Premium Info Card */}
        <LinearGradient
          colors={["#e1f8e6", "#c3eec9"]}
          style={{
            borderRadius: 24,
            padding: 24,
            marginBottom: 20,
            shadowColor: "#2d9039",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: "rgba(255,255,255,0.7)",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 24 }}>≡ƒòë∩╕Å</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c4b25" }}>
                Navratri ΓÇó Ekadashi Mode
              </Text>
              <Text style={{ fontSize: 14, color: "#257330", marginTop: 2 }}>
                No Onion ΓÇó No Garlic ΓÇó Pure Sattvic
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, color: "#1c4b25", lineHeight: 22 }}>
            Our FlavorDB-powered molecular engine finds scientifically-valid substitutes 
            that replicate forbidden ingredient flavors using pure Sattvic alternatives.
          </Text>
        </LinearGradient>

        {/* API Status Card */}
        {apiStatus && (
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 20,
              padding: 20,
              marginBottom: 32,
              shadowColor: "#1c4b25",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#1c4b25", marginBottom: 12 }}>
              ≡ƒîÉ API Status
            </Text>
            
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: apiStatus.recipeDB.status === 'online' ? "#2d9039" : "#f14141",
                  marginRight: 8,
                }}
              />
              <Text style={{ fontSize: 14, color: "#5c5c50", flex: 1 }}>
                RecipeDB: {apiStatus.recipeDB.status === 'online' ? 'Connected' : 'Offline'}
              </Text>
              {apiStatus.recipeDB.responseTime && (
                <Text style={{ fontSize: 12, color: "#878773" }}>
                  {apiStatus.recipeDB.responseTime}ms
                </Text>
              )}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: apiStatus.flavorDB.status === 'online' ? "#2d9039" : "#f14141",
                  marginRight: 8,
                }}
              />
              <Text style={{ fontSize: 14, color: "#5c5c50", flex: 1 }}>
                FlavorDB: {apiStatus.flavorDB.status === 'online' ? 'Connected' : 'Offline'}
              </Text>
              {apiStatus.flavorDB.responseTime && (
                <Text style={{ fontSize: 12, color: "#878773" }}>
                  {apiStatus.flavorDB.responseTime}ms
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#1c4b25",
            marginBottom: 16,
          }}
        >
          Quick Actions
        </Text>

        <Button
          onPress={() => router.push("/substitute")}
          size="lg"
          style={{ marginBottom: 32 }}
        >
          ≡ƒö¼ Find Molecular Substitutes
        </Button>

        {/* Featured Substitutions */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#1c4b25",
            marginBottom: 16,
          }}
        >
          Popular Substitutions
        </Text>

        <Pressable onPress={() => router.push("/substitute")}>
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
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "#ffcaca",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 36 }}>≡ƒºä</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 4 }}>
                  Garlic Substitute
                </Text>
                <Text style={{ fontSize: 14, color: "#878773", marginBottom: 8 }}>
                  Molecular flavor matching
                </Text>
                <Text style={{ fontSize: 13, color: "#2d9039", fontWeight: "600" }}>
                  ΓåÆ Asafoetida + Cumin + Ginger
                </Text>
              </View>
              <Text style={{ fontSize: 28, color: "#2d9039" }}>ΓåÆ</Text>
            </View>
          </LinearGradient>
        </Pressable>

        <Pressable onPress={() => router.push("/substitute")}>
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
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "#ffefb0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 36 }}>≡ƒºà</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1c4b25", marginBottom: 4 }}>
                  Onion Substitute
                </Text>
                <Text style={{ fontSize: 14, color: "#878773", marginBottom: 8 }}>
                  Compound-level analysis
                </Text>
                <Text style={{ fontSize: 13, color: "#2d9039", fontWeight: "600" }}>
                  ΓåÆ Asafoetida + Fenugreek + Cumin
                </Text>
              </View>
              <Text style={{ fontSize: 28, color: "#2d9039" }}>ΓåÆ</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Features */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#1c4b25",
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          Why Devflavors?
        </Text>

        <View style={{ marginBottom: 16 }}>
          <Card style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 32, marginRight: 16 }}>≡ƒôû</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25", marginBottom: 4 }}>
                  Sacred Stories
                </Text>
                <Text style={{ fontSize: 13, color: "#878773", lineHeight: 20 }}>
                  Every fasting recipe comes with authentic mythological stories and spiritual significance
                </Text>
              </View>
            </View>
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 32, marginRight: 16 }}>≡ƒö¼</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25", marginBottom: 4 }}>
                  Scientific Precision
                </Text>
                <Text style={{ fontSize: 13, color: "#878773", lineHeight: 20 }}>
                  FlavorDB-powered molecular substitution for authentic taste without forbidden ingredients
                </Text>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 32, marginRight: 16 }}>≡ƒô╖</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1c4b25", marginBottom: 4 }}>
                  AI Scanner
                </Text>
                <Text style={{ fontSize: 13, color: "#878773", lineHeight: 20 }}>
                  Real-time camera scanning to instantly check Sattvic compliance of any ingredient
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", marginTop: 32, marginBottom: 20 }}>
          <Text style={{ fontSize: 12, color: "#a8a890" }}>
            Powered by FlavorDB & RecipeDB (CoSy Lab)
          </Text>
          <Text style={{ fontSize: 12, color: "#a8a890", marginTop: 4 }}>
            Sacred Science ΓÇó Modern Technology
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
