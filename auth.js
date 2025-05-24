// ملفات المستخدمين في localStorage كـ json string

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// تسجيل حساب جديد
document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    if (!username || !password) return alert('الرجاء تعبئة جميع الحقول');

    let users = getUsers();
    if (users.find(u => u.username === username)) {
        return alert('اسم المستخدم موجود مسبقاً');
    }

    users.push({username, password, balance: 0, subscribed: false});
    saveUsers(users);
    alert('تم إنشاء الحساب بنجاح');
    window.location.href = 'login.html';
});

// تسجيل دخول
document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let users = getUsers();
    let user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return alert('خطأ في اسم المستخدم أو كلمة المرور');
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
});