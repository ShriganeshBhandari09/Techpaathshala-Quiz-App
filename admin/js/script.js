///////////////////////////////////////////////Admin Side Script//////////////////////////////////////////////////

//Load Profile Name

function logout() {
  let text = "Are you sure you want to Logout?";
  if (confirm(text) == true) {
    sessionStorage.removeItem("userLoggedIn");
    sessionStorage.removeItem("adminLoggedIn");
    window.location.assign("../index.html");
  }
}

function generateAdminProfileName() {
  let adminLoggedIn = JSON.parse(sessionStorage.getItem("adminLoggedIn"));
  let profileName = document.getElementById("profile-name");
  let image = document.getElementById("profile-img");
  profileName.innerText = `Welcome, ${adminLoggedIn[0].name}`;
  // console.log(userLoggedIn[0].fullName);
  image.src = `https://ui-avatars.com/api/?name=${adminLoggedIn[0].name}&background=F3BD00&color=000`;
}

function showSidebar() {
  let headerLogo = document.getElementById("logo");
  let sidebar = document.getElementById("side-bar");
  sidebar.classList.toggle("disable-sidebar");
  headerLogo.classList.toggle("disable-logo");
}

function readAllQuestions() {
  generateAdminProfileName();
  let questions = JSON.parse(localStorage.getItem("questions"));

  let tableData = document.getElementById("question-table-data");
  for (let i = 0; i < questions.length; i++) {
    var newRow = document.createElement("tr");
    newRow.id = `question-${i + 1}`;
    newRow.innerHTML += `<td class="table-content">${i + 1}</td>
      <td>${questions[i].question}</td>
      <td class="table-button"><div class="table-button-div"><button onclick="viewQuestion(${i})"><i class="fa-solid fa-eye"></i></button><button onclick="updateQuestionForm(${i})" id="update-button-${
      i + 1
    }"><i class="fa-solid fa-pencil"></i></button><button onclick="deleteQuestion(${i})" id="delete-button-${
      i + 1
    }"><i class="fa-solid fa-trash"></i></button></div></td>`;
    tableData.appendChild(newRow);
  }

  console.log("running this function");
}
// console.log(tableData)

function showAddQuestionModal() {
  document.querySelector(".overlay").classList.add("showoverlay");
  document
    .querySelector(".quiz-question-form")
    .classList.add("showquestionform");
}

function closeAddQuestionModal() {
  document.querySelector(".overlay").classList.remove("showoverlay");
  document
    .querySelector(".quiz-question-form")
    .classList.remove("showquestionform");
  document
    .querySelector(".update-quiz-question-form")
    .classList.remove("show-update-question-form");
  document
    .querySelector(".view-question")
    .classList.remove("show-view-question");
}

function addQuestions() {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = document.getElementById("question");
  // let supportingText = document.getElementById("supporting-text");
  let optionOne = document.getElementById("option-one");
  let optionTwo = document.getElementById("option-two");
  let optionThree = document.getElementById("option-three");
  let optionFour = document.getElementById("option-four");
  let correctAnswerValue = document.getElementById("correct-answer").value;

  if (
    !question ||
    !optionOne ||
    !optionTwo ||
    !optionThree ||
    !optionFour ||
    correctAnswer === ""
  ) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Use the selected value to set the correct answer
  let correctAnswer;
  if (correctAnswerValue === "option-one") {
    correctAnswer = optionOne.value;
  } else if (correctAnswerValue === "option-two") {
    correctAnswer = optionTwo.value;
  } else if (correctAnswerValue === "option-three") {
    correctAnswer = optionThree.value;
  } else if (correctAnswerValue === "option-four") {
    correctAnswer = optionFour.value;
  } else {
    alert("Please select a valid correct answer.");
    return; // Exit the function if no valid answer is selected
  }
  console.log(correctAnswer);
  questions.push({
    question: question.value,
    // supportingText: supportingText.value,
    options: [
      optionOne.value,
      optionTwo.value,
      optionThree.value,
      optionFour.value,
    ],
    answer: correctAnswer,
    // explanation: explanationText.value,
  });
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Added Question Successfull");
  question.value = "";
  // supportingText.value = "";
  optionOne.value = "";
  optionTwo.value = "";
  optionThree.value = "";
  optionFour.value = "";
  // explanationText.value = "";
  closeAddQuestionModal();
  location.reload();
  readAllQuestions();
}

