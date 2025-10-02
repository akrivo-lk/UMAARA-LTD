// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// 🔹 Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDAJXhFdOVX0dSlT91vH_jhpEat10E9mQI",
    authDomain: "umaara-76454.firebaseapp.com",
    projectId: "umaara-76454",
    storageBucket: "umaara-76454.firebasestorage.app",
    messagingSenderId: "1096530114909",
    appId: "1:1096530114909:web:70655b0dfec005b6c190b4",
    measurementId: "G-H74ELSM6X6"
};

// 🔹 Init Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// 🔹 DOM elements
const form = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");
const commentCount = document.getElementById("commentCount");

// 🔹 Listen to comments in real time
const q = query(collection(db, "comments"), orderBy("date", "asc"));
onSnapshot(q, (snapshot) => {
    commentList.innerHTML = ""; // reset UI
    let total = 0;
    snapshot.forEach((doc) => {
        addCommentToList(doc.data());
        total++;
    });
    // ✅ Update live count
    commentCount.textContent = total;
});

// 🔹 Handle new comment form
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Name, Email, and Message are required!");
        return;
    }

    try {
        await addDoc(collection(db, "comments"), {
            name,
            email,
            message,
            date: new Date().toISOString()
        });
        form.reset();
    } catch (error) {
        console.error("Error adding comment:", error);
    }
});

// 🔹 Render a comment item
function addCommentToList(comment) {
    const li = document.createElement("li");
    li.classList.add("comment");
    li.innerHTML = `
      <div class="vcard bio"><img src="images/user-circle.jpg" alt="User"></div>
      <div class="comment-body">
          <h3>${comment.name}</h3>
          <div class="meta">${new Date(comment.date).toLocaleString()}</div>
          <p>${comment.message}</p>
          <p><a href="#" class="reply">Reply</a></p>
      </div>
    `;
    commentList.appendChild(li);
}