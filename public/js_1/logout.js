const logout = async (event) => {
    event.preventDefault();

    console.log('Log out button clicked');
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
        console.log('Log out successful');
    } else {
        alert('Failed to Log Out');
    }
}

document.querySelector('#logout-btn').addEventListener('click', logout);