// function updateQuestionForm() {
//   let quizForm = document.getElementById("quiz-form");
//   quizForm.style.display = "initial";
//   let questions = JSON.parse(localStorage.getItem("questions")) || [];
//   // var email = registerEmail.value;
//   let question = document.getElementById("question");
//   let supportingText = document.getElementById("supporting-text");
//   let optionOne = document.getElementById("option-one");
//   let optionTwo = document.getElementById("option-two");
//   let optionThree = document.getElementById("option-three");
//   let optionFour = document.getElementById("option-four");
//   let explanationText = document.getElementById("explanation-text");

//   for (let i = 0; i < questions.length; i++) {
//     // const element = questions[i];
//     // console.log(element);
//     // console.log(questions[i].id)
//     let questionId = questions[i].id - 1;
//     if (i === questionId) {
//       question.value = `${questions[i].question}`;
//       supportingText.value = `${questions[i].supportingText}`;
//       optionOne.value = `${questions[i].options[0]}`;
//       optionTwo.value = questions[i].options[1];
//       optionThree.value = questions[i].options[2];
//       optionFour.value = questions[i].options[3];
//       explanationText.value = questions[i].explanation;
//       return
//     } else {
//       console.log("Elsei ");
//     }

//     // if(i === 0){
//     //   console.log(true)
//     // }else{
//     //   console.log(false)
//     // }
//   }
// }

// function displayUpdateQuestionForm() {
//   let addQuestionBtn = document.getElementById("add-question-btn")
//   addQuestionBtn.setAttribute('onclick', 'addQuestions()');
//   console.log(addQuestionBtn)

// }

function showUpdateQuestionFormModal() {
  document.querySelector(".overlay").classList.add("showoverlay");
  document
    .querySelector(".update-quiz-question-form")
    .classList.add("show-update-question-form");
}

function closeUpdateQuestionFormModal() {
  document.querySelector(".overlay").classList.remove("showoverlay");
  document
    .querySelector(".update-quiz-question-form")
    .classList.remove("show-update-question-form");
}

function updateQuestionForm(i) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = document.getElementById("updated-question");
  let optionOne = document.getElementById("updated-option-one");
  let optionTwo = document.getElementById("updated-option-two");
  let optionThree = document.getElementById("updated-option-three");
  let optionFour = document.getElementById("updated-option-four");
  let correctAnswer = document.getElementById("updated-correct-answer");
  let updateQuestionBtn = document.getElementById("update-question-button");
  let optionListOne = document.getElementById("option-list-one");
  let optionListTwo = document.getElementById("option-list-two");
  let optionListThree = document.getElementById("option-list-three");
  let optionListFour = document.getElementById("option-list-four");

  updateQuestionBtn.setAttribute("onclick", `updateQuestion(${i})`);
  console.log(updateQuestionBtn);

  showUpdateQuestionFormModal();

  question.value = `${questions[i].question}`;
  optionOne.value = `${questions[i].options[0]}`;
  optionTwo.value = questions[i].options[1];
  optionThree.value = questions[i].options[2];
  optionFour.value = questions[i].options[3];
  // correctAnswer.value = questions[i].answer;
  optionListOne.value = questions[i].options[0];
  optionListOne.innerText = questions[i].options[0];
  optionListTwo.value = questions[i].options[1];
  optionListTwo.innerText = questions[i].options[1];
  optionListThree.value = questions[i].options[2];
  optionListThree.innerText = questions[i].options[2];
  optionListFour.value = questions[i].options[3];
  optionListFour.innerText = questions[i].options[3];
}

function updateQuestion(i) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = document.getElementById("updated-question");
  let optionOne = document.getElementById("updated-option-one");
  let optionTwo = document.getElementById("updated-option-two");
  let optionThree = document.getElementById("updated-option-three");
  let optionFour = document.getElementById("updated-option-four");
  let correctAnswer = document.getElementById("updated-correct-answer");
  questions.splice(i, 1, {
    question: question.value,
    options: [
      optionOne.value,
      optionTwo.value,
      optionThree.value,
      optionFour.value,
    ],
    answer: correctAnswer.value,
  });
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Updated Question Successfull");
  question.value = "";
  optionOne.value = "";
  optionTwo.value = "";
  optionThree.value = "";
  optionFour.value = "";
  correctAnswer.value = "";
  closeAddQuestionModal();
  location.reload();
  readAllQuestions();
}

function viewQuestionModal() {
  document.querySelector(".overlay").classList.add("showoverlay");
  document.querySelector(".view-question").classList.add("show-view-question");
}

