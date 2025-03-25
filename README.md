# Automated Email Extension 🤖💌

Let's be honest, who writes emails anymore?
However, even opening up chatgpt or gemini and explaining what I want written in my email is a huge task for someone as lazy as me. So, I took out a weekend and with the little javascript I remember from first semester, I attempted to make my first chrome extension.

## What Does This Do?
- **Auto-suggestion template**: Adds a ready-to-go email structure right in your compose window with fields like `To`, `Relation`, `Mood`, etc.
- **Generate Button**: All of this email generation will be done within the compose window through a button in the subject text field
- **Built with Gemini**: Uses the **Gemini API** since it is free.

## Demo
![Screenshot 2025-03-25 210717](https://github.com/user-attachments/assets/1600afe0-f3fa-4211-925a-d0c967ea08b6)

### Email generated within seconds.

![Screenshot 2025-03-25 211104](https://github.com/user-attachments/assets/f8f6c411-beb4-4815-ac78-44d549df5359)


### Another Example

![Screenshot 2025-03-25 211528](https://github.com/user-attachments/assets/1c8fb0d9-ee25-4581-997a-4b34588dcf9a)

![Screenshot 2025-03-25 211606](https://github.com/user-attachments/assets/4c6b6eb0-5e7e-4813-a32a-88a138aa3c9d)

Quick and Human-y.

## Installation Guide (Easy Peasy 🍋)
1. **Download or Clone** the extension:
   ```bash
   git clone https://github.com/molarmuaz/ai_email_extension
   ```

2. **Upload the Extension** to Chrome:
   - Open Chrome and type `chrome://extensions/` in the URL bar.
   - Toggle on **Developer Mode** (top right corner).
   - Click **Load unpacked** and select the extension folder (where you downloaded it).

3. **Add Your Gemini API Key**:
   - Inside the extension folder, go to the `content.js` file.
   - Add your Gemini API key where it says `const API_KEY = 'API_KEY'`.
   - Save it, reload the extension, and you're set!

4. **Compose Emails** like a Boss:
   - Go to Gmail, hit **Compose** and see the magic happen! The email suggestion template appears, making you look super organized without the effort.

## Email Template Example
Once you hit compose, you'll get this fancy template:
```html
<strong>To:</strong><br>
<strong>Relation:</strong><br>
<strong>From:</strong><br>
<strong>Subject:</strong><br>
<strong>Mood:</strong><br>
<strong>What to include:</strong><br>
<strong>What not to include:</strong><br><br>
```

It’s auto-generated and makes your emails look more thoughtful with minimal effort. 

## Final Thoughts
This extension is far from perfect and was more of a fun project I have wanted to do for a while. Have fun with it, add buttons, change the prompt, etc. If I ever come back to this project I would want to figure out how to also add the subject in the subject line (as you can see in my code, I have failed in doing so and couldn't figure out the issue).

---

Let me know what you think.
