const socket = io("/create-user");
let messageArea = document.querySelector('.message__area');

let username = "";

    socket.on("username", (user) => {
        username = user
    }) 

document.getElementById("myMessage").addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("1");
    
    let text = document.getElementById("textarea").value;

    let msg = {
        user: username,
        message: text
    }
    appendMessage(msg, 'outgoing');

    socket.emit('message', msg);
});

function appendMessage(msg, type) {
    //console.log(2);
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message', (msg) => {
    //console.log(3);
    appendMessage(msg, 'incoming')
})
