// form element
const quizForm = document.getElementById('quiz');

// event listener for the form submission
quizForm.addEventListener('submit', (event) => {
  // prevent the default form submission behavior
  event.preventDefault();

  // variables
  const heartRate = parseInt(document.getElementById('hr').value);
  const option1 = document.querySelector('input[name="question1"]:checked');
  const answer1 = option1.value;
  const option2 = document.querySelector('input[name="question2"]:checked');
  const answer2 = option2.value;
  const option3 = document.querySelector('input[name="question3"]:checked');
  const answer3 = option3.value;
  const option4 = document.querySelector('input[name="question4"]:checked');
  const answer4 = option4.value;
  const option5 = document.querySelector('input[name="question5"]:checked');
  const answer5 = option5.value;

  // scores for each character
  let joyScore = 0;
  let fearScore = 0;
  let anxietyScore = 0;
  let sadnessScore = 0;

  // assign points based on answer 1
  if (answer1 == 1 || answer1 == 2) {
    joyScore += 2;
  } else if (answer1 == 3 || answer1 == 4) {
    sadnessScore += 2;
  } else if (answer1 == 5) {
    anxietyScore += 3;
  }

  // assign points based on answer 2
  if (answer2 == 4 || answer2 == 5) {
    joyScore += 2;
  } else if (answer2 == 1 || answer2 == 2) {
    sadnessScore += 2;
  } else if (answer2 == 3) {
    fearScore += 1;
    anxietyScore += 1; // additional point for anxiety
  }

  // assign points based on answer 3
  if (answer3 == 4 || answer3 == 5) {
    joyScore += 2;
  } else if (answer3 == 1 || answer3 == 2) {
    fearScore += 2;
    anxietyScore += 1; // additional point for anxiety
  } else if (answer3 == 3) {
    sadnessScore += 1;
    anxietyScore += 1; // additional point for anxiety
  }

  // assign points based on answer 4
  if (answer4 == 4 || answer4 == 5) {
    joyScore += 2;
  } else if (answer4 == 1 || answer4 == 2) {
    sadnessScore += 2;
  } else if (answer4 == 3) {
    fearScore += 2;
    anxietyScore += 1; // additional point for anxiety
  }

  // assign points based on answer 5
  if (answer5 == 4 || answer5 == 5) {
    joyScore += 2;
  } else if (answer5 == 1 || answer5 == 2) {
    sadnessScore += 2;
  } else if (answer5 == 3) {
    fearScore += 1;
    anxietyScore += 2; // increased points for anxiety
  }

  // assign points based on heart rate
  if (heartRate >= 80 && heartRate <= 100) {
    joyScore += 3;
  } else if (heartRate >= 48 && heartRate < 80) {
    sadnessScore += 3;
  } else if (heartRate >= 100 && heartRate <= 120) {
    fearScore += 3;
    anxietyScore += 2;
  } else if (heartRate > 120) {
    anxietyScore += 4;
  } else {
    // heart rate outside defined ranges
    alert('Please enter a valid heart rate between 48 and 150 bpm.');
    return;
  }

  // normalize anxiety score
  anxietyScore *= 1.5;

  // determine which character has the highest score
  let maxScore = Math.max(joyScore, fearScore, anxietyScore, sadnessScore);
  let redirectPage = '';

  if (maxScore === joyScore) {
    redirectPage = '/joy.html';
  }
  else if (maxScore === sadnessScore) {
    redirectPage = '/sadness.html';
  }
  else if (maxScore === anxietyScore) {
    redirectPage = '/anxiety.html';
  }
  else if (maxScore === fearScore) {
    redirectPage = '/fear.html';
  }

  // redirect to the character page
  window.location.href = redirectPage;
}
);
