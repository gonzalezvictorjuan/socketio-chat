let username = '';

const setUserName = () => {
  username = prompt('User Name', '');

  if (username && username.trim() !== '') {
    username = username.trim();
    // console.log('username:', username);
  } else {
    setUserName();
  }
};

const getTime = (d) => {
  return new Date(d).toLocaleTimeString();
};

const createLI = (d, e) => {
  e.innerHTML += `<li>
				<strong>${d.username}:</strong>
				${d.message}
				<em>${getTime(d.send)}</em>
			</li>`;
};

const socket = io();

socket.on('connect', () => {
  console.log(`🔌 Connected`);

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat:message', {
        message: input.value,
        username,
      });
      input.value = '';
    }
  });

  socket.on('chat:message', (data) => {
    createLI(data, messages);
  });

  socket.on('chat:history', (data) => {
    data.forEach((d) => {
      createLI(d, messages);
    });
  });
});
