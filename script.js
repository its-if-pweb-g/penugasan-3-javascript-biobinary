document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    const sections = document.querySelectorAll('#about, #education, #achievement');
    sections.forEach(section => observer.observe(section));
});


document.getElementById('cancel-btn').addEventListener('click', function() {

    document.getElementById('contact-form').reset();
    document.querySelectorAll('.error-message').forEach(function(element) {
        element.style.display = 'none';
    });

    document.getElementById('send-status').style.display = 'none';

});


document.getElementById('send-btn').addEventListener('click', function(event) {
        
    event.preventDefault();
        
    document.querySelectorAll('.error-message').forEach(function(element) {
        element.style.display = 'none'; 
    });
    document.getElementById('send-status').style.display = 'none';

    let isValid = true;

    const name = document.getElementById('input-name').value;
    if (name === "") {
        document.getElementById('name-error').textContent = 'Nama wajib diisi.';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }

    const email = document.getElementById('input-email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        document.getElementById('email-error').textContent = 'Email wajib diisi.';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;

    } else if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'Format email tidak valid.';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    const message = document.getElementById('input-message').value;
    if (message === "") {
        document.getElementById('message-error').textContent = 'Pesan wajib diisi.';
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
    }

    if (isValid) {

        document.getElementById('loading-icon').style.display = 'inline-block';
        document.getElementById('send-text').style.display = 'none';

        fetch('https://debug.nafkhanzam.com/web-programming-e03', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(() => {
            document.getElementById('send-status').textContent = 'Berhasi Terkirim';
            document.getElementById('send-status').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('send-status').textContent = 'Gagal Terkirim';
            document.getElementById('send-status').style.display = 'block';
        })
        .finally(() => {
            document.getElementById('loading-icon').style.display = 'none';
            document.getElementById('send-text').style.display = 'inline';
            document.getElementById('contact-form').reset();
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const displayText = document.getElementById("display-text");

    const storedText = localStorage.getItem("savedText");
    if (storedText) {
        inputField.value = storedText;
        displayText.textContent = storedText;
    }

    inputField.addEventListener("input", function () {
        const userInput = inputField.value;
        displayText.textContent = userInput;
        localStorage.setItem("savedText", userInput);
    });
});

