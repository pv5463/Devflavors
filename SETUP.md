# Setup Instructions

## Fixed Issues ✅

### 1. **Expo SDK Compatibility**
- ✅ Added `expo-linear-gradient` (~14.0.0) for beautiful gradient backgrounds
- ✅ Added `react-native-svg` (15.8.0) for SVG support
- ✅ All packages are now compatible with Expo SDK 52

### 2. **NativeWind Configuration**
- ✅ Created `global.css` for NativeWind v4
- ✅ Configured Tailwind CSS properly

### 3. **API Integration**
- ✅ Fixed RecipeDB API authorization headers (added `x-api-key`)
- ✅ Added FlavorDB API with Bearer token authentication
- ✅ Added error logging and fallback to mock data
- ✅ APIs will work when connected to internet

### 4. **UI/UX Enhancements**
- ✅ Added **LinearGradient** backgrounds to buttons and cards
- ✅ Improved shadows and elevation for better depth
- ✅ Created animated **Loading component** with rotating leaf emoji
- ✅ Enhanced color scheme with gradients:
  - Primary: Green gradient (#2d9039 → #1c6b28)
  - Secondary: Warm gold gradient (#f59e0b → #d97706)
- ✅ Better button styles with gradient support
- ✅ Improved card shadows (shadowColor: #1c4b25)

### 5. **Error Handling**
- ✅ Added console logging for API calls
- ✅ Graceful fallback to mock data when API fails
- ✅ User-friendly loading messages
- ✅ Better error handling in all services

## How to Run

### 1. Start the Development Server
```powershell
npx expo start
```

### 2. Run on Device/Emulator
- **Android**: Press `a` or scan QR with Expo Go app
- **iOS**: Press `i` (requires Mac with Xcode)
- **Web**: Press `w`

### 3. Clear Cache (if needed)
```powershell
npx expo start -c
```

## Features

### ✨ Enhanced UI Features
1. **Beautiful Gradients**: All primary and secondary buttons now use smooth gradients
2. **Animated Loading**: Rotating leaf emoji with smooth animations
3. **Better Shadows**: Cards have depth with proper shadows
4. **Improved Colors**: Professional color palette for Sattvic theme

### 🔬 Molecular Substitution Engine
- FlavorDB-powered ingredient analysis
- Scientific compound matching
- Detailed preparation notes

### 📖 Recipe Browser
- Sattvic-filtered recipes
- Tag-based filtering
- Search functionality
- Detailed recipe view with substitution notes

### 📷 Ingredient Scanner
- Simulated camera scanning (ready for real implementation)
- Instant Sattvic compliance check
- Forbidden ingredient alerts

## API Configuration

The app uses two APIs:

1. **FlavorDB API**: `https://api.foodoscope.com/flavordb`
   - Bearer token authentication
   - Molecular compound database

2. **RecipeDB API**: `https://api.foodoscope.com/recipe2-api`
   - API key authentication
   - Recipe instructions and nutritional information

Both APIs have fallback to mock data when offline or if API fails.

## Troubleshooting

### Issue: "Module not found"
```powershell
npm install
npx expo start -c
```

### Issue: "Network request failed"
- Check internet connection
- The app will automatically fall back to mock data
- Check console logs for API errors

### Issue: Metro bundler issues
```powershell
# Clear all caches
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .expo
npm install
npx expo start -c
```

## Development Notes

- The app is configured for Expo SDK 52
- NativeWind v4 is used for styling
- TypeScript is enabled with strict mode
- All components are in the `components/` directory
- Services handle both real API and mock data

## Next Steps for Production

1. Implement real expo-camera OCR
2. Add user authentication
3. Implement favorites persistence
4. Add shopping list generation
5. Implement meal planner
6. Add nutritional tracking
