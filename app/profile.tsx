import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../components/Button";
import { AuthService } from "../services/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { user } = await AuthService.getCurrentUser();
    if (!user) {
      router.replace("/login");
      return;
    }
    setUser(user);
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await AuthService.signOut();
            router.replace("/login");
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#878773" }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={{ marginBottom: 20, padding: 8 }}
        >
          <Text style={{ fontSize: 24, color: "#1c4b25" }}>←</Text>
        </Pressable>

        {/* Profile Header */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <LinearGradient
            colors={["#2d9039", "#1c6b28"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
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
            <Text style={{ fontSize: 56 }}>👤</Text>
          </LinearGradient>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: "#1c4b25",
              marginBottom: 8,
            }}
          >
            {user?.user_metadata?.full_name || "User"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#878773",
            }}
          >
            {user?.email}
          </Text>
        </View>

        {/* Account Info */}
        <View
          style={{
            backgroundColor: "#f9f9f6",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1c4b25",
              marginBottom: 16,
            }}
          >
            Account Information
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#878773",
                marginBottom: 4,
              }}
            >
              Email
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#1c4b25",
                fontWeight: "600",
              }}
            >
              {user?.email}
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#878773",
                marginBottom: 4,
              }}
            >
              Member Since
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#1c4b25",
                fontWeight: "600",
              }}
            >
              {new Date(user?.created_at).toLocaleDateString()}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#878773",
                marginBottom: 4,
              }}
            >
              Status
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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
                  fontSize: 16,
                  color: "#2d9039",
                  fontWeight: "600",
                }}
              >
                Active
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 32,
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
              0
            </Text>
            <Text style={{ fontSize: 13, color: "#257330", fontWeight: "600", textAlign: "center" }}>
              Favorites
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
              0
            </Text>
            <Text style={{ fontSize: 13, color: "#92400e", fontWeight: "600", textAlign: "center" }}>
              Recipes Tried
            </Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <Button
          onPress={handleSignOut}
          variant="outline"
          size="lg"
          style={{ marginBottom: 20 }}
        >
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
