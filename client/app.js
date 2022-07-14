
const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = ('');

const login = () => {
  if (userNameInput.value === ''){
    window.alert("This field can't be empty!")
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login();
});


const addMessage = (author, content) => {
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName){
    message.classList.add('message--self')
  };
  message.innerHTML = (`<h3 class="message__author">${(author === userName ? 'You' : author)}</h3>
    <div class="message__content">${content}</div>`);
  
  messagesList.appendChild(message);
};

const sendMessage = () => {
  if (messageContentInput.value === ''){
    window.alert("Message can't be empty!")
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

addMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
})