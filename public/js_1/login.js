console.log('script loaded');

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email_address = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email_address && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email_address, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/account');
            } else {
                alert('Failed to Log In');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email_address = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if (username && email_address && password) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, email_address, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log('Sign Up Successful');
                document.location.replace('/account');
            } else {
                alert('Failed to Sign Up');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }
}

document.querySelector('#login-form').addEventListener('click', loginFormHandler);
document.querySelector('#signup-form').addEventListener('click', signupFormHandler);
