
const socket = io('http://localhost:8000');

const sname=document.getElementById('send_name');
const form = document.getElementById('send_container');
const messageinp = document.getElementById('msginp');
const messagecontainer = document.querySelector(".container");
var audio=new Audio(`../eventually.mp3`)

const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}
const name = prompt("Enter your name to join");
socket.emit('new-user joined', name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();   //used for preventing the page to reload again and again 
    const message=msginp.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    msginp.value='';

})

socket.on('user-joined',name=>{
    append(`${name} joined the chat`, 'right');
})

socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,`left`);
})
socket.on(`leave`,name=>{
    append(`${name} left the chat`,`left`);
})




