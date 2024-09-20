import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { auth, database } from './firebaseConfig.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Redirect based on user type
        const userRef = ref(database, 'students/' + user.uid);
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                if (userData.userType === 'admin') {
                    window.location.href = 'admin.html';  // Redirect to admin portal
                } else {
                    window.location.href = 'student.html';  // Redirect to student portal
                }
            } else {
                console.error('No user data found');
                document.getElementById('loginMessage').textContent = 'User data not found.';
            }
        });
    } catch (error) {
        console.error("Error details:", error);
        document.getElementById('loginMessage').textContent = 'Error: ' + error.message;
    }
});
