
const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

let userName = ('');

const login = e => {
  e.preventDefault();
  if (userNameInput.value === ''){
    window.alert("This field can't be empty!")
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('login', userName);
  }
};


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


const sendMessage = e => {
  e.preventDefault();
  if (messageContentInput.value.length < 1){
    window.alert("Message can't be empty!")
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value });
    messageContentInput.value = '';
  }
};

const joinConversation = newUser => {
    const botMessageJoined = document.createElement('li');
  
    botMessageJoined.classList.add('message');
    botMessageJoined.classList.add('message--received');
    
    botMessageJoined.innerHTML = (`<h3 class="message__author">Chat Bot</h3>
      <div class="message__content bot-message" >${newUser} has joined the conversation!</div>`);
    
    messagesList.appendChild(botMessageJoined);
};
const leaveConversation = leavingUser => {
  const botMessageLeft = document.createElement('li');

  botMessageLeft.classList.add('message');
  botMessageLeft.classList.add('message--received');
  
  botMessageLeft.innerHTML = (`<h3 class="message__author">Chat Bot</h3>
    <div class="message__content bot-message" >${leavingUser} has left the conversation... :(</div>`);
  
  messagesList.appendChild(botMessageLeft);
};


socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('botMessageJoined', (newUser) => joinConversation(newUser));
socket.on('botMessageLeft', (leavingUser) => leaveConversation(leavingUser));


loginForm.addEventListener('submit', (e) => login(e));
addMessageForm.addEventListener('submit', (e) => sendMessage(e));

