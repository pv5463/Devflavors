# App Flow Documentation

## Updated Authentication Flow

### Initial Launch
```
App Opens (index.tsx)
    ↓
Check if user is logged in
    ↓
├─ User Logged In → Redirect to /home
└─ No User → Redirect to /signup
```

### New User Flow
```
1. App opens → Shows Signup screen
2. User fills in:
   - Full Name
   - Email
   - Password
   - Confirm Password
3. Click "Create Account"
4. Success → Redirect to Home screen
5. User can now use all features
```

### Returning User Flow
```
1. App opens → Checks auth status
2. User is logged in → Go directly to Home
3. User can browse and use features
```

### Skip Authentication Flow
```
1. On Signup/Login screen
2. Click "Skip for now"
3. Go directly to Home
4. Can use all features without account
5. Can sign up later from Profile button
```

## Screen Structure

### app/index.tsx (Auth Checker)
- **Purpose**: Check authentication status
- **Behavior**: 
  - Shows loading spinner
  - Checks if user is logged in
  - Redirects to /home if logged in
  - Redirects to /signup if not logged in
- **Hidden from tabs**: Yes

### app/signup.tsx (First Screen for New Users)
- **Purpose**: Create new account
- **Fields**: Full Name, Email, Password, Confirm Password
- **Actions**:
  - Create Account → Success → Redirect to /home
  - Already have account? → Go to /login
  - Skip for now → Go to /home
- **Hidden from tabs**: Yes

### app/login.tsx (For Returning Users)
- **Purpose**: Sign in existing users
- **Fields**: Email, Password
- **Actions**:
  - Sign In → Success → Redirect to /home
  - Forgot Password? → Go to /forgot-password
  - Don't have account? → Go to /signup
  - Skip for now → Go to /home
- **Hidden from tabs**: Yes

### app/home.tsx (Main Screen)
- **Purpose**: Main app screen with all features
- **Features**:
  - Sign In/Profile button (top right)
  - Premium hero section
  - Mission statement
  - Stats grid
  - Molecular substitutes button
  - Popular substitutions
  - Features showcase
- **In tabs**: Yes (Home tab)

### app/recipes.tsx
- **Purpose**: Browse Sattvic recipes
- **In tabs**: Yes (Recipes tab)

### app/scan.tsx
- **Purpose**: Camera scanner
- **In tabs**: Yes (Scan tab - center elevated)

### app/meal-planner.tsx
- **Purpose**: AI meal planning
- **In tabs**: Yes (AI Planner tab)

### app/fast-food-sub.tsx
- **Purpose**: Fast food to Sattvic conversion
- **In tabs**: Yes (Fast Food tab)

### app/profile.tsx
- **Purpose**: User profile and account info
- **Access**: From Sign In/Profile button on home
- **Hidden from tabs**: Yes

### app/forgot-password.tsx
- **Purpose**: Password reset
- **Access**: From login screen
- **Hidden from tabs**: Yes

### app/substitute.tsx
- **Purpose**: Molecular substitutes
- **Access**: From home screen button
- **Hidden from tabs**: Yes

### app/recipe/[id].tsx
- **Purpose**: Recipe details
- **Access**: From recipe list
- **Hidden from tabs**: Yes

## Navigation Flow

### Tab Navigation (Bottom Bar)
```
🏠 Home → 📖 Recipes → 📷 Scan → 🧠 AI Planner → 🍔 Fast Food
```

### Hidden Screens (Accessible via buttons/links)
```
- index (auth checker)
- signup
- login
- forgot-password
- profile
- substitute
- recipe/[id]
```

## User States

### 1. First Time User (Not Logged In)
```
Open App → Signup Screen → Create Account → Home Screen
```

### 2. Returning User (Logged In)
```
Open App → Auth Check → Home Screen (auto-login)
```

### 3. Guest User (Skipped Auth)
```
Open App → Signup Screen → Skip → Home Screen
```

## Authentication States

### Logged In
- Profile button shows "👤 Profile"
- Can access profile screen
- Can sign out
- Data can be saved (future feature)

### Not Logged In
- Profile button shows "🔐 Sign In"
- Clicking goes to login screen
- Can still use all features
- Data not saved

## Key Features

### Seamless Experience
- ✅ No forced login
- ✅ Skip option available
- ✅ All features work without account
- ✅ Easy signup process
- ✅ Auto-login for returning users

### Professional Flow
- ✅ Loading state on app open
- ✅ Smooth transitions
- ✅ Clear navigation
- ✅ Consistent design
- ✅ No dead ends

### User-Friendly
- ✅ Skip authentication anytime
- ✅ Easy access to all features
- ✅ Clear call-to-actions
- ✅ Helpful error messages
- ✅ Professional design

## Testing the Flow

### Test 1: New User
1. Clear app data
2. Open app
3. Should see Signup screen
4. Fill in details
5. Click "Create Account"
6. Should redirect to Home
7. ✅ Success

### Test 2: Skip Auth
1. Clear app data
2. Open app
3. Should see Signup screen
4. Click "Skip for now"
5. Should go to Home
6. ✅ Success

### Test 3: Returning User
1. Sign up and close app
2. Reopen app
3. Should auto-login
4. Should go directly to Home
5. ✅ Success

### Test 4: Sign Out
1. From Home, click Profile
2. Click "Sign Out"
3. Should go to Login screen
4. ✅ Success

## Future Enhancements

### Onboarding
- [ ] Welcome slides for first-time users
- [ ] Feature tour
- [ ] Dietary preference setup

### Social Features
- [ ] Share recipes
- [ ] Invite friends
- [ ] Community features

### Personalization
- [ ] Save favorites
- [ ] Custom meal plans
- [ ] Dietary restrictions
- [ ] Sync across devices

## Troubleshooting

### "Invalid API" Error
- Make sure Supabase anon key is configured
- Check `services/supabase.ts`
- See `GET_ANON_KEY.md` for instructions

### Stuck on Loading Screen
- Check internet connection
- Verify Supabase URL is correct
- Check console for errors

### Can't Sign Up
- Verify email format
- Check password length (min 6 characters)
- Ensure passwords match
- Check Supabase project is active

## Summary

The app now has a professional authentication flow:
- ✅ Signup first for new users
- ✅ Auto-login for returning users
- ✅ Skip option for guests
- ✅ Smooth redirects to home
- ✅ All features accessible
- ✅ Professional UX
