document.addEventListener("DOMContentLoaded", () => {
    // Check if there is a logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (window.location.pathname.includes('farmers.html')) {
        displayFarmers(loggedInUser);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const contact = document.getElementById('contact').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const newFarmer = { name, address, contact, email, password };
            let farmers = JSON.parse(localStorage.getItem('farmers')) || [];
            farmers.push(newFarmer);
            localStorage.setItem('farmers', JSON.stringify(farmers));
            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const farmers = JSON.parse(localStorage.getItem('farmers')) || [];
            const farmer = farmers.find(farmer => farmer.email === email && farmer.password === password);

            if (farmer) {
                localStorage.setItem('loggedInUser', JSON.stringify(farmer));
                alert('Login successful!');
                window.location.href = 'farmers.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }
});

function displayFarmers(loggedInUser) {
    const farmersList = document.getElementById('farmers-list');
    const farmers = JSON.parse(localStorage.getItem('farmers')) || [];
    farmersList.innerHTML = farmers.map(farmer => `
        <div class="farmer-profile ${loggedInUser && farmer.email === loggedInUser.email ? 'logged-in-profile' : ''}">
            <h3>${farmer.name}</h3>
            <p><strong>Address:</strong> ${farmer.address}</p>
            <p><strong>Contact:</strong> ${farmer.contact}</p>
            <p><strong>Email:</strong> ${farmer.email}</p>
        </div>
    `).join('');
}
