import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MythologicalStory } from "../types";

interface MythologyCardProps {
  mythology: MythologicalStory;
}

export function MythologyCard({ mythology }: MythologyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff8db", "#ffefb0"]}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📖</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.label}>Sacred Story</Text>
            <Text style={styles.title}>{mythology.title}</Text>
            {mythology.deity && (
              <Text style={styles.deity}>🙏 {mythology.deity}</Text>
            )}
          </View>
        </View>

        {/* Story Preview/Full */}
        <View style={styles.content}>
          <Text
            style={styles.story}
            numberOfLines={isExpanded ? undefined : 3}
          >
            {mythology.story}
          </Text>

          {!isExpanded && (
            <Pressable
              onPress={() => setIsExpanded(true)}
              style={styles.expandButton}
            >
              <LinearGradient
                colors={["#f59e0b", "#d97706"]}
                style={styles.expandGradient}
              >
                <Text style={styles.expandText}>Read Full Story ✨</Text>
              </LinearGradient>
            </Pressable>
          )}
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Significance */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🌟 Significance</Text>
              <Text style={styles.sectionText}>{mythology.significance}</Text>
            </View>

            {/* Ritual */}
            {mythology.ritual && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🕉️ Ritual</Text>
                <Text style={styles.sectionText}>{mythology.ritual}</Text>
              </View>
            )}

            {/* Benefits */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✨ Spiritual Benefits</Text>
              {mythology.benefits.map((benefit, idx) => (
                <View key={idx} style={styles.benefitRow}>
                  <Text style={styles.benefitBullet}>•</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() => setIsExpanded(false)}
              style={styles.collapseButton}
            >
              <Text style={styles.collapseText}>Show Less ↑</Text>
            </Pressable>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#c27808",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#c27808",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 28,
  },
  headerText: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9a5f0e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#472805",
    marginBottom: 4,
  },
  deity: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7d4e12",
  },
  content: {
    marginBottom: 12,
  },
  story: {
    fontSize: 15,
    lineHeight: 24,
    color: "#5c4a0e",
    marginBottom: 12,
  },
  expandButton: {
    marginTop: 8,
  },
  expandGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  expandText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  expandedContent: {
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#472805",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#5c4a0e",
  },
  benefitRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  benefitBullet: {
    fontSize: 16,
    color: "#f59e0b",
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: "#5c4a0e",
  },
  collapseButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  collapseText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9a5f0e",
  },
});
