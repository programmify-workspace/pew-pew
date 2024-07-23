document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('form-container');
    const editButtons = document.querySelectorAll('.edit-btn');
    const userIdInput = document.getElementById('user-id');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const email = button.getAttribute('data-email');
            const password = button.getAttribute('data-password');

            userIdInput.value = id;
            nameInput.value = name;
            emailInput.value = email;
            passwordInput.value = password;

            formContainer.classList.remove('hidden');
        });
    });

    formContainer.addEventListener('click', function (e) {
        if (e.target === formContainer) {
            formContainer.classList.add('hidden');
        }
    });
});