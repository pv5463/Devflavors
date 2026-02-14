import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, CardHeader, Badge } from "./Card";
import { SubstitutionBlend } from "../types";

interface SubstitutionDisplayProps {
  substitution: SubstitutionBlend;
}

export function SubstitutionDisplay({ substitution }: SubstitutionDisplayProps) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <Card variant="filled" style={{ marginBottom: 16 }}>
        <CardHeader
          title="Molecular Profile"
          subtitle={`Target: ${substitution.targetIngredient}`}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#e1f8e6",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 14, color: "#1c4b25" }}>
            Flavor Similarity
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#2d9039",
            }}
          >
            {substitution.flavorSimilarity}%
          </Text>
        </View>
      </Card>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#1c4b25",
          marginBottom: 12,
        }}
      >
        Substitution Blend
      </Text>

      {substitution.substitutes.map((sub, index) => (
        <Card key={sub.ingredient.id} style={{ marginBottom: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1c4b25",
                }}
              >
                {index + 1}. {sub.ingredient.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#878773",
                  marginTop: 2,
                }}
              >
                Use ratio: {(sub.ratio * 100).toFixed(0)}% of original quantity
              </Text>
            </View>
            <Badge variant="success">
              {(sub.ratio * 100).toFixed(0)}%
            </Badge>
          </View>

          <View
            style={{
              backgroundColor: "#f9f9f6",
              padding: 10,
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#5c5c50",
                fontStyle: "italic",
              }}
            >
              {sub.reason}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              color: "#878773",
              marginTop: 8,
            }}
          >
            Matching compounds: {sub.matchingCompounds.slice(0, 3).join(", ")}
          </Text>
        </Card>
      ))}

      <Card style={{ marginTop: 8, marginBottom: 16 }}>
        <CardHeader
          title="Scientific Basis"
          subtitle="Based on FlavorDB molecular data"
        />
        <Text
          style={{
            fontSize: 14,
            color: "#5c5c50",
            lineHeight: 20,
          }}
        >
          {substitution.scientificBasis}
        </Text>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <CardHeader
          title="Preparation Notes"
          subtitle="For optimal flavor extraction"
        />
        <Text
          style={{
            fontSize: 14,
            color: "#5c5c50",
            lineHeight: 20,
          }}
        >
          {substitution.preparationNotes}
        </Text>
      </Card>
    </ScrollView>
  );
}
