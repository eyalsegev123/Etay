# Share Story Feature - Testing Checklist

This document outlines the testing procedures for the "Share Your Story" feature.

## Pre-Testing Setup

### 1. Configure EmailJS
- [ ] Complete all steps in `EMAILJS_SETUP_GUIDE.md`
- [ ] Create `.env.local` with all required credentials
- [ ] Verify `.env.local` is in `frontend/` directory

### 2. Start Development Server
```bash
cd frontend
npm start
```
- [ ] Server starts without errors
- [ ] No console errors on page load

## UI Testing

### Desktop View Testing

#### Header Button
- [ ] "שתף את הסיפור שלך" button appears in header
- [ ] Button is visible and well-positioned (after nav links, before Hebrew title)
- [ ] Button has Share icon
- [ ] Button changes style on scroll (transparent → solid background)
- [ ] Button hover effect works smoothly
- [ ] Button click opens modal

#### Modal Appearance
- [ ] Modal opens with smooth fade animation
- [ ] Modal is centered on screen
- [ ] Modal has proper RTL (right-to-left) layout
- [ ] Close button (X) is visible in top-left corner
- [ ] Modal title displays: "שתף את הסיפור שלך על איתי"
- [ ] Subtitle text is visible and readable
- [ ] All form fields are visible and properly aligned

### Mobile View Testing (< 768px width)

#### Header Button
- [ ] Hamburger menu icon appears
- [ ] Menu opens when clicked
- [ ] "שתף את הסיפור שלך" appears at bottom of menu
- [ ] Menu item has Share icon
- [ ] Clicking menu item opens modal
- [ ] Menu closes when modal opens

#### Modal Responsiveness
- [ ] Modal scales properly on mobile screen
- [ ] Modal is scrollable if content exceeds screen height
- [ ] Form fields stack vertically
- [ ] Buttons are full-width and accessible
- [ ] Photo previews display correctly
- [ ] All text is readable without horizontal scroll

## Form Validation Testing

### Required Fields Validation

#### Name Field
- [ ] Empty name shows error: "שם הוא שדה חובה"
- [ ] Single character name shows error: "שם חייב להכיל לפחות 2 תווים"
- [ ] Valid name (2+ chars) - no error
- [ ] Error clears when user starts typing

#### Story Title
- [ ] Empty title shows error: "כותרת היא שדה חובה"
- [ ] Title < 3 chars shows error: "כותרת חייבת להכיל לפחות 3 תווים"
- [ ] Valid title (3+ chars) - no error
- [ ] Error clears when user starts typing

#### Story Content
- [ ] Empty content shows error: "תוכן הסיפור הוא שדה חובה"
- [ ] Content < 50 chars shows error: "הסיפור חייב להכיל לפחות 50 תווים"
- [ ] Content > 5000 chars shows error: "הסיפור לא יכול להכיל יותר מ-5000 תווים"
- [ ] Character counter updates in real-time
- [ ] Valid content (50-5000 chars) - no error
- [ ] Error clears when user starts typing

### Optional Fields Validation

#### Email Field
- [ ] Empty email - no error (optional field)
- [ ] Invalid email format shows error: "כתובת אימייל לא תקינה"
- [ ] Valid email format - no error
- [ ] Examples tested: missing @, missing domain, invalid characters

#### Other Optional Fields
- [ ] Relationship field can be empty - no error
- [ ] Location field can be empty - no error

## Photo Upload Testing

### File Selection
- [ ] "בחר תמונות" button is visible
- [ ] Clicking button opens file picker
- [ ] File picker accepts multiple files
- [ ] Can select 1, 2, or 3 photos

### Photo Preview
- [ ] Selected photos display as thumbnails (100x100px)
- [ ] Thumbnails show actual image preview
- [ ] Each thumbnail has delete (X) button
- [ ] Clicking delete removes that specific photo
- [ ] "X תמונות נבחרו" chip displays correct count

### Photo Validation
- [ ] Selecting 4+ photos shows error: "ניתן להעלות עד 3 תמונות בלבד"
- [ ] Non-image file (txt, pdf) shows error: "סוג קובץ לא נתמך..."
- [ ] File > 5MB shows error: "גודל הקובץ [...] חורג מהמותר"
- [ ] Valid JPG file - no error
- [ ] Valid PNG file - no error
- [ ] Valid GIF file - no error
- [ ] Upload button hides when 3 photos selected
- [ ] Upload button reappears after deleting a photo

## Form Submission Testing

### Submission Flow
- [ ] Click "שלח סיפור" with all required fields filled
- [ ] Button changes to "שולח..." with loading spinner
- [ ] All form fields become disabled during submission
- [ ] Submit button is disabled during submission
- [ ] Close button is disabled during submission

