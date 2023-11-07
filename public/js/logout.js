const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

var logOutBtn = $('#logout');
logOutBtn.on('click', logout);

var logInBtn = $('#login');
logInBtn.on('click', function() {
  window.location.replace('/login');
});