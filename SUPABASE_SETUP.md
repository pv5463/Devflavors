# Supabase Authentication Setup Guide

## Overview
Your Devflavors app now includes complete authentication with Supabase, including login, signup, password reset, and user profiles.

## Features Added

### 1. Authentication Screens
- ✅ **Login Screen** (`app/login.tsx`) - Email/password login
- ✅ **Signup Screen** (`app/signup.tsx`) - Create new account
- ✅ **Forgot Password** (`app/forgot-password.tsx`) - Password reset
- ✅ **Profile Screen** (`app/profile.tsx`) - User profile and account info

### 2. Authentication Service
- ✅ **Supabase Integration** (`services/supabase.ts`)
- ✅ Sign up with email/password
- ✅ Sign in with email/password
- ✅ Sign out
- ✅ Get current user
- ✅ Password reset
- ✅ Auth state listener

### 3. UI Integration
- ✅ Sign In/Profile button on home screen
- ✅ "Skip for now" option on auth screens
- ✅ Smooth navigation flow
- ✅ Professional design matching app theme

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (or create account)
4. Click "New Project"
5. Fill in:
   - **Name**: devflavors
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for project to be created (2-3 minutes)

### Step 2: Get API Credentials

1. In your Supabase project dashboard
2. Click "Settings" (gear icon) in sidebar
3. Click "API" under Project Settings
4. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Configure App

1. Open `services/supabase.ts`
2. Replace the placeholder values:

```typescript
const SUPABASE_URL = 'https://your-project.supabase.co'; // Replace with your URL
const SUPABASE_ANON_KEY = 'your-anon-key'; // Replace with your anon key
```

Example:
```typescript
const SUPABASE_URL = 'https://abcdefghijk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MjM0NTYsImV4cCI6MjAwNTA5OTQ1Nn0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

### Step 4: Configure Email Settings (Optional)

1. In Supabase dashboard, go to "Authentication" → "Email Templates"
2. Customize email templates:
   - Confirm signup
   - Reset password
   - Magic link
3. Go to "Authentication" → "Settings"
4. Configure:
   - **Site URL**: Your app URL (for production)
   - **Redirect URLs**: Add allowed redirect URLs
   - **Email Auth**: Enable/disable as needed

### Step 5: Test Authentication

1. Run your app: `npm start`
2. Click "Sign In" button on home screen
3. Click "Sign Up" to create test account
4. Fill in:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test123456
5. Check your email for verification link
6. Click verification link
7. Return to app and sign in

## Features Breakdown

### Sign Up Flow
```
User enters details → Supabase creates account → 
Verification email sent → User verifies → Account active
```

### Sign In Flow
```
User enters credentials → Supabase validates → 
Session created → User redirected to home
```

### Password Reset Flow
```
User enters email → Reset link sent → 
User clicks link → New password set → Can sign in
```

### Profile Screen
```
Shows user info → Account details → 
Stats (favorites, recipes tried) → Sign out option
```

## Security Features

### Built-in Security
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens for sessions
- ✅ Email verification
- ✅ Rate limiting
- ✅ SQL injection protection
- ✅ XSS protection

### Best Practices Implemented
- ✅ Secure password storage
- ✅ Session management
- ✅ Protected routes
- ✅ Error handling
- ✅ Input validation

## User Experience

### Smooth Navigation
- Users can skip authentication
- Easy access from home screen
- Clear navigation between auth screens
- Professional error messages

### Visual Design
- Matches app theme (green/Sattvic)
- Consistent with other screens
- Clean, modern UI
- Smooth animations

## API Integration

### Authentication State
```typescript
// Check if user is logged in
const { user } = await AuthService.getCurrentUser();

// Listen to auth changes
AuthService.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // User signed in
  } else if (event === 'SIGNED_OUT') {
    // User signed out
  }
});
```

### Protected Features (Future)
You can now add protected features:
- Save favorite recipes
- Create meal plans
- Track nutrition
- Sync across devices

## Database Schema (Optional)

If you want to store user data:

```sql
-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Create favorites table
create table favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  recipe_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table favorites enable row level security;

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);
```

## Troubleshooting

### Common Issues

**1. "Invalid API key"**
- Check that you copied the correct anon key
- Make sure there are no extra spaces
- Verify the key starts with `eyJ`

**2. "Email not sent"**
- Check Supabase email settings
- Verify email templates are configured
- Check spam folder

**3. "User not found"**
- Make sure user verified email
- Check Supabase dashboard → Authentication → Users
- Try creating new account

**4. "Session expired"**
- User needs to sign in again
- Check session timeout settings
- Implement auto-refresh (optional)

### Debug Mode

Enable detailed logging:
```typescript
// In services/supabase.ts
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    debug: true, // Enable debug logs
  },
});
```

## Next Steps

### Recommended Enhancements
1. **Social Login**: Add Google/Apple sign-in
2. **Profile Pictures**: Upload avatar images
3. **User Preferences**: Save dietary preferences
4. **Favorites**: Save favorite recipes
5. **Meal Plans**: Create and save meal plans
6. **Sync**: Sync data across devices

### Advanced Features
1. **Push Notifications**: Notify users of new recipes
2. **Analytics**: Track user behavior
3. **Referrals**: Invite friends program
4. **Premium**: Subscription features
5. **Offline Mode**: Cache user data locally

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Native Auth](https://supabase.com/docs/guides/auth/auth-helpers/react-native)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

## Support

### Getting Help
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- Supabase GitHub: [github.com/supabase/supabase](https://github.com/supabase/supabase)
- Documentation: [supabase.com/docs](https://supabase.com/docs)

## Conclusion

Your Devflavors app now has:
- ✅ Complete authentication system
- ✅ Professional auth screens
- ✅ Secure user management
- ✅ Profile functionality
- ✅ Password reset
- ✅ Email verification
- ✅ Session management

Just add your Supabase credentials and you're ready to go!
