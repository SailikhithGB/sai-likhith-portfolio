# ARIA AI Assistant - Setup Guide 🚀

This guide will help you get ARIA up and running on your system quickly and efficiently.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun** (faster alternative) - [Bun installation](https://bun.sh/)
- **Git** - [Download here](https://git-scm.com/)

### Required API Keys
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
  - You'll need an OpenAI account with billing set up
  - Free tier includes $5 in credits for new accounts

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Browser**: Chrome 88+, Firefox 85+, Safari 14+, or Edge 88+

## 🚀 Quick Installation

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/your-username/aria-ai-assistant.git

# Or using SSH
git clone git@github.com:your-username/aria-ai-assistant.git

# Navigate to the project directory
cd aria-ai-assistant
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm (recommended for compatibility)
npm install

# Using bun (faster installation)
bun install

# Using yarn (alternative)
yarn install
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your preferred editor
nano .env
# or
code .env
```

Add your OpenAI API key to the `.env` file:

```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 4. Start the Development Server

```bash
# Using npm
npm run dev

# Using bun
bun run dev

# Using yarn
yarn dev
```

### 5. Open Your Browser

Navigate to `http://localhost:5173` and you should see ARIA's welcome screen!

## 🔧 Detailed Configuration

### OpenAI API Key Setup

#### Option 1: Environment Variable (Recommended)
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env` file:
   ```env
   VITE_OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart the development server

#### Option 2: In-App Configuration
1. Start the application without an API key
2. Click the settings icon (⚙️) in the top-right corner
3. Go to the "API" tab
4. Enter your OpenAI API key
5. Click "Save Settings"

### Voice Features Setup

ARIA's voice features use the Web Speech API, which requires:

#### Browser Compatibility
- **Chrome/Chromium**: Full support for speech recognition and synthesis
- **Edge**: Full support for speech recognition and synthesis
- **Safari**: Limited support (synthesis only on some versions)
- **Firefox**: Synthesis support only

#### Permissions
1. **Microphone Access**: Grant permission when prompted
2. **HTTPS**: Voice features require HTTPS in production (development works on localhost)

#### Troubleshooting Voice Issues
- Ensure your microphone is working in other applications
- Check browser permissions in Settings > Privacy & Security
- Try refreshing the page if voice stops working
- Some browsers may require user interaction before enabling speech

## 🛠️ Development Setup

### Project Structure
```
aria-ai-assistant/
├── src/
│   ├── components/          # React components
│   │   ├── chat/           # Chat interface
│   │   ├── settings/       # Settings dialogs
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── services/           # Core services
│   │   ├── aiService.ts    # OpenAI integration
│   │   ├── voiceService.ts # Speech features
│   │   ├── storageService.ts # Data persistence
│   │   └── taskService.ts  # Task management
│   ├── types/              # TypeScript definitions
│   └── styles/             # CSS and styling
├── public/                 # Static assets
├── .env.example           # Environment template
└── package.json           # Dependencies
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Maintenance
npm run clean        # Clean build artifacts
npm update           # Update dependencies
```

### IDE Setup

#### VS Code (Recommended)
Install these extensions:
- **TypeScript and JavaScript Language Features** (built-in)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

#### WebStorm/IntelliJ
Enable:
- TypeScript support
- React JSX syntax highlighting
- ESLint integration
- Prettier formatting

## 🔍 Troubleshooting

### Common Issues

#### 1. "Module not found" errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. "OpenAI API key not configured" message
- Check your `.env` file exists and contains the correct key
- Ensure the key starts with `sk-`
- Restart the development server after adding the key

#### 3. Voice features not working
- Check browser compatibility (Chrome recommended)
- Ensure microphone permissions are granted
- Try using HTTPS (required for production)
- Clear browser cache and cookies

#### 4. Build errors
```bash
# Check for TypeScript errors
npm run type-check

# Clear build cache
rm -rf dist .vite
npm run build
```

#### 5. Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Performance Issues

#### Slow Loading
- Check your internet connection for API calls
- Clear browser cache
- Ensure you're using a modern browser
- Close unnecessary browser tabs

#### High Memory Usage
- Clear conversation history in settings
- Restart the browser
- Check for memory leaks in browser dev tools

### API Issues

#### Rate Limiting
- OpenAI has rate limits based on your plan
- Wait a few minutes before trying again
- Consider upgrading your OpenAI plan

#### Invalid API Key
- Verify your key is correct and active
- Check your OpenAI account billing status
- Regenerate the API key if needed

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Preview the build locally
npm run preview
```

### Static Hosting (Recommended)

#### Vercel
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy automatically

#### Netlify
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Add environment variables in build settings
4. Deploy automatically

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### Environment Variables for Production

```env
# Production environment
VITE_OPENAI_API_KEY=your-production-api-key
VITE_APP_NAME=ARIA - AI Assistant
VITE_APP_VERSION=1.0.0
```

## 🔒 Security Considerations

### API Key Security
- **Never commit API keys** to version control
- Use environment variables for all sensitive data
- Consider using a backend proxy for API calls in production
- Rotate API keys regularly

### Browser Security
- ARIA runs entirely in the browser
- Conversation data is stored locally
- No data is sent to external servers (except OpenAI)

### HTTPS Requirements
- Voice features require HTTPS in production
- Use secure hosting providers
- Enable HTTPS redirects

## 📞 Getting Help

### Documentation
- **README.md**: Overview and features
- **CHANGELOG.md**: Recent changes and updates
- **This file**: Detailed setup instructions

### Community Support
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Discord/Slack**: Real-time community chat (if available)

### Professional Support
For enterprise deployments or custom integrations, contact the development team.

## 🎉 You're All Set!

Congratulations! You should now have ARIA running on your system. Here's what you can do next:

1. **Configure your settings** - Click the settings icon to personalize ARIA
2. **Try voice features** - Click the microphone to test speech-to-text
3. **Explore capabilities** - Ask ARIA about its features and abilities
4. **Create reminders** - Test the task management features
5. **Customize the experience** - Adjust AI model, voice settings, and more

## 🚀 What's Next?

- **Explore Features**: Try all of ARIA's capabilities
- **Customize Settings**: Personalize the experience to your needs
- **Contribute**: Help improve ARIA by reporting issues or contributing code
- **Share**: Tell others about your AI assistant experience

---

**Need more help?** Check out our [FAQ](FAQ.md) or create an issue on GitHub.

**Built with ❤️ by [Sai Likhith GB](https://sailikhithgb.lovable.app)**