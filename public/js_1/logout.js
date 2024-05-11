const logout = async () => {
    console.log('logout recieved')
    const response = await fetch('api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to Log Out');
    }

}



document.querySelector('#logout-btn').addEventListener('click', logout);