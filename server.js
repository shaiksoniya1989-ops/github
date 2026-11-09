const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function buildResponse(question) {
  const q = question.toLowerCase();

  if (q.includes('money') || q.includes('budget') || q.includes('debt') || q.includes('bills') || q.includes('save')) {
    return {
      headline: 'Money plan',
      message: 'Let’s simplify this. First, list your monthly income and all essentials. Then cut non-essential spending for 30 days, set a small emergency fund, and automate savings before rewards or entertainment. If debt is high, focus on the smallest balance first, then move to the next one.'
    };
  }

  if (q.includes('stress') || q.includes('anxiety') || q.includes('health') || q.includes('sleep') || q.includes('mental')) {
    return {
      headline: 'Well-being support',
      message: 'You do not need to fix everything at once. Take a 10-minute reset: breathe deeply, drink water, step away from screens, and write down the top 3 stressors. Then choose one action that reduces pressure today—rest, talk to someone, or get professional help if it feels overwhelming.'
    };
  }

  if (q.includes('study') || q.includes('school') || q.includes('exam') || q.includes('work') || q.includes('career')) {
    return {
      headline: 'Progress plan',
      message: 'Break the task into 3 blocks: 20 minutes focused work, 5 minutes review, then repeat. Set one goal for today, one for tomorrow, and one milestone for the week. Stop comparing your progress to others; consistency matters more than intensity.'
    };
  }

  if (q.includes('home') || q.includes('repair') || q.includes('broken') || q.includes('apartment') || q.includes('laundry')) {
    return {
      headline: 'Home fix plan',
      message: 'Start with the simplest safe action: identify the exact issue, check the obvious cause, and make one small fix at a time. If it is electrical, water, or safety-related, stop and get professional help. Keep a short checklist so you do not repeat the same mistake.'
    };
  }

  if (q.includes('relationship') || q.includes('family') || q.includes('friend') || q.includes('conflict')) {
    return {
      headline: 'Better communication',
      message: 'Choose calm timing, speak with empathy, and describe your feeling without blame. For example: “I feel stressed when plans change at the last minute. I need a quick heads-up.” Then listen fully, and agree on one clear next step.'
    };
  }

  return {
    headline: 'Smart next step',
    message: 'Here is a practical approach: define the problem in one sentence, list the options, choose the least risky solution, and create one small action you can complete today. You do not need a perfect answer; you need the next useful step.'
  };
}

app.post('/api/solve', (req, res) => {
  const question = req.body && req.body.question ? req.body.question.trim() : '';

  if (!question) {
    return res.status(400).json({
      error: 'Please enter a problem or question.'
    });
  }

  const result = buildResponse(question);
  res.json({
    success: true,
    answer: result.message,
    headline: result.headline,
    question
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Jarvis helper app running on http://localhost:${PORT}`);
});
