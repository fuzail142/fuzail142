import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { auth, database } from './firebaseConfig.js';

document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        document.getElementById('addUserMessage').textContent = 'User not authenticated.';
        return;
    }

    // Check the user's type in the database
    const userRef = ref(database, 'students/' + user.uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.userType !== 'admin') {
            document.getElementById('addUserMessage').textContent = 'You do not have permission to add users.';
            return;
        }
    } else {
        document.getElementById('addUserMessage').textContent = 'User data not found.';
        return;
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cnic = document.getElementById('cnic').value;
    const userType = document.getElementById('userType').value;

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUserId = userCredential.user.uid;

        // Store user details in Realtime Database
        await set(ref(database, 'students/' + newUserId), {
            firstName,
            lastName,
            email,
            cnic,
            userType
        });

        document.getElementById('addUserMessage').textContent = 'User added successfully!';
    } catch (error) {
        document.getElementById('addUserMessage').textContent = 'Error adding user: ' + error.message;
    }
});


// Upload Marks function (make sure this is included as well)
document.getElementById('uploadMarksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const course = document.getElementById('course').value;
    const studentId = document.getElementById('studentId').value; // CNIC as student ID
    const marks = document.getElementById('marks').value;
    const totalMarks = document.getElementById('totalMarks').value;
    const grade = document.getElementById('grade').value;

    try {
        const user = auth.currentUser;
        if (user) {
            // Store marks in Realtime Database
            await set(ref(database, 'marks/' + studentId), {
                course,
                marks,
                totalMarks,
                grade
            });

            document.getElementById('uploadMarksMessage').textContent = 'Marks uploaded successfully!';
        } else {
            throw new Error('User not authenticated.');
        }
    } catch (error) {
        document.getElementById('uploadMarksMessage').textContent = 'Error uploading marks: ' + error.message;
    }
});
import { auth } from './firebaseConfig.js';

// Check if user is authenticated
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Redirect to login page or show an error message
        window.location.href = 'login.html'; // Redirect to login page
    }
});