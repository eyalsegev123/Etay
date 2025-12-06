# EmailJS Setup Guide for Share Story Feature

This guide will walk you through setting up EmailJS to enable the "Share Your Story" feature on the website.

## Overview

The Share Story feature allows visitors to submit their memories and stories about Itay directly through the website. All submissions (including text and photos) are sent to your email address using EmailJS.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address
4. Log in to your EmailJS dashboard

**Free Tier Limits:**
- 200 emails per month
- 50KB per email (sufficient for compressed images)
- Upgrade if you need more capacity

## Step 2: Add Email Service

1. In the EmailJS dashboard, click on **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"** (recommended) or your preferred email provider
4. Follow the prompts to connect your Gmail account (eyalsegev123@gmail.com)
5. Once connected, you'll see a **Service ID** (e.g., `service_abc123`)
6. **Save this Service ID** - you'll need it later

## Step 3: Create Email Template

1. In the EmailJS dashboard, click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Give it a name: `"Itay Story Submission"`
4. Replace the default template content with the following:

### Email Template Content:

**Subject Line:**
```
סיפור חדש על איתי - {{story_title}}
```

**Email Body:**
```html
<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <h1 style="color: #1976d2; text-align: center; border-bottom: 2px solid #1976d2; padding-bottom: 15px;">
      סיפור חדש נשלח על איתי ז״ל
    </h1>
    
    <div style="margin-top: 30px;">
      <h2 style="color: #333; border-right: 4px solid #1976d2; padding-right: 10px;">פרטי השולח</h2>
      <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 30%;">שם:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">{{from_name}}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">אימייל:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">{{from_email}}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">קשר לאיתי:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">{{relationship}}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">מיקום:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">{{location}}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">תאריך שליחה:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">{{submission_date}}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 30px;">
      <h2 style="color: #333; border-right: 4px solid #1976d2; padding-right: 10px;">הסיפור</h2>
      <h3 style="color: #555; margin-top: 15px;">{{story_title}}</h3>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-top: 10px; line-height: 1.8; white-space: pre-wrap;">{{story_content}}</div>
    </div>

    {{#if photo_1}}
    <div style="margin-top: 30px;">
      <h2 style="color: #333; border-right: 4px solid #1976d2; padding-right: 10px;">תמונות מצורפות ({{photo_count}})</h2>
      <div style="margin-top: 15px;">
        {{#if photo_1}}
        <div style="margin-bottom: 20px;">
          <p style="font-weight: bold; margin-bottom: 5px;">תמונה 1: {{photo_1_name}}</p>
          <img src="{{photo_1}}" alt="תמונה 1" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
        </div>
        {{/if}}
        
        {{#if photo_2}}
        <div style="margin-bottom: 20px;">
          <p style="font-weight: bold; margin-bottom: 5px;">תמונה 2: {{photo_2_name}}</p>
          <img src="{{photo_2}}" alt="תמונה 2" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
        </div>
        {{/if}}
        
        {{#if photo_3}}
        <div style="margin-bottom: 20px;">
          <p style="font-weight: bold; margin-bottom: 5px;">תמונה 3: {{photo_3_name}}</p>
          <img src="{{photo_3}}" alt="תמונה 3" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
        </div>
        {{/if}}
      </div>
    </div>
    {{/if}}

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
      <p>סיפור זה נשלח דרך טופס "שתף את הסיפור שלך" באתר הזיכרון של איתי</p>
    </div>
  </div>
</div>
```

5. Click **"Save"** in the top right
6. You'll see a **Template ID** (e.g., `template_xyz456`)
7. **Save this Template ID** - you'll need it later

## Step 4: Get Your Public Key

1. In the EmailJS dashboard, click on **"Account"** in the left sidebar
2. Scroll down to find your **Public Key** (also called User ID)
3. It looks like: `user_123abc456def`
4. **Save this Public Key** - you'll need it later

## Step 5: Configure Environment Variables

