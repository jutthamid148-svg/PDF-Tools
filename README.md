# PDF Quick Tools

A modern, browser-based PDF utility platform built with React, TanStack Router, and VStack. Compress, merge, split, convert, and manage PDF files — all without uploading to a server.

## Features

### PDF Tools
| Tool | Description |
|------|-------------|
| **Compress PDF** | Reduce file size while maintaining quality |
| **Merge PDF** | Combine multiple PDFs into one document |
| **Split PDF** | Extract specific pages from a PDF |
| **PDF to JPG** | Convert PDF pages into JPG images |
| **JPG to PDF** | Convert images into a single PDF |
| **Rotate PDF** | Fix sideways or upside-down pages |
| **Delete Pages** | Remove unwanted pages |
| **Extract Pages** | Keep only the pages you select |

### AI-Powered Tools
| Tool | Description |
|------|-------------|
| **AI Summarizer** | Get instant summaries with key points and reading time |
| **AI Chat** | Ask questions about your PDF content |
| **AI Quiz Generator** | Create study quizzes from PDF content |
| **AI Notes** | Generate structured notes from documents |

## Tech Stack

- **Framework:** React 19 + TanStack Router + TanStack Start
- **Styling:** Tailwind CSS v4
- **PDF Processing:** pdf-lib, pdfjs-dist
- **AI Integration:** Gemini API (server-side)
- **Build:** Vite 8 + Cloudflare Workers
- **Deployment:** Whop CLI

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/jutthamid148-svg/PDF-Tools.git
cd PDF-Tools
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

### Chrome Extension

Build the companion extension with:

```bash
npm run build:extension
```

Then load the generated `dist-extension/` folder from `chrome://extensions` with
Developer mode enabled. A packaged ZIP is also available at
`/downloads/pdf-tool-chrome-extension.zip` on the deployed website.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── FileUploader   # Drag & drop file upload
│   ├── ToolCard       # Tool display cards
│   ├── ToolShell      # Tool page layout
│   └── ui/            # Design system (buttons, cards, etc.)
├── hooks/            # Custom React hooks
│   └── useToolRun     # State machine for tool processing
├── lib/              # Utilities and helpers
│   ├── ai.ts          # AI integration (Gemini API)
│   ├── pdf.ts         # PDF processing utilities
│   └── tools.ts       # Tool definitions
├── routes/           # Page components
│   ├── index.tsx      # Landing page
│   ├── tools.tsx      # All tools page
│   ├── compress-pdf.tsx
│   ├── merge-pdf.tsx
│   └── ...
├── server/           # Server-side functions
│   └── askGemini.ts   # Gemini API server function
└── styles.css        # Global styles and animations
```

## How It Works

1. **Upload** — Drag and drop or click to select your PDF
2. **Process** — Choose your desired operation
3. **Download** — Get your processed file instantly

All processing happens in your browser. Files never leave your device.

## Key Features

- **No Account Required** — Use all tools without signing up
- **No Watermarks** — Clean output files
- **Mobile Friendly** — Works on all devices
- **Privacy First** — Files are processed locally in your browser
- **AI Powered** — Smart analysis with Gemini AI integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or feedback, please open an issue on the repository.
