import React from "react";
import { View, Text, Pressable, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  onPress,
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  style,
}: ButtonProps) {
  const baseStyles: ViewStyle = {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    opacity: disabled ? 0.5 : 1,
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingVertical: 8, paddingHorizontal: 12 },
    md: { paddingVertical: 12, paddingHorizontal: 20 },
    lg: { paddingVertical: 16, paddingHorizontal: 28 },
  };

  const gradientColors: Record<string, string[]> = {
    primary: ["#2d9039", "#1c6b28"],
    secondary: ["#f59e0b", "#d97706"],
    outline: ["transparent", "transparent"],
    ghost: ["transparent", "transparent"],
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: "transparent" },
    secondary: { backgroundColor: "transparent" },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#2d9039",
    },
    ghost: { backgroundColor: "transparent" },
  };

  const textStyles: Record<string, TextStyle> = {
    primary: { color: "#ffffff", fontWeight: "600" },
    secondary: { color: "#ffffff", fontWeight: "600" },
    outline: { color: "#2d9039", fontWeight: "600" },
    ghost: { color: "#2d9039", fontWeight: "600" },
  };

  const textSizeStyles: Record<string, TextStyle> = {
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 },
  };

  const useGradient = variant === "primary" || variant === "secondary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[baseStyles, sizeStyles[size], style]}
    >
      {useGradient ? (
        <LinearGradient
          colors={gradientColors[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            {
              borderRadius: 12,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
            sizeStyles[size],
          ]}
        >
          <Text style={[textStyles[variant], textSizeStyles[size]]}>
            {children}
          </Text>
        </LinearGradient>
      ) : (
        <View style={[variantStyles[variant], { width: "100%" }]}>
          <Text style={[textStyles[variant], textSizeStyles[size]]}>
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
