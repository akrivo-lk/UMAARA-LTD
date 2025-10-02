document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");
    const commentCount = document.getElementById("commentCount");

    // Load comments from localStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(addCommentToList);
    updateCount();

    // Handle form submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const website = document.getElementById("website").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Name, Email, and Message are required!");
            return;
        }

        const newComment = {
            id: Date.now(),
            name,
            email,
            website,
            message,
            date: new Date().toLocaleString()
        };

        // Save to array + localStorage
        comments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(comments));

        // Add to UI
        addCommentToList(newComment);
        updateCount();

        // Reset form
        form.reset();
    });

    function addCommentToList(comment) {
        const li = document.createElement("li");
        li.classList.add("comment");
        li.innerHTML = `
      <div class="vcard bio"><img src="images/person_1.png" alt="User"></div>
      <div class="comment-body">
          <h3>${comment.name}</h3>
          <div class="meta">${comment.date}</div>
          <p>${comment.message}</p>
          <p><a href="#" class="reply">Reply</a></p>
      </div>
    `;
        commentList.appendChild(li);
    }

    function updateCount() {
        commentCount.textContent = comments.length;
    }
});

