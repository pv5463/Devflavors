import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../components/Button";
import { AuthService } from "../services/supabase";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const { data, error } = await AuthService.signUp(email, password, fullName);
    setIsLoading(false);

    if (error) {
      const errorMessage = error instanceof Error ? error.message : "Could not create account";
      Alert.alert("Signup Failed", errorMessage);
      return;
    }

    // Success - redirect to home
    Alert.alert(
      "Success!",
      "Account created successfully!",
      [
        {
          text: "OK",
          onPress: () => router.replace("/home"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfdfc" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ alignItems: "center", marginTop: 40, marginBottom: 40 }}>
            <LinearGradient
              colors={["#2d9039", "#1c6b28"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 100,
                height: 100,
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
              <Text style={{ fontSize: 52 }}>🌿</Text>
            </LinearGradient>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#1c4b25",
                marginBottom: 8,
              }}
            >
              Create Account
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#878773",
                textAlign: "center",
              }}
            >
              Join the Sattvic community today
            </Text>
          </View>

          {/* Signup Form */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1c4b25",
                marginBottom: 8,
              }}
            >
              Full Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
              placeholderTextColor="#a8a890"
              autoCapitalize="words"
              autoComplete="name"
              style={{
                backgroundColor: "#f9f9f6",
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 16,
                fontSize: 16,
                color: "#1c4b25",
                borderWidth: 2,
                borderColor: "#e8e8e0",
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1c4b25",
                marginBottom: 8,
              }}
            >
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor="#a8a890"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={{
                backgroundColor: "#f9f9f6",
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 16,
                fontSize: 16,
                color: "#1c4b25",
                borderWidth: 2,
                borderColor: "#e8e8e0",
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1c4b25",
                marginBottom: 8,
              }}
            >
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#a8a890"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={{
                backgroundColor: "#f9f9f6",
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 16,
                fontSize: 16,
                color: "#1c4b25",
                borderWidth: 2,
                borderColor: "#e8e8e0",
              }}
            />
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1c4b25",
                marginBottom: 8,
              }}
            >
              Confirm Password
            </Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor="#a8a890"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={{
                backgroundColor: "#f9f9f6",
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 16,
                fontSize: 16,
                color: "#1c4b25",
                borderWidth: 2,
                borderColor: "#e8e8e0",
              }}
            />
          </View>

          {/* Signup Button */}
          <Button
            onPress={handleSignup}
            size="lg"
            disabled={isLoading}
            style={{ marginBottom: 20 }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#878773" }}>
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#2d9039",
                  fontWeight: "700",
                }}
              >
                Sign In
              </Text>
            </Pressable>
          </View>

          {/* Skip for Now */}
          <Pressable
            onPress={() => router.replace("/home")}
            style={{ marginTop: 32, alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#a8a890",
                fontWeight: "600",
              }}
            >
              Skip for now
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
