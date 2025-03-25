document.addEventListener('DOMContentLoaded', function() {
    // Предварително попълване на формуляр, ако потребителят поръчва часовник от магазина
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const message = urlParams.get('message');

    if (subject) {
        document.getElementById('subject').value = subject;
    }

    if (message) {
        document.getElementById('message').value = message;
    }

    // Изпращане на формуляр
    const form = document.getElementById('inquiryForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name =    document.getElementById('name').value;
        const email =   document.getElementById('email').value;
        const phone =   document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:mail.ikratko@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Име: ${name}\nИмейл: ${email}\nТелефон: ${phone}\n\n${message}`
        )}`;

        window.location.href = mailtoLink; // Отворяне на приложение за изпращане на имейл по подразбиране
    });
});