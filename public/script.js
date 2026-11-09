const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chips = document.querySelectorAll('.chip');

function addMessage(role, text, headline = '') {
  const message = document.createElement('div');
  message.className = `message ${role}`;

  if (role === 'assistant') {
    const title = document.createElement('strong');
    title.textContent = headline || 'Jarvis';
    message.appendChild(title);
  }

  const content = document.createElement('p');
  content.textContent = text;
  message.appendChild(content);

  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleUserQuestion(question) {
  if (!question.trim()) return;

  addMessage('user', question);
  userInput.value = '';

  try {
    const response = await fetch('/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong.');
    }

    addMessage('assistant', data.answer, data.headline);
  } catch (error) {
    addMessage('assistant', 'I could not process that request right now. Please try again with a simpler question.', 'Connection issue');
  }
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  handleUserQuestion(userInput.value);
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const question = chip.dataset.question;
    handleUserQuestion(question);
  });
});
