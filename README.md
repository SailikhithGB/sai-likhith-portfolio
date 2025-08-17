# ARIA - Advanced Responsive Intelligence Assistant 🤖

A powerful, modern AI assistant application built with React, TypeScript, and OpenAI's GPT models. ARIA provides intelligent conversation, voice interaction, task management, and much more in a beautiful, cyberpunk-inspired interface.

![ARIA Screenshot](https://via.placeholder.com/800x400/0a0a0a/00d4ff?text=ARIA+AI+Assistant)

## ✨ Features

### 🧠 **Intelligent Conversation**
- Powered by OpenAI's GPT-3.5 Turbo and GPT-4 models
- Natural, context-aware conversations
- Memory system that remembers your preferences and conversation history
- Personalized responses based on your profile

### 🎤 **Voice Capabilities**
- **Speech-to-Text**: Click the microphone to speak your messages
- **Text-to-Speech**: ARIA can read responses aloud with customizable voice settings
- Multiple voice options with adjustable speed, pitch, and volume
- Real-time voice status indicators

### 📋 **Task Management**
- **Reminders**: Create and manage reminders with natural language
- **Calculator**: Perform mathematical calculations
- **System Info**: Get detailed system and browser information
- **Time & Date**: Current time, date, and timezone information
- **Weather**: Simulated weather information (can be extended with real APIs)
- **Web Search**: Simulated search functionality (can be extended with real APIs)

### 💾 **Data Persistence**
- Conversation history stored locally using IndexedDB
- User preferences and settings persistence
- Export/import conversation data
- Secure local storage with no data sent to external servers (except OpenAI API)

### 🎨 **Modern UI/UX**
- Beautiful cyberpunk-inspired design with neon gradients
- Smooth animations and transitions using Framer Motion
- Responsive design that works on desktop, tablet, and mobile
- Dark theme optimized for extended use
- Markdown support for rich text formatting

### ⚙️ **Customization**
- Configurable AI model selection (GPT-3.5 Turbo or GPT-4)
- Adjustable response parameters (temperature, max tokens)
- Voice settings customization
- Personal information for better context
- Theme and appearance options

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **bun** package manager
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aria-ai-assistant.git
   cd aria-ai-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` and start chatting with ARIA!

## 🔧 Configuration

### API Key Setup

1. **Get your OpenAI API key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Add the API key**:
   - **Option 1**: Add to `.env` file (recommended for development)
   - **Option 2**: Use the settings dialog in the app (click the settings icon)

### Voice Setup

ARIA uses the Web Speech API for voice features:
- **Speech Recognition**: Supported in Chrome, Edge, and Safari
- **Text-to-Speech**: Supported in all modern browsers
- **Permissions**: You may need to grant microphone permissions

## 📱 Usage

### Starting a Conversation
- Type a message in the input field or click the microphone to speak
- ARIA will respond with intelligent, contextual answers
- Conversations are automatically saved and can be resumed later

### Voice Interaction
- **Click the microphone** to start voice input
- **Speak clearly** and ARIA will transcribe your speech
- **Enable auto-speak** in settings to have ARIA read responses aloud

### Task Commands
Try these natural language commands:

- **Reminders**: "Remind me to call mom tomorrow at 2 PM"
- **Calculations**: "What is 15 * 7 + 23?"
- **System Info**: "Show me my system information"
- **Time**: "What time is it?"
- **Weather**: "What's the weather like?" (simulated)
- **Search**: "Search for information about AI" (simulated)

### Settings & Customization
Click the settings icon to:
- Configure your OpenAI API key
- Adjust voice settings (speed, pitch, volume)
- Select AI model (GPT-3.5 Turbo or GPT-4)
- Set personal information for better context
- Customize response parameters

## 🏗️ Architecture

### Core Components

```
src/
├── components/          # React components
│   ├── chat/           # Chat interface components
│   ├── settings/       # Settings and configuration
│   └── ui/             # Reusable UI components
├── contexts/           # React context providers
├── services/           # Core services and APIs
│   ├── aiService.ts    # OpenAI integration
│   ├── voiceService.ts # Speech recognition/synthesis
│   ├── storageService.ts # Data persistence
│   └── taskService.ts  # Task management
├── types/              # TypeScript type definitions
└── styles/             # CSS and styling
```

### Key Services

- **AIService**: Handles OpenAI API integration and response generation
- **VoiceService**: Manages speech recognition and text-to-speech
- **StorageService**: Handles data persistence using IndexedDB
- **TaskService**: Processes specific tasks like reminders and calculations

## 🔒 Privacy & Security

- **Local-First**: All conversation data is stored locally in your browser
- **No Tracking**: No analytics or tracking scripts
- **API Security**: OpenAI API key is stored locally and only sent to OpenAI
- **Permissions**: Only requests microphone permission for voice features

## 🛠️ Development

### Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom cyber theme
- **Animations**: Framer Motion
- **Storage**: IndexedDB via LocalForage
- **AI**: OpenAI API
- **Voice**: Web Speech API
- **Build**: Vite
- **Package Manager**: npm/bun

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features

1. **New Task Types**: Extend `TaskService` with new handlers
2. **UI Components**: Add to `src/components/`
3. **AI Capabilities**: Modify `AIService` for new AI features
4. **Storage**: Extend `StorageService` for new data types

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT models
- **Radix UI** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/aria-ai-assistant/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Roadmap

- [ ] **Real Web Search**: Integration with search APIs
- [ ] **Real Weather Data**: Integration with weather APIs
- [ ] **File Upload**: Support for document analysis
- [ ] **Plugin System**: Extensible plugin architecture
- [ ] **Multi-language**: Support for multiple languages
- [ ] **Cloud Sync**: Optional cloud synchronization
- [ ] **Mobile App**: React Native version
- [ ] **Desktop App**: Electron wrapper

---

**Built with ❤️ by [Sai Likhith GB](https://sailikhithgb.lovable.app)**

*Transform your productivity with the power of AI conversation.*
