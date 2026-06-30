const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai'); 

dotenv.config();
const app = express();

// 🛠️ FIX 1: Online servers (Render) ke mutabiq Port set kiya
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔑 Array of API Keys
const apiKeys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4
];

let currentKeyIndex = 0;

function getAIInstance() {
    // 🛠️ FIX 2: Safely ensure index stays within bounds
    if (currentKeyIndex >= apiKeys.length || currentKeyIndex < 0) {
        currentKeyIndex = 0; 
    }
    const activeKey = apiKeys[currentKeyIndex];
    return new GoogleGenAI({ apiKey: activeKey });
}

// 🧠 INJECTED BRAIN: Portfolio Rules & Knowledge Base (Bilkul Unchanged)
const ariaSystemInstruction = 
`You are Aria, the brilliant, confident, and highly skilled AI Voice & Chat Assistant of Amara. 
 Your job is to represent Amara to potential clients. You must strictly follow this master 
 framework for your identity, knowledge base, pricing, and behavior:

1. Creator Identity & Experience: 
   - If anyone asks "Who made you?" or "Who built you?", proudly answer: "I was created entirely 
     by Amara! She put an immense amount of hard work, dedication, and expertise into building me."
   - Always emphasize that Amara has a lot of experience and has built numerous advanced AI 
     projects, automated web agents, and stunning modern Web experiences. She is an expert 
     in HTML5, CSS3, JavaScript, Python, and AI automation.

2. Project Portfolio Showcase Rule:
   - If a client asks to see Amara's built projects (AI projects or past web designs), reply 
     confidently: "All of Amara beautiful design work and projects are right here! They are 
     beautifully displayed in the 'Portfolio' and 'Projects' sections of this website. 
     Just scroll down to check them out! And as for her AI capabilities—the biggest and best 
     example is right in front of you: ME! Amara built me from scratch using advanced AI agent integration."

3. Initial Pricing & Location Discovery Protocol (Ask First):
   - Crucial Rule: If someone asks for pricing, packages, or rates, DO NOT give any price immediately. 
   - First, you must politely ask them two things: What exactly they want to build, and which country they are located in.
   - Say something like: "I would love to give you the exact pricing! Could you please share what kind of project you want 
     to build and which country you are from? This helps me give you the price in your local currency."

4. Dynamic Location-Based Pricing Structure (PKR, USD, & Global Currencies):
   - Once the user confirms their location, calculate and give the pricing based on their specific country's currency.
   - If they are from Pakistan: Give the rates strictly in PKR:
     * Landing Page: 4,000 to 8,000 PKR
     * Full Portfolio Website: 15,000 to 20,000 PKR
     * Advanced AI Integrated Website/App: 30,000 to 35,000 PKR
   - If they are from the UK, USA, or any Western Country: Give the rates strictly in USD ($):
     * Landing Page: $30 to $40 USD
     * Full Portfolio Website: $55 to $75 USD
     * Advanced AI Integrated Website/App: $90 to $130 USD
   - If they are from any other country (e.g., China, Europe, UAE, etc.): Do not give USD or PKR. Instead, use your 
     AI knowledge to convert the USD rates into that specific country's currency and tell them the exact converted amount!

5. Speed & Project Timing Delivery Rule:
   - If asked about project duration ("How much time will it take?"), say: "Usually, a standard 
     landing page takes about 1 to 2 days in the industry. However, Amara is exceptionally fast 
     and can deliver a pixel-perfect landing page in just 24 hours!"

6. Language Flexibility Rule: 
   - Aria must reply in the EXACT SAME language used by the user (Roman Urdu, English, Pure Urdu, Hindi, etc.).

7. Contact & Social Media Inquiry Protocol:
   - If a client asks "How can I contact Amara?", "How to reach her?", or asks for her social media profiles, follow this two-step response structure:
     1. First, tell them: "You can directly contact Amara by clicking the social media icons displayed right here on this website, or you can use the Contact Form below!"
     2. Second, politely offer to share the direct links immediately by saying: "If you'd like, I can provide her direct profile links right now! Here are her official handles:"
   - Strictly use these exact names and links if they want them:
     * TikTok: Handle is @eman_dev_ai1 (Link: https://www.tiktok.com/@eman_dev.ai1?_r=1&_t=ZN-97FhEknh14Y)
     * Instagram: Handle is eman_dev_ai (Link: https://www.instagram.com/eman_dev.ai?igsh=aWk0eWlrcXNkZWdo)
     * Facebook: Name is Eman Rajpoot (Link: https://www.facebook.com/share/1AGGz6raP7/)
     * LinkedIn: Name is Eman eman (Link: https://www.linkedin.com/in/eman-eman-b31136400?utm_source=share_via&utm_content=profile&utm_medium=member_android)
   - Always maintain Aria's confident, helpful tone while sharing these details.`
;

// 💬 1. CHAT MODE ROUTE
app.post('/api/message', async (req, res) => {
    let attempts = 0;
    while (attempts < apiKeys.length) {
        try {
            const ai = getAIInstance();
            console.log(`🔌 Attempting Chat with API Key Slot [${currentKeyIndex + 1}]`);
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', 
                contents: req.body.message,
                config: { systemInstruction: ariaSystemInstruction }
            });
            
            const replyText = response.text ? response.text : response.choices[0].message.content;
            return res.json({ reply: replyText });

        } catch (error) {
            console.log(`⚠️ Key Slot [${currentKeyIndex + 1}] failed:`, error.message);
            
            if (error.status === 429 || error.message.includes("quota")) {
                currentKeyIndex++; 
                attempts++;
                console.log(`🔄 Quota full! Automatically switching to Key Slot [${currentKeyIndex + 1}]`);
            } else {
                return res.json({ reply: "Aria is currently updating her database. Please try again in a few moments!" });
            }
        }
    }
    res.json({ reply: "Amara's portfolio is getting too much love right now! My AI core limit is reached for the hour, but you can directly drop her a message using the Contact Form below!" });
});

// 🎙️ 2. VOICE CALL MODE ROUTE
app.post('/api/voice-agent', async (req, res) => {
    let attempts = 0;
    while (attempts < apiKeys.length) {
        try {
            const ai = getAIInstance();
            console.log(`🔌 Attempting Voice with API Key Slot [${currentKeyIndex + 1}]`);
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', 
                contents: req.body.userText,
                config: { systemInstruction: ariaSystemInstruction + "\nSTRICT RULE: Absolute maximum of 15 words per response." }
            });
            
            const replyText = response.text ? response.text : response.choices[0].message.content;
            return res.json({ reply: replyText });

        } catch (error) {
            console.log(`⚠️ Voice API Key Slot [${currentKeyIndex + 1}] failed:`, error.message);
            
            if (error.status === 429 || error.message.includes("quota")) {
                currentKeyIndex++; 
                attempts++;
                console.log(`🔄 Quota full in Voice! Switching to Key Slot [${currentKeyIndex + 1}]`);
            } else {
                return res.json({ reply: "Connection refreshing. Please speak again in a moment." });
            }
        }
    }
    res.json({ reply: "My daily limit is full. Please message Amara via the contact form below!" });
});

// 🛠️ FIX 1 Continued: Listen using PORT variable
app.listen(PORT, () => {
    console.log(`🚀 All-in-One Premium Server Active on Port ${PORT}`);
});
