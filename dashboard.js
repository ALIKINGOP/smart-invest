document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('userDisplay').textContent = currentUser.username;
    document.getElementById('userBalance').textContent = currentUser.balance;
    document.getElementById('userStatus').textContent = currentUser.subscribed ? 'مشترك' : 'غير مشترك';

    // إضافة رصيد
    document.getElementById('addBalanceBtn').addEventListener('click', () => {
        let amount = prompt('أدخل مبلغ الرصيد الذي تريد إضافته:');
        amount = Number(amount);
        if (!amount || amount <= 0) return alert('مبلغ غير صحيح');

        let users = JSON.parse(localStorage.getItem('users'));
        let user = users.find(u => u.username === currentUser.username);
        if (!user) return alert('حدث خطأ');

        user.balance += amount;
        currentUser = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));

        document.getElementById('userBalance').textContent = user.balance;
        alert('تم إضافة الرصيد بنجاح');

        // هنا ممكن تضيف إرسال إشعار تليجرام (لكن يحتاج سيرفر خارجي)
    });

    // تفعيل/تعطيل الاشتراك
    document.getElementById('toggleSubBtn').addEventListener('click', () => {
        let users = JSON.parse(localStorage.getItem('users'));
        let user = users.find(u => u.username === currentUser.username);
        if (!user) return alert('حدث خطأ');

        user.subscribed = !user.subscribed;
        currentUser = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));

        document.getElementById('userStatus').textContent = user.subscribed ? 'مشترك' : 'غير مشترك';
        alert('تم تغيير حالة الاشتراك');
    });

    // تسجيل خروج
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});