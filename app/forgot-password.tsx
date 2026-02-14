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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    const { error } = await AuthService.resetPassword(email);
    setIsLoading(false);

    if (error) {
      const errorMessage = error instanceof Error ? error.message : "Could not send reset email";
      Alert.alert("Error", errorMessage);
      return;
    }

    Alert.alert(
      "Success!",
      "Password reset link has been sent to your email.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
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
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            style={{ marginBottom: 20, padding: 8 }}
          >
            <Text style={{ fontSize: 24, color: "#1c4b25" }}>←</Text>
          </Pressable>

          {/* Header */}
          <View style={{ alignItems: "center", marginTop: 40, marginBottom: 40 }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 28,
                backgroundColor: "#e1f8e6",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 52 }}>🔑</Text>
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#1c4b25",
                marginBottom: 8,
              }}
            >
              Reset Password
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#878773",
                textAlign: "center",
                paddingHorizontal: 20,
              }}
            >
              Enter your email and we'll send you a link to reset your password
            </Text>
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 32 }}>
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

          {/* Reset Button */}
          <Button
            onPress={handleResetPassword}
            size="lg"
            disabled={isLoading}
            style={{ marginBottom: 20 }}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* Back to Login */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#878773" }}>
              Remember your password?{" "}
            </Text>
            <Pressable onPress={() => router.back()}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
