
fetch('users.json')
  .then(response => response.json())
  .then(data => {
      document.getElementById('userData').textContent = JSON.stringify(data, null, 2);
  });
