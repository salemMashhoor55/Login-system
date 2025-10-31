if (document.getElementById("registerBtn")) {
  document.getElementById("registerBtn").addEventListener("click", () => {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let msg = document.getElementById("msg");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password) {
      msg.textContent = "All fields are required!";
      return;
    }
    if (!emailPattern.test(email)) {
      msg.textContent = "Invalid email format!";
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
      msg.textContent = "Email already registered!";
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    msg.style.color = "lightgreen";
    msg.textContent = "Registration successful! Redirecting...";
    setTimeout(() => (window.location = "index.html"), 1500);
  });
}

if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", () => {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let msg = document.getElementById("msg");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      window.location = "home.html";
    } else {
      msg.textContent = "Invalid email or password!";
    }
  });
}

if (document.getElementById("welcomeMsg")) {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser) {
    window.location = "index.html";
  } else {
    document.getElementById("welcomeMsg").textContent = `Welcome, ${loggedUser.name}!`;
  }
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location = "index.html";
  });
}