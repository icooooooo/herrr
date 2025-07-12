const questions = [
  "What’s more powerful, love that’s shown or love that’s spoken?",
  "What’s one moment with me you’d relive forever?",
  "When did you feel closest to me?",
  "If we could run away today, where would we go?",
  "What’s something I do that makes you feel loved?",
  "What song reminds you of us?",
  "What do you imagine our life looking like in 5 years?",
  "When do you miss me the most?",
  "Is love more about the heart or the mind?",
  "What’s the kindest thing someone has ever done for you?",
  "Do you believe love can change a person?",
  "What’s a secret dream you’ve never told anyone?",
  "How do you show love without words?",
  "What’s a small gesture that means the world to you?",
  "Have you ever fallen in love at first sight?",
  "What scares you most about love?",
  "What’s your favorite memory of us?",
  "Do you think love is fate or choice?",
  "What’s something new you want to try together?",
  "When do you feel most loved by me?",
  "What does trust mean to you in a relationship?",
  "How do you heal from heartbreak?",
  "What’s the best way to say ‘I love you’ without speaking?",
  "Do you believe people can truly change for love?",
  "What’s the difference between loving and needing someone?",
  "What’s the biggest lesson love has taught you?",
  "If love were a color, what would it be and why?",
  "What’s the one thing that always makes you smile about us?",
  "Do you believe in soulmates?",
  "What’s your favorite way to spend time with me?",
  "How do you want to grow together?",
  "What’s the most romantic place you’ve ever been?",
  "What’s something about me that you didn’t notice at first but love now?",
  "What does being vulnerable mean to you?",
  "How do you define happiness in love?",
  "What’s one thing you wish we did more often?",
  "What’s the hardest part about loving someone?",
  "If you could write a love letter to your younger self, what would you say?",
  "What’s your love language?",
  "What’s a perfect date for you?",
  "How do you keep love alive during tough times?",
  "What’s a quality you admire most in me?",
  "What’s your favorite way to show affection?",
  "What’s something you’ve learned about yourself through loving me?",
  "If you could describe our love in one word, what would it be?",
  "What’s a song that perfectly describes our relationship?",
  "How do you handle jealousy in love?",
  "What’s your happiest memory with me?",
  "What’s one thing that always comforts you when you’re upset?",
  "Do you believe love can conquer distance?",
  "What’s something you want to accomplish together?",
  "How do you imagine our future home?",
  "What’s a fear you have about our relationship?",
  "What does forgiveness look like to you in love?",
  "How do you celebrate love every day?",
  "What’s the most surprising thing you’ve discovered about love?",
  "What’s your favorite way to start the day with me?",
  "What’s one thing you appreciate that I do quietly?",
  "What’s your idea of a lifelong partnership?",
  "How do you want us to grow as individuals and as a couple?",
  "What’s your favorite way to reconnect after a disagreement?",
  "What’s a moment when you felt truly seen by me?",
  "What’s the sweetest compliment you’ve ever received from me?",
  "How do you balance independence and togetherness?",
  "What’s something new you want to learn about love?",
  "What’s your favorite love story, real or fictional?",
  "How do you want to be supported when you’re down?",
  "What’s a tradition you want to start with me?",
  "What’s a quality in me that inspires you?",
  "What’s one thing you think makes our love unique?",
  "How do you feel when we’re apart for a while?",
  "What’s the best advice about love you’ve ever gotten?",
  "What’s something silly we do that you secretly love?",
  "How do you imagine our life will change in 10 years?",
  "What’s your favorite way to surprise me?",
  "What’s one thing you want to say but haven’t yet?",
  "How do you show love when words aren’t enough?",
  "What’s a hope you have for us?",
  "What’s your favorite way to say ‘thank you’ in love?",
  "What’s a challenge we’ve overcome that made us stronger?",
  "What’s a way we can keep growing closer every day?",
  "What’s one thing you’d never change about us?",
  "How do you feel when I hold your hand?",
  "What’s your favorite love memory from your childhood?",
  "What’s something you want to create together?",
  "What’s your favorite way to make me laugh?",
  "What’s one way you want to show more love to yourself?",
  "How do you want our love to be remembered?",
  "What’s something that always makes you think of me?",
  "What’s a question you’ve always wanted to ask me about love?",
  "What’s your favorite way to say ‘I’m here for you’?",
  "What’s something that makes you feel safe with me?",
  "How do you want us to celebrate our milestones?",
  "What’s one dream you want us to chase together?",
  "What’s a word you think describes our connection best?",
  "What’s something you want to thank me for?",
  "How do you feel when we share a quiet moment?",
  "What’s your favorite way to remember our early days?",
  "What’s one thing you hope never changes between us?",
  "How do you want to support each other’s dreams?"
];

const questionBox = document.getElementById("daily-question");
const form = document.getElementById("answer-form");

const startDate = new Date("2025-07-12");
const today = new Date();
const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
const currentQuestion = questions[diffDays % questions.length];

questionBox.textContent = currentQuestion;

questionBox.addEventListener("click", () => {
  form.classList.remove("hidden");
});

function submitAnswer(role) {
  const input = document.getElementById(`answer-${role}`);
  const answer = input.value.trim();
  if (!answer) return;

  fetch("/api/answers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: currentQuestion,
      role,
      answer,
      timestamp: new Date().toISOString()
    })
  })
    .then(res => res.json())
    .then(() => {
      input.value = "";
      alert("Answer submitted.");
    })
    .catch(() => alert("Error submitting answer."));
}