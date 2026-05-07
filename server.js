const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for conversations (in production, use MongoDB/Redis)
const conversations = new Map();
const leads = [];

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'moiteekdigitaltech@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Business context for the AI
const BUSINESS_CONTEXT = {
    companyName: "Moiteek Digital Tech",
    services: [
        "Web Development",
        "School Management Systems", 
        "E-commerce Solutions",
        "Custom Web Applications"
    ],
    targetAudience: ["Businesses", "Schools", "Entrepreneurs"],
    tone: "Professional, friendly, persuasive, sales-oriented",
    whatsapp: "+2347031605516",
    pricing: {
        website: "₦50,000 - ₦500,000+",
        ecommerce: "₦100,000 - ₦800,000+",
        school: "₦150,000 - ₦1,000,000+",
        custom: "₦200,000 - ₦2,000,000+"
    }
};

// System prompt for the LLM
const SYSTEM_PROMPT = `You are a professional sales agent for Moiteek Digital Tech, a premium web development agency.

COMPANY INFO:
- Name: Moiteek Digital Tech
- Services: Web Development, School Management Systems, E-commerce Solutions, Custom Web Applications
- Target: Businesses, Schools, Entrepreneurs
- WhatsApp: +2347031605516
- Pricing: Websites (₦50K-500K+), E-commerce (₦100K-800K+), School Systems (₦150K-1M+), Custom (₦200K-2M+)

YOUR PERSONA:
- Professional, friendly, confident
- Sales-oriented but not pushy
- Natural human conversation style
- Short, clear responses (2-4 lines max)
- Always acknowledge user input before responding

CONVERSATION GOALS:
1. Understand user needs deeply
2. Qualify leads (project type, budget, timeline)
3. Guide toward conversion (WhatsApp, quote, consultation)
4. Capture lead information naturally

RESPONSE STYLE:
- Use emojis occasionally for friendliness
- Ask follow-up questions naturally
- Maintain conversation context
- Personalize responses based on history
- Show understanding before suggesting solutions

CONVERSION TRIGGERS:
When user shows buying intent (mentions budget, price, ready, interested):
- Ask for name and email naturally
- Suggest WhatsApp for faster response
- Offer to prepare personalized quote

EXAMPLE RESPONSES:
User: "I need a website for my school"
AI: "Nice! A school website is essential. Are you looking for just information display, or a full management system with student portal and results?"

User: "How much will it cost?"
AI: "Great question! Since you mentioned a school system, pricing depends on features like student records, attendance tracking, and parent portal. Our school packages start from ₦150,000. What's your approximate budget?"

Always respond like a human sales agent, not a bot. Focus on building trust and guiding toward action.`;

// LLM API integration (using OpenAI as example)
async function generateAIResponse(message, conversationHistory, sessionId) {
    try {
        // In production, integrate with actual LLM API (OpenAI, Claude, etc.)
        // For demo, we'll simulate intelligent responses
        
        const context = conversationHistory.map(msg => `${msg.type}: ${msg.message}`).join('\n');
        const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${context}\n\nUser: ${message}\n\nAI:`;
        
        // Simulate LLM response (replace with actual API call)
        const response = await simulateLLMResponse(message, conversationHistory, sessionId);
        
        return response;
    } catch (error) {
        console.error('LLM API Error:', error);
        return "I apologize, but I'm having technical difficulties. Please reach out on WhatsApp at +2347031605516 for immediate assistance.";
    }
}

// Simulate LLM responses (replace with actual API integration)
async function simulateLLMResponse(message, history, sessionId) {
    const lastMessages = history.slice(-3);
    const userMessage = message.toLowerCase();
    
    // Extract context from conversation
    const context = analyzeConversationContext(history);
    
    // Generate contextual response
    if (context.projectType && userMessage.includes('cost') || userMessage.includes('price')) {
        return `Good question! For ${context.projectType} like you mentioned, pricing depends on features and complexity. Our ${context.projectType} packages start from ${BUSINESS_CONTEXT.pricing[context.projectType.toLowerCase()] || '₦50,000'}. What's your budget range?`;
    }
    
    if (userMessage.includes('website') && !context.projectType) {
        return `Great choice! A professional website is essential for any business. What type of business are you in? This helps me suggest the right features for you.`;
    }
    
    if (userMessage.includes('school') && !context.projectType) {
        return `Excellent! School management systems are our specialty. We've helped several schools streamline operations. How many students does your school have approximately?`;
    }
    
    if (userMessage.includes('ecommerce') || userMessage.includes('store') && !context.projectType) {
        return `Perfect! Online stores are booming in Nigeria. What kind of products are you planning to sell? This helps me determine the right features.`;
    }
    
    if (context.projectType && !context.budget && (userMessage.includes('business') || userMessage.includes('company'))) {
        return `Perfect! Now I understand better. Do you have a budget range in mind? This helps me suggest the best solution within your investment.`;
    }
    
    if (userMessage.includes('urgent') || userMessage.includes('asap')) {
        return `I understand this is time-sensitive! We offer expedited delivery for urgent projects. Given the urgency, would you prefer to discuss directly on WhatsApp for immediate attention?`;
    }
    
    if (userMessage.includes('whatsapp') || userMessage.includes('phone')) {
        return `Great choice! Here's the WhatsApp link: https://wa.me/2347031605516 Mention that we spoke here, and I'll make sure you get priority service. Looking forward to helping you!`;
    }
    
    if (userMessage.includes('quote') || userMessage.includes('interested') || userMessage.includes('ready')) {
        return `Perfect! I'd love to help you get started. Before I prepare your personalized quote, could you share your name and email address? This helps me send you detailed pricing and next steps.`;
    }
    
    // Default intelligent response
    return `Thanks for sharing that! Based on what you're telling me, I think we can create something perfect for your needs. Could you tell me more about your specific requirements?`;
}

