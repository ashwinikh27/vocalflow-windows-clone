import { DEEPGRAM_API_KEY } from './config.js';
import { getDeepgramBalance } from "./services/deepgramService.js";
import { processText } from "./services/grokService.js";

// Check support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Use Google Chrome for best experience.");
}

const recognition = new SpeechRecognition();
let isRecording = false;

// GLOBAL STATE
let finalText = "";
let isAppendMode = true;

recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// Start
recognition.onstart = function () {
  document.getElementById("status").innerText = "🔴 Recording...";
};

// Result
recognition.onresult = function (event) {
  let interimText = "";
  let newFinalText = finalText;

  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;

    if (event.results[i].isFinal) {
      //  removed extra space here
      newFinalText += processText(transcript);
    } else {
      interimText += transcript;
    }
  }

  //  trim to remove unwanted spaces
  finalText = newFinalText.trim();

  const fullText = finalText + interimText;

  // Show both final + interim
  document.getElementById("output").value = fullText;

  //  fixed character count
  document.getElementById("charCount").innerText =
    fullText.trim().length + " characters";

  // Copy only final
  navigator.clipboard.writeText(finalText);

  document.getElementById("status").innerText = "🎤 Listening...";
};

// End 
recognition.onend = function () {
  console.log("Mic ended");

  if (isRecording) {
    setTimeout(() => recognition.start(), 200);
  }
};

// Error
recognition.onerror = function (event) {
  console.log("Error:", event.error);

  if (event.error === "not-allowed") {
    document.getElementById("status").innerText = "❌ Mic permission denied";
  }
};

// Start
window.startRecording = function () {
  if (isRecording) return;

  isRecording = true;

  document.getElementById("status").innerText = "🔴 Recording...";
  document.getElementById("startBtn").disabled = true;

  try {
    recognition.start();
  } catch (e) {
    console.log("Already started");
  }
};

// Stop
window.stopRecording = function () {
  isRecording = false;

  recognition.stop();

  document.getElementById("status").innerText = "🟢 Ready";
  document.getElementById("startBtn").disabled = false;
};

// Clear
window.clearText = function () {
  finalText = "";
  document.getElementById("output").value = "";
  
  //  reset character count
  document.getElementById("charCount").innerText = "0 characters";

  document.getElementById("status").innerText = "🧹 Cleared";
};

window.copyText = function () {
  const text = document.getElementById("output").value;
  navigator.clipboard.writeText(text);
  document.getElementById("status").innerText = "📋 Copied!";
};

// Load balances
document.getElementById("deepgramBalance").innerText =
  "Deepgram Balance: " + getDeepgramBalance();

document.getElementById("grokBalance").innerText =
  "Grok Balance: $15";