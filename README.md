# Devflavors

A React Native (Expo) mobile application that helps users maintain a strict Sattvic diet (No Onion, No Garlic) during Navratri/Ekadashi using molecular flavor substitution.

## Core Value Proposition

Instead of just removing forbidden ingredients (which makes food bland), we use FlavorDB logic to find scientifically valid molecular substitutes (e.g., Asafoetida + Cumin + Ginger = Garlic flavor profile).

## Tech Stack

- **Frontend:** React Native (Expo), TypeScript, Expo Router
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Backend/Logic:** Local TypeScript logic mocking the specific API endpoints from CoSy Lab (RecipeDB & FlavorDB)
- **Key Libraries:**
  - expo-camera (Ingredient scanning)
  - zustand (State management)
  - axios (API requests - ready for backend integration)

## Design Aesthetic

Clean, Scientific, yet Spiritually serene.

**Color Palette:**
- Deep Greens (Basil) - `#2d9039` to `#1c4b25`
- Warm Golds (Turmeric) - `#f59e0b` to `#c27808`
- Clean Whites (Cream) - `#fdfdfc` to `#f9f9f6`

## Features

### 1. Molecular Substitution Engine
- Scientifically-based flavor compound matching
- Detailed substitution blends with ratios
- Compound-level explanations
- Preparation notes for optimal flavor extraction

### 2. Recipe Browser
- Sattvic-filtered recipes
- Tag-based filtering (Navratri, Ekadashi, Fasting, etc.)
- Search functionality
- Detailed recipe view with substitution notes

### 3. Ingredient Scanner
- Camera-based ingredient detection (simulated for hackathon)
- Instant Sattvic compliance check
- Forbidden ingredient alerts

### 4. Favorites System
- Save favorite recipes
- Quick access to preferred substitutions

## Project Structure

```
.
├── app/                      # Expo Router screens
│   ├── _layout.tsx          # Root layout with navigation
│   ├── index.tsx            # Home screen
│   ├── substitute.tsx       # Substitution engine
│   ├── recipes.tsx          # Recipe browser
│   ├── recipe/
│   │   └── [id].tsx         # Recipe detail
│   └── scan.tsx             # Ingredient scanner
├── components/               # Reusable UI components
│   ├── Button.tsx           # Action buttons
│   ├── Card.tsx             # Content cards & badges
│   ├── IngredientSearch.tsx # Ingredient search UI
│   ├── RecipeList.tsx       # Recipe list component
│   └── SubstitutionDisplay.tsx # Substitution results
├── services/                # Mock API services
│   ├── flavordb.ts         # FlavorDB mock service
│   └── recipedb.ts         # RecipeDB mock service
├── store/                   # Zustand state management
│   └── index.ts            # App state store
├── types/                   # TypeScript types
│   └── index.ts            # Shared type definitions
├── tailwind.config.js       # Tailwind with Sattvic palette
├── babel.config.js         # Babel with NativeWind
└── package.json            # Dependencies
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo Go app (iOS/Android) or Android/iOS simulator

### Installation

1. **Install dependencies:**
```bash
cd devflavors
npm install
```

2. **Start the development server:**
```bash
npx expo start
```

3. **Run on device:**
- Scan QR code with Expo Go (Android)
- Or press `i` for iOS simulator / `a` for Android emulator

## Data Sources

The app currently uses **mocked local data** that simulates:
- **FlavorDB:** Molecular compound database with flavor profiles
- **RecipeDB:** Recipe instructions and nutritional information

### FlavorDB Integration Points
The mock service simulates these endpoints:
- `GET /ingredient/search` - Search ingredients by name
- `GET /ingredient/{id}` - Get ingredient details with compounds
- `GET /substitution/{ingredientId}` - Get molecular substitutes

### RecipeDB Integration Points
The mock service simulates these endpoints:
- `GET /recipes` - Get all Sattvic recipes
- `GET /recipe/{id}` - Get recipe details
- `GET /recipes/search?q={query}` - Search recipes
- `GET /recipes/tag/{tag}` - Filter by tag

## Key Scientific Concepts

### Garlic Substitution
- **Allicin** (C6H10OS2) in garlic creates sulfur-based pungency
- **Asafoetida** contains asaresinotannols which release sulfur compounds when heated
- **Cumin's cuminaldehyde** provides the Maillard-reaction umami that cooked garlic contributes

### Onion Substitution
- **Propylthiosulfinic acid** creates onion's tear-inducing pungency
- **Fenugreek's sotolone** adds caramelized sweetness similar to cooked onion's reducing sugars
- **Asafoetida** provides the sulfur notes

## 24-Hour Hackathon Note

This is a **hackathon build** prioritizing:
- Clean, working code over complex animations
- Core functionality (substitution engine, recipe browser)
- Scientific accuracy in flavor compound data
- Easy extensibility for future API integration

## Future Enhancements

- [ ] Real FlavorDB API integration
- [ ] Real RecipeDB API integration
- [ ] Full expo-camera OCR implementation
- [ ] User accounts and recipe uploads
- [ ] Shopping list generation
- [ ] Meal planner
- [ ] Nutritional tracking

## License

MIT License - Created for hackathon purposes.

## Credits

- Inspired by CoSy Lab's FlavorDB and RecipeDB
- Built for Navratri/Ekadashi observance
- 24-hour hackathon project