1. In your project, navigate to `frontend/` directory
2. Copy the `.env.example` file to create `.env.local`:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```
3. Open `.env.local` and replace the placeholder values with your actual EmailJS credentials:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=service_abc123
   REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz456
   REACT_APP_EMAILJS_PUBLIC_KEY=user_123abc456def
   REACT_APP_RECIPIENT_EMAIL=eyalsegev123@gmail.com
   ```

## Step 6: Test the Configuration

1. **Restart your development server** (environment variables require a restart):
   ```bash
   cd frontend
   npm start
   ```

2. Open the website in your browser

3. Click the **"שתף את הסיפור שלך"** (Share Your Story) button in the header

4. Fill out the test form:
   - Name: Test User
   - Email: your-test-email@example.com
   - Relationship: Friend
   - Title: Test Story
   - Content: This is a test submission to verify EmailJS is working correctly.
   - (Optional) Add a test photo

5. Click **"שלח סיפור"** (Send Story)

6. Check your email (eyalsegev123@gmail.com) - you should receive the test submission within a few seconds

## Troubleshooting

### Emails Not Being Received

1. **Check Spam Folder**: EmailJS emails might initially land in spam
2. **Verify Credentials**: Double-check all three values in `.env.local`
3. **Check Console**: Open browser DevTools (F12) → Console tab for error messages
4. **EmailJS Dashboard**: Check the "Logs" section in EmailJS dashboard to see if requests are being received

### Error: "EmailJS configuration is missing"

- Make sure `.env.local` exists in the `frontend/` directory
- Verify all environment variables start with `REACT_APP_`
- Restart the development server after creating/modifying `.env.local`

### Photos Not Appearing in Email

- Photos are compressed to 800px width and 70% quality
- If photos are too large, they might not be included
- Check the email template has the photo placeholders ({{photo_1}}, etc.)

### Gmail Blocking Images

- Gmail might block external images for security
- Click "Display images below" in the email to see photos
- Add EmailJS to your contacts to automatically display images

## Email Template Variables Reference

Here are all the variables available in your email template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Submitter's name | "David Cohen" |
| `{{from_email}}` | Submitter's email | "david@example.com" |
| `{{relationship}}` | Relationship to Itay | "Friend from the unit" |
| `{{story_title}}` | Story title | "A memory from training" |
| `{{story_content}}` | Full story text | "I remember when..." |
| `{{location}}` | Location provided | "Tel Aviv" |
| `{{submission_date}}` | Date/time submitted | "19 בנובמבר 2025, 14:30" |
| `{{photo_count}}` | Number of photos | "2" |
| `{{photo_1}}` | First photo (base64) | (base64 image data) |
| `{{photo_1_name}}` | First photo filename | "image.jpg" |
| `{{photo_2}}` | Second photo (base64) | (base64 image data) |
| `{{photo_2_name}}` | Second photo filename | "photo.png" |
| `{{photo_3}}` | Third photo (base64) | (base64 image data) |
| `{{photo_3_name}}` | Third photo filename | "memory.jpg" |

## Security Notes

- `.env.local` is automatically excluded from git (in `.gitignore`)
- Never commit your actual EmailJS credentials to version control
- The Public Key is safe to use in frontend code (it's meant to be public)
- EmailJS rate limits prevent spam abuse
- Consider enabling reCAPTCHA in EmailJS dashboard for additional protection

## Upgrading EmailJS Plan

If you receive more than 200 submissions per month:

1. Go to EmailJS dashboard → Billing
2. Upgrade to a paid plan (starting at $10/month for 1,000 emails)
3. No code changes needed - just update your plan

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- If you need help with the setup, contact me!

## Next Steps

Once EmailJS is configured and tested:

1. Monitor incoming story submissions
2. Review each submission for appropriateness
3. Add approved stories to `/frontend/src/assets/data/stories.json`
4. Stories will automatically appear on the website

---

**Last Updated:** November 19, 2025

