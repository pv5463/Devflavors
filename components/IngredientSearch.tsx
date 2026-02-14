import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { Card, Badge } from "./Card";
import { Loading } from "./Loading";
import { Ingredient } from "../types";
import { FlavorDBService } from "../services/flavordb";

interface IngredientSearchProps {
  onSelectIngredient: (ingredient: Ingredient) => void;
  showForbiddenOnly?: boolean;
}

export function IngredientSearch({
  onSelectIngredient,
  showForbiddenOnly = false,
}: IngredientSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      let ingredients = await FlavorDBService.searchIngredient(text);
      if (showForbiddenOnly) {
        ingredients = ingredients.filter((i) => i.sattvicStatus === "forbidden");
      }
      setResults(ingredients);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "forbidden":
        return "error" as const;
      case "allowed":
        return "success" as const;
      case "restricted":
        return "warning" as const;
      default:
        return "default" as const;
    }
  };

  const renderIngredient = ({ item }: { item: Ingredient }) => (
    <Pressable onPress={() => onSelectIngredient(item)}>
      <Card style={{ marginBottom: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#878773",
                marginTop: 2,
              }}
            >
              {item.compounds.length} flavor compounds • {item.category}
            </Text>
          </View>
          <Badge variant={getStatusColor(item.sattvicStatus)}>
            {item.sattvicStatus}
          </Badge>
        </View>
      </Card>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#f9f9f6",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
        }}
      >
        <TextInput
          value={query}
          onChangeText={handleSearch}
          placeholder="Search ingredients..."
          placeholderTextColor="#878773"
          style={{
            fontSize: 16,
            color: "#1c4b25",
          }}
        />
      </View>

      {isLoading ? (
        <View style={{ marginTop: 32 }}>
          <Loading message="Searching ingredients..." />
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            query.length > 1 ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "#878773",
                  marginTop: 32,
                }}
              >
                No ingredients found
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
