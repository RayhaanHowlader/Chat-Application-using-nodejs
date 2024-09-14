const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput=document.getElementById("messageInp");
const messageContainer=document.querySelector('.container');
var audio = new Audio('ding.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position=='left'){
    audio.play();
   }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";

})
let name=prompt("enter your name to join : ");
socket.emit('new',name);
socket.on('user-joined',name=>{
append(`${name} joined the chat`);
});
socket.on('user-joined',data=>{
    append(`${data.message}:${data.name}`,'left');
    });
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
}
)
socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})