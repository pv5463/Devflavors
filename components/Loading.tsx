import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Loading..." }: LoadingProps) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();
    return () => spin.stop();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate }],
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 48 }}>🌿</Text>
      </Animated.View>
      <Text
        style={{
          fontSize: 16,
          color: "#878773",
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
}
