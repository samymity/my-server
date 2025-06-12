// DOM Elements
const loginSection = document.getElementById('loginSection');
const storySection = document.getElementById('storySection');
const loginForm = document.getElementById('loginForm');
const storyForm = document.getElementById('storyForm');
const logoutBtn = document.getElementById('logoutBtn');
const storiesList = document.getElementById('storiesList');

// Check if user is already logged in
function checkAuthStatus() {
    const username = localStorage.getItem('username');
    if (username) {
        loginSection.classList.add('hidden');
        storySection.classList.remove('hidden');
        loadStories();
    } else {
        loginSection.classList.remove('hidden');
        storySection.classList.add('hidden');
    }
}

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('username', data.username);
            checkAuthStatus();
            loginForm.reset();
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    checkAuthStatus();
});

// Load Stories
async function loadStories() {
    try {
        const response = await fetch('/api/stories');
        const stories = await response.json();
        
        storiesList.innerHTML = stories.map(story => `
            <div class="story">
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <small>By: ${story.author}</small>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading stories:', error);
        storiesList.innerHTML = '<p>Error loading stories. Please try again later.</p>';
    }
}

// Handle New Story Submission
storyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('storyTitle').value;
    const content = document.getElementById('storyContent').value;
    const author = localStorage.getItem('username');

    try {
        const response = await fetch('/api/stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        });

        const newStory = await response.json();
        storyForm.reset();
        loadStories(); // Reload all stories
    } catch (error) {
        console.error('Error adding story:', error);
        alert('Failed to add story. Please try again.');
    }
});

// Initialize the app
checkAuthStatus(); 