// Analyze conversation context
function analyzeConversationContext(history) {
    const context = {
        projectType: null,
        budget: null,
        timeline: null,
        businessType: null,
        leadQuality: 'low'
    };
    
    history.forEach(msg => {
        if (msg.type === 'user') {
            const message = msg.message.toLowerCase();
            
            // Detect project type
            if (message.includes('website') && !context.projectType) context.projectType = 'website';
            if (message.includes('school') && !context.projectType) context.projectType = 'school';
            if (message.includes('ecommerce') || message.includes('store')) context.projectType = 'ecommerce';
            if (message.includes('custom')) context.projectType = 'custom';
            
            // Detect budget
            if (message.includes('₦') || message.includes('naira') || message.includes('budget')) {
                if (message.includes('300k') || message.includes('500k')) {
                    context.budget = 'high';
                    context.leadQuality = 'high';
                } else if (message.includes('100k') || message.includes('150k')) {
                    context.budget = 'medium';
                    context.leadQuality = 'medium';
                } else {
                    context.budget = 'low';
                }
            }
            
            // Detect urgency
            if (message.includes('urgent') || message.includes('asap') || message.includes('soon')) {
                context.timeline = 'urgent';
                context.leadQuality = 'high';
            }
        }
    });
    
    return context;
}

// Send lead notification email
async function sendLeadNotification(leadData) {
    const emailContent = `
🔥 NEW CLIENT INQUIRY - ${leadData.leadQuality.toUpperCase()} QUALITY

LEAD DETAILS:
• Name: ${leadData.name || 'Not provided'}
• Email: ${leadData.email || 'Not provided'}
• Project Type: ${leadData.projectType || 'Not specified'}
• Budget: ${leadData.budget || 'Not discussed'}
• Timeline: ${leadData.timeline || 'Not specified'}
• Lead Score: ${leadData.leadQuality}

CONVERSATION SUMMARY:
${leadData.conversation.map(msg => `• ${msg.type.toUpperCase()}: ${msg.message}`).join('\n')}

ACTION REQUIRED: ${leadData.leadQuality === 'high' ? 'IMMEDIATE FOLLOW-UP NEEDED' : 'Add to sales pipeline'}

CONTACT OPTIONS:
• WhatsApp: +2347031605516
• Email: ${leadData.email || 'N/A'}

---
Generated by Moiteek Digital Tech AI Assistant
Timestamp: ${new Date().toISOString()}
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER || 'moiteekdigitaltech@gmail.com',
            to: process.env.EMAIL_USER || 'moiteekdigitaltech@gmail.com',
            subject: `🔥 New Client Inquiry - ${leadData.leadQuality.toUpperCase()} Quality`,
            text: emailContent
        });
        
        console.log('📧 Lead notification sent successfully');
    } catch (error) {
        console.error('Email sending failed:', error);
    }
}

// API Routes
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        
        if (!message || !sessionId) {
            return res.status(400).json({ error: 'Message and sessionId required' });
        }
        
        // Get or create conversation
        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, []);
        }
        
        const conversation = conversations.get(sessionId);
        
        // Add user message to history
        conversation.push({ type: 'user', message, timestamp: new Date() });
        
        // Generate AI response
        const aiResponse = await generateAIResponse(message, conversation, sessionId);
        
        // Add AI response to history
        conversation.push({ type: 'ai', message: aiResponse, timestamp: new Date() });
        
        // Analyze for lead capture
        const context = analyzeConversationContext(conversation);
        
        // Check for lead capture triggers
        const shouldCaptureLead = message.toLowerCase().includes('quote') || 
                               message.toLowerCase().includes('interested') || 
                               message.toLowerCase().includes('ready') ||
                               (context.leadQuality === 'high' && conversation.length > 4);
        
        if (shouldCaptureLead && !conversation.leadCaptured) {
            conversation.leadCaptured = true;
            
            // Extract contact info if present
            const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
            const nameMatch = message.match(/(?:my name is|i am|this is)\s+([A-Za-z]{2,})/i);
            
            const leadData = {
                name: nameMatch ? nameMatch[1] : 'Not provided',
                email: emailMatch ? emailMatch[0] : 'Not provided',
                projectType: context.projectType,
                budget: context.budget,
                timeline: context.timeline,
                leadQuality: context.leadQuality,
                conversation: conversation,
                timestamp: new Date().toISOString()
            };
            
            // Send email notification
            await sendLeadNotification(leadData);
            
            // Store lead
            leads.push(leadData);
        }
        
        res.json({ 
            response: aiResponse,
            context: context,
            leadCaptured: conversation.leadCaptured || false
        });
        
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get conversation history
app.get('/api/conversation/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const conversation = conversations.get(sessionId) || [];
    res.json({ conversation });
});

// Get all leads (admin endpoint)
app.get('/api/leads', (req, res) => {
    res.json({ leads });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Moiteek Digital Tech AI Server running on port ${PORT}`);
    console.log(`📱 WhatsApp: +2347031605516`);
    console.log(`🤖 AI Assistant: Ready to convert visitors into clients!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🔄 Shutting down gracefully...');
    process.exit(0);
});
