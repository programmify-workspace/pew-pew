document.getElementById('avatar-upload-btn').addEventListener('click', function() {
    document.getElementById('avatar-upload').click();
});

document.getElementById('avatar-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // You can display the image preview if needed
            const img = document.getElementById('profile-avatar');
            img.src = e.target.result;
            img.alt = 'Avatar Image Preview';
        };
        reader.readAsDataURL(file);
    }
});