### Success State
- [ ] Success message appears: "תודה רבה! הסיפור שלך נשלח בהצלחה..."
- [ ] Success message is green (Alert severity="success")
- [ ] Form fields disappear (replaced by success message)
- [ ] Modal auto-closes after 3 seconds
- [ ] Form resets after modal closes

### Error State
- [ ] If submission fails, error message appears
- [ ] Error message is red (Alert severity="error")
- [ ] Form remains editable after error
- [ ] User can retry submission
- [ ] Check browser console for error details

## Email Delivery Testing

### Send Test Submission
Fill out the form with test data:
- **Name:** Test User
- **Email:** test@example.com
- **Relationship:** Friend
- **Title:** Test Story for Development
- **Content:** (Paste 50+ character test content)
- **Location:** Test Location
- **Photos:** Add 1-3 test images

### Verify Email Reception
Check inbox (eyalsegev123@gmail.com):
- [ ] Email arrives within 10-30 seconds
- [ ] Subject line: "סיפור חדש על איתי - [Story Title]"
- [ ] Email displays in RTL format
- [ ] All form fields appear in email
- [ ] Story title is prominent
- [ ] Story content preserves line breaks
- [ ] Submitter details table shows all fields
- [ ] Optional fields show "לא צוין" if empty
- [ ] Submission date/time is correct

### Verify Photos in Email
- [ ] Photo count is displayed
- [ ] Photo filenames are shown
- [ ] Photos display as images (not broken)
- [ ] Photos are reasonably sized (not huge)
- [ ] Multiple photos appear in order (1, 2, 3)
- [ ] Click "Display images" if Gmail blocks them initially

### Test Without Photos
- [ ] Submit form without any photos
- [ ] Email arrives successfully
- [ ] Email doesn't show photo section
- [ ] All other data is present

## Browser Compatibility Testing

Test in multiple browsers:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Error Scenarios Testing

### Network Issues
- [ ] Turn off WiFi during submission
- [ ] Verify appropriate error message appears
- [ ] Turn WiFi back on and retry - submission works

### Invalid Configuration
- [ ] Remove one env variable from `.env.local`
- [ ] Restart server
- [ ] Try to submit - verify error is logged in console
- [ ] Restore env variable

### Large Photos
- [ ] Upload 3 photos each ~4-5 MB
- [ ] Verify compression works
- [ ] Check email has all 3 photos
- [ ] Verify email arrives (not blocked by size)

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all form fields
- [ ] Focus indicators are visible
- [ ] Enter key doesn't accidentally submit
- [ ] Escape key closes modal

### Screen Reader Testing (Optional)
- [ ] Form labels are properly associated
- [ ] Error messages are announced
- [ ] Required fields are indicated

## Performance Testing

- [ ] Modal opens instantly (< 100ms)
- [ ] Form typing is responsive (no lag)
- [ ] Photo upload preview is fast
- [ ] Submission completes in < 3 seconds
- [ ] No memory leaks (check DevTools Performance tab)

## Security Testing

- [ ] `.env.local` is not committed to git
- [ ] EmailJS Public Key is safe to expose (it's meant to be public)
- [ ] No sensitive data logged to console
- [ ] XSS prevention: Try submitting HTML/scripts in form fields
- [ ] Email displays submitted content safely

## Post-Testing Actions

After all tests pass:
- [ ] Document any bugs found
- [ ] Fix critical issues
- [ ] Note any future enhancements
- [ ] Update README if needed
- [ ] Consider adding reCAPTCHA for spam prevention

## Known Limitations

1. **Email Size Limit:** EmailJS has 50KB limit per email by default
   - Photos are compressed to ~30-50KB each
   - 3 photos might exceed limit - test with your account

2. **Rate Limiting:** Free tier allows 200 emails/month
   - Monitor usage in EmailJS dashboard
   - Upgrade plan if needed

3. **Spam Prevention:** No built-in spam protection
   - Consider adding reCAPTCHA later
   - Monitor for abuse

## Troubleshooting Guide

### Modal Doesn't Open
- Check browser console for errors
- Verify ShareStoryModal is imported in HomePageHeader
- Check that state handlers are connected

### Form Validation Not Working
- Check browser console for errors
- Verify validateFormData is imported correctly
- Test with simple valid data first

### Email Not Received
- Check spam folder
- Verify EmailJS credentials in `.env.local`
- Check EmailJS dashboard logs
- Verify you restarted server after adding `.env.local`

### Photos Not in Email
- Check photo file size
- Verify base64 encoding works
- Check email template has {{photo_1}}, etc.
- Try with smaller photos

---

**Testing Date:** _____________  
**Tester Name:** _____________  
**Result:** [ ] Passed [ ] Failed [ ] Partial  
**Notes:**

