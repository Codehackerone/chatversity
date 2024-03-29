const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const socket = io();

socket.emit("joinRoom", jwtToken);

outputRoomName(room_name);
outputUsers(usernames);

socket.on("roomUsers", (users) => {
  outputUsers(usernames);
  changeStatus(users.users);
});

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on("error",(err)=>{
  iziToast.error({
    title: 'Error!',
    message:err,
  });
  console.log(err);
})

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
		<p class="meta">${msg.username} <span>${msg.time}</span></p>
		<p class="text">
			${msg.text}
		</p>
		`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
		${users.map((user) => `<li>&nbsp;&nbsp;&nbsp;${user}<div id="${user}-status" class="tel-offline"></div></li>`).join("")}`;
}

function changeStatus(users){
  for(let user of users){
    document.getElementById(`${user.username}-status`).className="tel-online";
  }
}