# Clariona AI - Premium Digital Agency

This is a premium, light-themed marketing website for Clariona AI, built with React, TypeScript, and Tailwind CSS.

## Features
- **Multi-page Architecture**: Home, Services, Websites, GMB Ranking, Voice Agents, About, and Contact.
- **Premium Design**: Minimalist aesthetic with a light color palette (#FAFBFF background), soft shadows, and glassy highlights.
- **Voice Agent Mock**: A floating interactive voice agent button and modal that simulates a real-time conversation.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **SEO Ready**: Proper heading hierarchy and metadata.

## Folder Structure
- `src/components/layout/`: Global layout components like Navbar, Footer, and ScrollToTop.
- `src/components/sections/`: Reusable page sections (Hero, ServicesOverview, HowWeWork, etc.).
- `src/components/ui/`: Atomic UI components like Logo and Buttons.
- `src/components/voice-agent/`: Isolated voice agent logic and UI.
- `src/pages/`: Individual page components.
- `src/data/`: Centralized constants for services, FAQs, and process steps.
- `src/lib/`: Utility functions.

## Customization
- **Services**: Edit `src/data/constants.ts` to update service descriptions, benefits, or icons.
- **FAQs**: Update the `FAQS` array in `src/data/constants.ts`.
- **Voice Agent**: Modify `src/components/voice-agent/VoiceAgent.tsx` to change the mock responses or integrate with real APIs like Vapi or Retell.
- **Colors**: Brand colors are defined in `src/index.css` under the `@theme` block.

## How to Run
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`