function closeViewQuestionModal() {
  document.querySelector(".overlay").classList.remove("showoverlay");
  document
    .querySelector(".view-question")
    .classList.remove("show-view-question");
}

function viewQuestion(i) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = document.getElementById("view-question");
  let optionOne = document.getElementById("view-option-one");
  let optionTwo = document.getElementById("view-option-two");
  let optionThree = document.getElementById("view-option-three");
  let optionFour = document.getElementById("view-option-four");
  let correctAnswer = document.getElementById("view-correct-answer");
  let updateQuestionBtn = document.getElementById("update-question-button");

  viewQuestionModal();
  // console.log(question,optionOne,optionTwo, optionThree, optionFour, correctAnswer , updateQuestionBtn)
  question.innerText = questions[i].question;
  optionOne.innerHTML = questions[i].options[0];
  optionTwo.innerHTML = questions[i].options[1];
  optionThree.innerHTML = questions[i].options[2];
  optionFour.innerHTML = questions[i].options[3];
  correctAnswer.innerHTML = `Answer is:- ${questions[i].answer}`;
}

function deleteQuestion(i) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  console.log(i);
  let text = "Are you sure you want to delete the Question?";
  if (confirm(text) == true) {
    questions.splice(i, 1);
    localStorage.setItem("questions", JSON.stringify(questions));
    alert("Deleted Question Successfull");
    location.reload();
  }
}

// function deleteUser(i) {
//   let userGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
//   console.log(i);
//   let text = "Are you sure you want to delete the User?";
//   if (confirm(text) == true) {
//     userGivenTests.splice(i, 1);
//     localStorage.setItem("usersGivenTests", JSON.stringify(userGivenTests));
//     alert("User Deleted Successfull");
//     location.reload();
//   }
// }

function readAllUsers() {
  generateAdminProfileName();
  let userGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
  let tableData = document.getElementById("user-table-data");

  for (let i = 0; i < userGivenTests.length; i++) {
    var newRow = document.createElement("tr");
    newRow.innerHTML += `<td>${i + 1}</td>
      <td>${userGivenTests[i].fullName}</td>
      <td class="options">${userGivenTests[i].email}</td>
      <td>${userGivenTests[i].noOfTimeTestGiven}</td>
      <td>${userGivenTests[i].marks}</td>
      <td class="table-button"><div class="table-button-div"><a href="users-history.html?index=${i}&name=${encodeURIComponent(
      userGivenTests[i].fullName
    )}">
            View Tests
          </a></div></td>`;
    tableData.appendChild(newRow);
  }
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    index: params.get("index"),
    name: params.get("name"),
    testIndex: params.get("testIndex"),
  };
}

function loadUserTestDetails() {
  generateAdminProfileName();
  let { index, name } = getQueryParams();

  let usersGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
  console.log(index, name);
  generateAdminProfileName();
  let userGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
  document.getElementById(
    "user-name"
  ).innerText = `${name} | ${usersGivenTests[index].email}`;

  let tableData = document.getElementById("user-test-table-data");
  let userTests = userGivenTests[index].tests;
  console.log(userTests);
  for (let i = 0; i < userTests.length; i++) {
    var newRow = document.createElement("tr");
    newRow.innerHTML += `<td>${userTests[i].testNo}</td>
      <td>${userTests[i].date}</td>
      <td class="options">${userTests[i].marks}</td>
      <td>${userTests[i].correctAnswers}</td>
      <td class="table-button"><div class="table-button-div"><a href="user-testlist.html?testIndex=${i}&name=${userGivenTests[index].fullName}">
            View Test
          </a></div></td>`;
    tableData.appendChild(newRow);
  }
}

