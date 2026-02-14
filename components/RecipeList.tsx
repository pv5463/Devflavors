import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { Card, Badge } from "./Card";
import { Loading } from "./Loading";
import { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  isLoading?: boolean;
  favorites?: string[];
  onToggleFavorite?: (recipeId: string) => void;
}

export function RecipeList({
  recipes,
  onSelectRecipe,
  isLoading,
  favorites,
  onToggleFavorite,
}: RecipeListProps) {
  const renderRecipe = ({ item }: { item: Recipe }) => {
    const isFav = favorites?.includes(item.id);
    const forbiddenCount = item.ingredients.filter((i) => i.isForbidden).length;

    // Generate recipe image URL based on recipe name
    const getRecipeImage = (recipe: Recipe) => {
      // Use a placeholder image service with recipe-related keywords
      const keywords = recipe.name.toLowerCase().replace(/\s+/g, '-');
      return `https://source.unsplash.com/400x300/?${keywords},indian-food,vegetarian`;
    };

    return (
      <Pressable onPress={() => onSelectRecipe(item)}>
        <Card style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Image
              source={{ uri: getRecipeImage(item) }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                backgroundColor: "#f2fcf4",
              }}
              resizeMode="cover"
            />

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1c4b25",
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                {onToggleFavorite && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    style={{ padding: 4 }}
                  >
                    <Text style={{ fontSize: 20 }}>
                      {isFav ? "⭐" : "☆"}
                    </Text>
                  </Pressable>
                )}
              </View>

              <Text
                style={{
                  fontSize: 13,
                  color: "#878773",
                  marginTop: 2,
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <Badge variant={item.sattvicStatus === "pure" ? "success" : "warning"}>
                  {item.sattvicStatus === "pure" ? "✓ Sattvic" : "Modified"}
                </Badge>
                {forbiddenCount > 0 && (
                  <Badge variant="error">{forbiddenCount} subs</Badge>
                )}
                <Badge variant="default">
                  ⏱ {item.prepTime + item.cookTime} min
                </Badge>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
    );
  };

  if (isLoading) {
    return <Loading message="Loading delicious Sattvic recipes..." />;
  }

  return (
    <FlatList
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={{ padding: 32, alignItems: "center" }}>
          <Text style={{ color: "#878773", textAlign: "center" }}>
            No recipes found
          </Text>
        </View>
      }
    />
  );
}
