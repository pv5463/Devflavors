# Get Your Supabase Anon Key

## Your Supabase URL (Already Configured)
✅ `https://akpdwhgeeaqwrsncvjly.supabase.co`

## Get Your Anon Key

### Step 1: Go to Supabase Dashboard
1. Open browser and go to: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in with your account
3. Select your project: **akpdwhgeeaqwrsncvjly**

### Step 2: Navigate to API Settings
1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **API** under "Project Settings"

### Step 3: Copy the Anon Key
1. Look for section: **Project API keys**
2. Find the key labeled: **anon** or **anon public**
3. It will look like:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcGR3aGdlZWFxd3JzbmN2amx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTk2MDAsImV4cCI6MjA1MjQzNTYwMH0.XXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Click the **Copy** button next to it

### Step 4: Update Your App
1. Open `services/supabase.ts` in your code editor
2. Find this line:
   ```typescript
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcGR3aGdlZWFxd3JzbmN2amx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTk2MDAsImV4cCI6MjA1MjQzNTYwMH0.YOUR_ACTUAL_KEY_HERE';
   ```
3. Replace `YOUR_ACTUAL_KEY_HERE` with the key you copied
4. Save the file

### Step 5: Test Authentication
1. Run your app: `npm start`
2. Click "Sign In" button on home screen
3. Click "Sign Up" to create a test account
4. Fill in details and submit
5. Check your email for verification link
6. Sign in with your credentials

## Quick Reference

### Your Project Details
- **Project Reference**: akpdwhgeeaqwrsncvjly
- **Region**: ap-south-1 (Asia Pacific - Mumbai)
- **Database**: postgres
- **Supabase URL**: https://akpdwhgeeaqwrsncvjly.supabase.co

### Where to Find Keys
```
Supabase Dashboard
└── Your Project (akpdwhgeeaqwrsncvjly)
    └── Settings (⚙️)
        └── API
            └── Project API keys
                ├── anon public ← Copy this one
                └── service_role (don't use this in app)
```

## Security Notes

### ✅ Safe to Use in App
- **anon public key**: Safe for client-side (React Native app)
- This key has limited permissions
- Users can only access their own data

### ❌ Never Use in App
- **service_role key**: Server-side only
- Has full database access
- Never expose in client code

## Troubleshooting

### "Invalid API key" Error
- Make sure you copied the **anon** key, not service_role
- Check for extra spaces or line breaks
- Verify the key starts with `eyJ`
- Make sure you saved the file after pasting

### "Project not found" Error
- Verify your project is active in Supabase dashboard
- Check the URL is correct: `https://akpdwhgeeaqwrsncvjly.supabase.co`
- Make sure you're signed in to the correct Supabase account

### Email Not Sending
1. Go to: Authentication → Email Templates
2. Verify templates are configured
3. Check: Authentication → Settings → SMTP Settings
4. For testing, check spam folder

## Next Steps After Configuration

1. ✅ Test signup flow
2. ✅ Verify email delivery
3. ✅ Test login
4. ✅ Check profile screen
5. ✅ Test password reset

## Need Help?

If you can't find the anon key:
1. Make sure you're logged into Supabase
2. Select the correct project
3. Go to Settings → API
4. Look for "Project API keys" section
5. The anon key should be visible there

The key is safe to share in your app code - it's designed for client-side use!
