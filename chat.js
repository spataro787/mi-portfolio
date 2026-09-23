const toggle = document.querySelector("#chat-toggle");
const panel = document.querySelector("#chat-panel");
const closeButton = document.querySelector("#chat-close");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#chat-input");
const sendButton = document.querySelector("#chat-send");
const messages = document.querySelector("#chat-messages");

function setChatOpen(isOpen) {
  panel.hidden = !isOpen;
  toggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    input.focus();
  } else {
    toggle.focus();
  }
}

function addMessage(text, type) {
  const message = document.createElement("p");
  message.className = `chat-message ${type}`;
  message.textContent = text;

  messages.append(message);
  messages.scrollTop = messages.scrollHeight;

  return message;
}

toggle.addEventListener("click", () => {
  setChatOpen(panel.hidden);
});

closeButton.addEventListener("click", () => {
  setChatOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !panel.hidden) {
    setChatOpen(false);
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = input.value.trim();

  if (!question || question.length > 500) return;

  addMessage(question, "visitor");
  input.value = "";
  input.disabled = true;
  sendButton.disabled = true;

  const pending = addMessage("Escribiendo…", "assistant");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "No pude responder en este momento.");
    }

    pending.textContent = data.reply;
  } catch (error) {
    pending.textContent =
      error instanceof Error
        ? error.message
        : "No pude responder en este momento.";
  } finally {
    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
    messages.scrollTop = messages.scrollHeight;
  }
});