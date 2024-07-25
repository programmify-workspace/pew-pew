const emailInput = document.getElementById("emailInput");
const emailArray = [];

document.getElementById('emailInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();  // Prevent form submission
        addEmail();
    }
});

function addEmail() {
    const emailLabel = document.getElementById("emailLabel");
    const emailInput = document.getElementById("emailInput");
    const emailError = document.getElementById('emailError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value)) {
        const newEmail = document.createElement('span');
        emailArray.push(emailInput.value);
        newEmail.setAttribute('data-email', emailInput.value);

        newEmail.textContent = emailInput.value + ', ';
        emailLabel.appendChild(newEmail);
    
        document.getElementById('emailsInput').value = JSON.stringify(emailArray);

        emailInput.value = '';
        emailError.style.display = 'none';
    } else {
        emailError.style.color = 'red';
        emailError.style.background = '#becc00'
        emailError.style.display = 'block';
    }
}

document.getElementById('mainForm').addEventListener('submit', function(event) {
    if (emailArray.length === 0 && emailInput.value == '') {
        event.preventDefault();  // Prevent form submission
        emailError.style.display = 'block';
        emailError.style.color = '#fff';
        emailError.style.background = '#000'
    }
});