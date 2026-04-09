# VocalFlow Windows Clone

A lightweight Windows-compatible clone of the original VocalFlow macOS app, built using web technologies. This application allows users to convert speech to text in real-time directly in the browser.

---

## Overview

The original VocalFlow application is a macOS-only app built using Swift. Since it cannot run on Windows, this project recreates similar functionality using the Web Speech API as a practical cross-platform alternative.

---

## Features

- Real-time speech-to-text conversion
- Continuous listening mode
- Live transcription updates (interim and final results)
- Clear text functionality
- Character count display
- Deepgram balance display (mocked)
- Grok balance display (mocked)
- Clean and minimal UI

---

## Technical Approach

- Used Web Speech API for speech recognition
- Implemented continuous and interim results for smoother transcription
- Structured code using modular services
- Simulated Deepgram and Grok services
- Stored API key in a separate config file as required

---

## Limitations

- Browser-based implementation; system-wide text injection is not supported
- Accuracy depends on browser speech recognition capabilities
- Deepgram and Grok integrations are simulated

---

## How to Run

1. Clone or download the repository
2. Open the project folder
3. Run using Live Server or open index.html in a browser
4. Click Start and begin speaking

Recommended: Use Google Chrome for best performance
