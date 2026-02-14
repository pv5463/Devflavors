import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e8e8e0",
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            elevation: 8,
            shadowColor: "#1c4b25",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarActiveTintColor: "#2d9039",
          tabBarInactiveTintColor: "#878773",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: focused ? "#e1f8e6" : "transparent",
                }}
              >
                <Text style={{ fontSize: 24 }}>🏠</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="recipes"
          options={{
            title: "Recipes",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: focused ? "#e1f8e6" : "transparent",
                }}
              >
                <Text style={{ fontSize: 24 }}>📖</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: focused ? "#2d9039" : "#e1f8e6",
                  marginTop: -20,
                  borderWidth: 4,
                  borderColor: "#ffffff",
                  shadowColor: "#2d9039",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Text style={{ fontSize: 28 }}>📷</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="meal-planner"
          options={{
            title: "AI Planner",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: focused ? "#e1f8e6" : "transparent",
                }}
              >
                <Text style={{ fontSize: 24 }}>🧠</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="fast-food-sub"
          options={{
            title: "Fast Food",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: focused ? "#e1f8e6" : "transparent",
                }}
              >
                <Text style={{ fontSize: 24 }}>🍔</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="substitute"
          options={{
            href: null, // Hide from tabs but keep accessible
          }}
        />
        <Tabs.Screen
          name="recipe/[id]"
          options={{
            href: null, // Hide from tabs but keep accessible
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
