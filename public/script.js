const socket = io();

console.log(socket)

const notify = document.querySelector('#notification');
const message = document.querySelector('#message');
const button = document.querySelector('button');
const messageBar = document.querySelector('#message-bar');


function printMessage(e) {
    e.preventDefault();
    console.log(message.value);
    socket.emit('message', message.value);
}
button.addEventListener('click', printMessage);


socket.on('response', (data) => {
    console.log(data)
    notify.textContent = data.toString();
    messageBar.style.backgroundColor = '#3F4E4F';
    messageBar.style.height = '20vh';
});