# API Integration Guide

## Overview
Devflavors now uses real-time data from two powerful APIs:
- **RecipeDB API**: Recipe database with 2M+ recipes
- **FlavorDB API**: Molecular flavor compound database

## API Status
✅ **ENABLED** - Both APIs are now active and fetching live data

## Configuration

### API Keys
Both APIs use the same authentication key:
```
API_KEY: vycVFejHYvzkX71rJpoDEvjE6NUY9d3LWd8eE28sdX0Nna28
```

### Base URLs
- RecipeDB: `https://api.foodoscope.com/recipe2-api`
- FlavorDB: `https://api.foodoscope.com/flavordb`

## Features

### 1. RecipeDB Integration (`services/recipedb-api.ts`)

**Available Endpoints:**
- `GET /recipe/recipesinfo` - Get paginated recipes
- `GET /recipe/search-recipe/:id` - Get recipe by ID
- `GET /recipe/instructions/:id` - Get cooking instructions
- `GET /recipe/nutritioninfo` - Get nutrition data
- `GET /recipe/recipeByTitle` - Search recipes by title
- `GET /recipe/recipes_cuisine/cuisine/:cuisine` - Filter by cuisine
- `GET /recipe/category` - Filter by category

**Features:**
- Automatic retry logic (3 attempts with exponential backoff)
- Graceful fallback to mock data on API failure
- Comprehensive error logging
- Sattvic ingredient detection and substitution suggestions

### 2. FlavorDB Integration (`services/flavordb-api.ts`)

**Available Endpoints:**
- `GET /properties/by-commonName` - Search by ingredient name
- `GET /compounds/:id` - Get compound details
- `GET /search` - General compound search
- `GET /compounds` - Get all compounds (paginated)

**Features:**
- Molecular compound analysis
- Flavor profile matching
- Automatic retry logic
- Local + API hybrid search

## Error Handling

### Retry Mechanism
Both APIs implement exponential backoff:
```typescript
Attempt 1: Immediate
Attempt 2: Wait 1 second
Attempt 3: Wait 2 seconds
```

### Fallback Strategy
1. Try API call with retries
2. On failure, log error to console
3. Return mock/local data
4. User experience is never interrupted

## Usage Examples

### Fetching Recipes
```typescript
import { RecipeDBService } from './services/recipedb';

// Get all recipes (API + mock fallback)
const recipes = await RecipeDBService.getAllRecipes();

// Search recipes
const results = await RecipeDBService.searchRecipes('biryani');

// Get by tag/category
const navratriRecipes = await RecipeDBService.getRecipesByTag('navratri');
```

### Searching Ingredients
```typescript
import { FlavorDBService } from './services/flavordb';

// Search for ingredient
const ingredients = await FlavorDBService.searchIngredient('garlic');

// Get substitutes
const substitution = await FlavorDBService.getSubstitutes('garlic');
```

## API Response Handling

### RecipeDB Response Format
```typescript
{
  id: string;
  title: string;
  cuisine: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
```

### FlavorDB Response Format
```typescript
{
  id: string;
  name: string;
  commonName: string;
  flavorProfile: string[];
  molecularWeight: number;
  functionalGroups: string[];
  naturalSource: string[];
}
```

## Monitoring

### Console Logs
The app logs all API activity:
```
[RecipeDB API] Fetching: /recipe/recipesinfo (attempt 1/3)
[RecipeDB API] Success: /recipe/recipesinfo
[RecipeDB] Received 50 recipes from API
[RecipeDB] Successfully converted 50 recipes
```

### Status Indicators
- Green dot indicator shows "Live data from RecipeDB API"
- Visible in Recipes screen and Substitute screen

## Performance Optimization

### Batch Loading
- Recipes: Loads 50 at a time (configurable)
- Compounds: Loads 20 at a time

### Caching Strategy
- Mock data always available as fallback
- API responses used when available
- No persistent caching (always fresh data)

### Rate Limiting
- Retry delays prevent API overload
- Exponential backoff reduces server stress
- Graceful degradation on rate limit errors

## Troubleshooting

### Common Issues

**1. API Returns Empty Array**
- Fallback to mock data automatically
- Check console for error messages
- Verify API key is valid

**2. Network Timeout**
- Retry mechanism handles temporary failures
- Mock data ensures app continues working
- Check internet connection

**3. Invalid API Key**
- Update key in `services/recipedb-api.ts` and `services/flavordb-api.ts`
- Restart app after updating

### Debug Mode
Enable detailed logging:
```typescript
// In services/recipedb-api.ts or flavordb-api.ts
console.log('[API] Request:', url.toString());
console.log('[API] Response:', data);
```

## Future Enhancements

### Planned Features
- [ ] Persistent caching with AsyncStorage
- [ ] Offline mode with cached data
- [ ] User preference for API vs Mock data
- [ ] Advanced filtering and sorting
- [ ] Recipe recommendations based on user history
- [ ] Ingredient substitution AI suggestions

### API Expansion
- [ ] Integrate more RecipeDB endpoints
- [ ] Add FlavorDB pairing suggestions
- [ ] Implement recipe rating system
- [ ] Add user-generated content

## Testing

### Manual Testing
1. Open Recipes screen - should show API data
2. Search for "biryani" - should return results
3. Open Substitute screen - should show FlavorDB data
4. Disconnect internet - should fallback to mock data
5. Reconnect - should resume API calls

### Verification
- Check console logs for API activity
- Verify green status indicator appears
- Confirm recipes load within 2-3 seconds
- Test search functionality

## Support

For API issues:
- Check console logs first
- Verify API keys are correct
- Ensure internet connection is stable
- Review error messages in terminal

For feature requests:
- Document desired functionality
- Check if API supports the feature
- Consider mock data fallback strategy
