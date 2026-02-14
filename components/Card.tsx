import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "filled";
  style?: ViewStyle;
}

export function Card({ children, variant = "default", style }: CardProps) {
  const baseStyles: ViewStyle = {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#1c4b25",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  };

  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: "#ffffff" },
    outlined: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#e8e8dc",
      shadowOpacity: 0,
      elevation: 0,
    },
    filled: { backgroundColor: "#f2fcf4" },
  };

  return (
    <View style={[baseStyles, variantStyles[variant], style]}>{children}</View>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, icon }: CardHeaderProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      {icon && <View style={{ marginRight: 12 }}>{icon}</View>}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1c4b25",
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 14,
              color: "#878773",
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: "#f2f2ea" },
    success: { backgroundColor: "#c3eec9" },
    warning: { backgroundColor: "#ffefb0" },
    error: { backgroundColor: "#ffcaca" },
    info: { backgroundColor: "#d9d9c8" },
  };

  const textStyles: Record<string, TextStyle> = {
    default: { color: "#5c5c50" },
    success: { color: "#1c4b25" },
    warning: { color: "#7d4e12" },
    error: { color: "#7f1d1d" },
    info: { color: "#5c5c50" },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
    md: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  };

  const textSizeStyles: Record<string, TextStyle> = {
    sm: { fontSize: 12, fontWeight: "500" },
    md: { fontSize: 14, fontWeight: "600" },
  };

  return (
    <View style={[variantStyles[variant], sizeStyles[size]]}>
      <Text style={[textStyles[variant], textSizeStyles[size]]}>{children}</Text>
    </View>
  );
}
