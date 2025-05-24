
function login(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("بيانات غير صحيحة");
    }
}
