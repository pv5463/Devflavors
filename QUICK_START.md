# Quick Start Guide

## ✅ Your Supabase URL is Already Configured!

Your app is almost ready. Just one more step:

## Get Your Anon Key (2 minutes)

### 1. Go to Supabase Dashboard
Visit: [https://supabase.com/dashboard/project/akpdwhgeeaqwrsncvjly/settings/api](https://supabase.com/dashboard/project/akpdwhgeeaqwrsncvjly/settings/api)

### 2. Copy the Anon Key
- Look for **"anon public"** key
- Click the copy button
- It looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Paste in Your App
Open `services/supabase.ts` and replace `YOUR_ACTUAL_KEY_HERE` with your key:

```typescript
const SUPABASE_ANON_KEY = 'paste-your-key-here';
```

### 4. Run Your App
```bash
npm start
```

## That's It! 🎉

Your app now has:
- ✅ Real-time recipe data from RecipeDB
- ✅ Molecular data from FlavorDB  
- ✅ Complete authentication system
- ✅ User profiles
- ✅ All features working

## Test Authentication

1. Click "Sign In" on home screen
2. Click "Sign Up"
3. Create account with your email
4. Check email for verification
5. Sign in and explore!

## Need Help?

See `GET_ANON_KEY.md` for detailed instructions with screenshots.

## Your Project Info

- **Supabase URL**: https://akpdwhgeeaqwrsncvjly.supabase.co ✅
- **Project ID**: akpdwhgeeaqwrsncvjly
- **Region**: Asia Pacific (Mumbai)
- **Anon Key**: Get from dashboard (see above)

---

**Note**: The anon key is safe to use in your app - it's designed for client-side use and has limited permissions.