// const { testIndex } = getQueryParams();
// console.log(testIndex)
function viewUserTest() {
  generateAdminProfileName();
  let { name, testIndex } = getQueryParams();

  let usersGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));

  const userIndex = usersGivenTests.findIndex((user) => user.fullName === name);
  document.getElementById(
    "user-name"
  ).innerText = `${usersGivenTests[userIndex].fullName} | ${usersGivenTests[userIndex].email}`;
  let userTestAnswers =
    usersGivenTests[userIndex].tests[testIndex].selectedAnswers;

  document.getElementById(
    "test-number"
  ).innerText = `Test No. ${usersGivenTests[userIndex].tests[testIndex].testNo}`;
  document.getElementById(
    "test-score"
  ).innerText = `Score: ${usersGivenTests[userIndex].tests[testIndex].marks}`;
  document.getElementById(
    "test-date"
  ).innerText = `Test Date: ${usersGivenTests[userIndex].tests[testIndex].date}`;

  for (let i = 0; i < userTestAnswers.length; i++) {
    const userAnswer = userTestAnswers[i];
    var newDiv = document.createElement("div");
    newDiv.classList.add("user-test-question");
    newDiv.innerHTML += `
      <p><strong>Question:</strong> ${userAnswer.question}</p>
      <div class="options-container">
      <div class="option"><p>1. ${userAnswer.options[0]}<span><i class="fa-solid icon"></i></span></p></div>
      <div class="option"><p>2. ${userAnswer.options[1]}<span><i class="fa-solid icon"></i></span></p></div>
      <div class="option"><p>3. ${userAnswer.options[2]}<span><i class="fa-solid icon"></i></span></p></div>
      <div class="option"><p>4. ${userAnswer.options[3]}<span><i class="fa-solid icon"></i></span></p></div>
      </div>`;

    document.getElementById("user-test-data").appendChild(newDiv);

    const userAnswerIndex = userAnswer.options.findIndex(
      (option) => option === userAnswer.selectedAnswer
    );
    const correctAnswerIndex = userAnswer.options.findIndex(
      (option) => option === userAnswer.correctAnswer
    );

    const correctOptionDiv =
      newDiv.querySelectorAll(".option")[correctAnswerIndex];
    correctOptionDiv.classList.add("question-container-right-answers");
    if (!correctOptionDiv.querySelector(".fa-circle-check")) {
      correctOptionDiv.querySelector(".icon").classList.add("fa-circle-check");
      correctOptionDiv.querySelector(".icon").style.color = "#CB6040";
    }

    const selectedOptionDiv =
      newDiv.querySelectorAll(".option")[userAnswerIndex];
    if (userAnswer.selectedAnswer === userAnswer.correctAnswer) {
      selectedOptionDiv.classList.add("question-container-right-answers");
      if (!selectedOptionDiv.querySelector(".fa-circle-check")) {
        selectedOptionDiv
          .querySelector(".icon")
          .classList.add("fa-circle-check");
        selectedOptionDiv.querySelector(".icon").style.color = "#CB6040";
      }
    } else {
      selectedOptionDiv.classList.add("question-container-wrong-answers");
      if (!selectedOptionDiv.querySelector(".fa-circle-xmark")) {
        selectedOptionDiv
          .querySelector(".icon")
          .classList.add("fa-circle-xmark");
        selectedOptionDiv.querySelector(".icon").style.color = "#31511E";
      }
    }
  }
}

// function viewUserTest(i) {
//   let userGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
//   let questions = JSON.parse(localStorage.getItem("questions"));
//   document.querySelector(".users-section").style.display = "none";
//   document.querySelector(".user-test-section").style.display = "initial";

//   // console.log(i);
//   let selectedAnswers = userGivenTests[i].selectedAnswers;
//   console.log(selectedAnswers);
//   console.log(selectedAnswers[0].question);
//   for (let i = 0; i < selectedAnswers.length; i++) {
//     const element = selectedAnswers[i];
//     console.log(element);
//     var usersAnswerContainer = document.querySelector(".user-test-section");
//     var questionAnswerContainer = document.createElement("div");
//     questionAnswerContainer.className = "question-answer-container";
//     questionAnswerContainer.innerHTML += `<h2 class="container__question" id="question">${
//       i + 1
//     }. ${selectedAnswers[i].question}</h2>
//           <p class="container__selected-option">Selected Answer is:- ${
//             selectedAnswers[i].selectedAnswer
//           }</p>
//                 <p class="container__correct-answer">Correct Answer is :- ${
//                   selectedAnswers[i].correctAnswer
//                 }</p>
//                 <p class="container__correct-answer-explanation">${
//                   questions[randomQuestionArray[i]].explanation
//                 }
//                 `;

//     usersAnswerContainer.appendChild(questionAnswerContainer);
//   }
// }

// let userGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
// console.log(userGivenTests);

// function viewUserTest(i) {
//   let userGivenTests = JSON.parse(localStorage.getItem("usersGivenTests"));
//   // console.log(userGivenTests);
//   let userName = userGivenTests[i].fullName;
//   let userEmail = userGivenTests[i].email;
//   let userTest = userGivenTests[i].tests;
//   console.log(userName, userTest, userEmail);
// }