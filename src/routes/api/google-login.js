async function handleCredentialResponse(response) {
    const token = response.credential;
    try {
        const res = await fetch('https://<ngrok-url>/api/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (res.ok) {
            // Save token, mark as authenticated, etc.
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error during Google login:', error);
    }
}