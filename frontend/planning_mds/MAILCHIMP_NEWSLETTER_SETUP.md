# Mailchimp Newsletter Setup Guide

This guide walks you through setting up Mailchimp for the newsletter popup feature.

## Overview

The newsletter feature includes:
- **Auto-popup modal** on first visit (1.5 second delay)
- **Floating button** in bottom-right corner to reopen
- **Smart persistence:**
  - Subscribers → Never see auto-popup again (localStorage)
  - Dismissers → See popup again next session (sessionStorage)

## Step 1: Create Mailchimp Account

1. Go to [Mailchimp](https://mailchimp.com/) and click **Sign Up Free**
2. Enter your email, username, and password
3. Verify your email address
4. Complete the initial setup wizard
5. **Important:** When asked to choose a plan, select the **Free** plan (they may push paid plans - look for "Continue with Free" or similar)

**Free Tier Includes:**
- Up to 500 contacts (plenty for 50-200 subscribers)
- 1,000 emails per month
- 500 emails per day
- 1 audience (subscriber list)
- Basic email templates
- Signup forms (embeddable)

This is perfect for annual memorial newsletters!

## Step 2: Create an Audience (Subscriber List)

1. In Mailchimp dashboard, go to **Audience** → **All contacts**
2. Click **Settings** → **Audience name and defaults**
3. Set audience name: `"Etay Memorial Newsletter"` (or similar)
4. Configure default "From" name and email
5. Save changes

## Step 3: Get Embedded Form Code

1. Go to **Audience** → **Signup forms**
2. Click **Embedded forms**
3. Select form style:
   - **Classic** - Full form with all styling
   - **Condensed** - Minimal, just email field (recommended)
   - **Horizontal** - Inline layout
   
4. Configure form options:
   - Uncheck "Show only required fields" if you want name field
   - For minimal form, just keep email field
   
5. **Copy the generated HTML code** from the bottom of the page

## Step 4: Add Your Embed Code to the Website

1. Open `frontend/src/components/NewsletterModal.jsx`
2. Find the `MAILCHIMP_EMBED_HTML` constant at the top (around line 15)
3. Replace the placeholder with your Mailchimp embed code:

```javascript
const MAILCHIMP_EMBED_HTML = `
<!-- BEGIN MAILCHIMP SIGNUP FORM -->
<div id="mc_embed_signup">
  <form action="https://YOUR_MAILCHIMP_URL.list-manage.com/subscribe/post?u=XXXX&amp;id=YYYY" 
        method="post" 
        id="mc-embedded-subscribe-form" 
        name="mc-embedded-subscribe-form" 
        class="validate" 
        target="_blank">
    <div id="mc_embed_signup_scroll">
      <div class="mc-field-group">
        <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" 
               placeholder="כתובת אימייל" required />
      </div>
      <div class="clear">
        <input type="submit" value="הרשמה" name="subscribe" 
               id="mc-embedded-subscribe" class="button" />
      </div>
      <div id="mce-responses" class="clear">
        <div class="response" id="mce-error-response" style="display:none"></div>
        <div class="response" id="mce-success-response" style="display:none"></div>
      </div>
    </div>
  </form>
</div>
<!-- END MAILCHIMP SIGNUP FORM -->
`;
```

**Important:** 
- Keep the `id="mc_embed_signup"` on the wrapper div
- Keep the `id="mce-success-response"` element - we use it to detect successful subscriptions
- You can change the placeholder text and button text to Hebrew

## Step 5: Test the Newsletter Signup

1. Start the development server: `npm start`
2. Wait 1.5 seconds - the newsletter modal should appear
3. Enter a test email and subscribe
4. Check your Mailchimp audience - the contact should appear
5. Close browser, reopen - modal should appear again (until you subscribe)

## Setting Up Scheduled Campaigns (Annual Memorial)

### Create a Campaign Template

1. Go to **Campaigns** → **All campaigns**
2. Click **Create Campaign** → **Email**
3. Select your audience
4. Design your email:
   - Use RTL layout for Hebrew
   - Add memorial content
   - Include event details
5. Save as template for reuse

### Schedule Recurring Campaign

Mailchimp doesn't have built-in "annual recurring" campaigns, but you can:

**Option A: Manual Yearly Campaign**
- Create a new campaign each year based on your template
- Schedule it for the memorial date

**Option B: Use Automation (Paid Feature)**
- Create a "Date-Based Automation"
- Trigger on a specific date annually

**Option C: Calendar Reminder**
- Set a calendar reminder to create the campaign a week before the memorial date

## Hebrew RTL Support

The form is already configured for RTL with:
- `dir="rtl"` on inputs
- `text-align: right` in CSS
- Hebrew placeholder text

## Troubleshooting

### Modal Not Showing
- Clear localStorage: `localStorage.clear()` in browser console
- Clear sessionStorage: `sessionStorage.clear()`
- Check browser console for errors

### Form Not Submitting
- Verify the form action URL is correct (from Mailchimp)
- Check for JavaScript errors in console
- Make sure the form has `target="_blank"` or uses AJAX

### Subscriptions Not Recording
- Check Mailchimp audience for new contacts
- Look in "Pending" if double opt-in is enabled
- Disable double opt-in in Audience settings if not needed

### Success Not Detecting
- The code watches for `#mce-success-response` element visibility
- Make sure your embed code includes this element
- Mailchimp may use AJAX which updates this element

## File Reference

| File | Purpose |
|------|---------|
| `src/components/NewsletterModal.jsx` | Modal popup with Mailchimp form |
| `src/components/NewsletterFloatingButton.jsx` | Floating button component |
| `src/App.jsx` | Integrates modal + button with state logic |
| `src/styles/App.css` | Mailchimp form style overrides |

## Support

- Mailchimp Knowledge Base: https://mailchimp.com/help/
- Mailchimp Embedded Forms: https://mailchimp.com/help/add-a-signup-form-to-your-website/

---

**Last Updated:** December 2025

