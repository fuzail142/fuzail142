import { auth, db } from './firebaseConfig.js';
import { doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cnicEdit = document.getElementById('cnicEdit').value;

    try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { cnic: cnicEdit });

        document.getElementById('editProfileMessage').textContent = 'Profile updated successfully!';
    } catch (error) {
        document.getElementById('editProfileMessage').textContent = 'Error updating profile: ' + error.message;
    }
});

// Check Result section
document.getElementById('checkResultForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const checkCNIC = document.getElementById('checkCNIC').value;

    try {
        const marksRef = ref(database, 'marks/' + checkCNIC);
        const snapshot = await get(marksRef);

        if (snapshot.exists()) {
            const resultData = snapshot.val();
            document.getElementById('resultMessage').textContent = `Course: ${resultData.course}, Marks: ${resultData.marks}, Total Marks: ${resultData.totalMarks}, Grade: ${resultData.grade}`;
        } else {
            document.getElementById('resultMessage').textContent = 'No results found.';
        }
    } catch (error) {
        document.getElementById('resultMessage').textContent = 'Error retrieving result: ' + error.message;
    }
});
