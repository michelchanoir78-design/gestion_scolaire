
// ==========================
// 📌 REGISTER (inscription)
// ==========================
function register() {
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!nom || !email || !password || !role) {
        alert("Remplis tous les champs !");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find(u => u.email === email);

    if (exist) {
        alert("Cet email existe déjà !");
        return;
    }

    const newUser = {
        nom,
        email,
        password,
        role
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie !");

    window.location.href = "login.html";
}


// ==========================
// 📌 LOGIN
// ==========================
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Email ou mot de passe incorrect !");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    redirectByRole(user.role);
}


// ==========================
// 📌 REDIRECTION PAR RÔLE
// ==========================
function redirectByRole(role) {
    if (role === "eleve") {
        window.location.href = "eleve.html";
    }
    else if (role === "enseignant") {
        window.location.href = "enseignant.html";
    }
    else if (role === "prefet") {
        window.location.href = "prefet.html";
    }
    else if (role === "proviseur") {
        window.location.href = "proviseur.html";
    }
    else if (role === "expert") {
        window.location.href = "expert.html";
    }
    else {
        window.location.href = "login.html";
    }
}


// ==========================
// 📌 PROTECTION DES PAGES
// ==========================
function checkAuth(expectedRole) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    if (expectedRole && user.role !== expectedRole) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}


// ==========================
// 📌 LOGOUT
// ==========================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}


// ==========================
// 📌 REDIRECTION SIMPLE
// ==========================
function goLogin() {
    window.location.href = "login.html";
}

function goRegister() {
    window.location.href = "register.html";
}