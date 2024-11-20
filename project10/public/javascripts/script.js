const tagInput = document.querySelector('.tag-input');

function addTag(tag) {
    
}

// Helper function to reset preview to upload state
function resetPreviewToUploadState(previewContainer) {
    previewContainer.innerHTML = `
        <i class="fas fa-cloud-upload-alt fa-2x"></i>
        <span>Click to upload cover image</span>
    `;
    document.getElementById('coverImageInput').value = ''; // Clear the file input
}

// Helper function to add remove button functionality
function addRemoveButtonListener(button, previewContainer) {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Stop event from bubbling up to parent
        resetPreviewToUploadState(previewContainer);
        
        // Add a hidden input to indicate image removal in edit mode
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'removeCoverImage';
        hiddenInput.value = 'true';
        previewContainer.appendChild(hiddenInput);
    });
}

document.getElementById('coverImagePreview').addEventListener('click', function() {
    document.getElementById('coverImageInput').click();
});

document.getElementById('coverImagePreview').addEventListener('mouseenter', function() {
    document.getElementById('coverImagePreview').style.overflow = 'visible';
})

document.getElementById('coverImagePreview').addEventListener('mouseleave', function() {
    document.getElementById('coverImagePreview').style.overflow = 'hidden';
})

// Add event listener to existing remove button if present
const existingRemoveButton = document.querySelector('.remove-cover-image');
if (existingRemoveButton) {
    addRemoveButtonListener(existingRemoveButton, document.getElementById('coverImagePreview'));
}

document.getElementById('coverImageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById('coverImagePreview');
            previewContainer.innerHTML = `
                <img src="${e.target.result}" alt="Cover Image Preview" class="cover-image">
                <button type="button" class="remove-cover-image">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Add event listener to new remove button
            const removeButton = previewContainer.querySelector('.remove-cover-image');
            addRemoveButtonListener(removeButton, previewContainer);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('blogForm').addEventListener('submit', function(e) {
    const editor = tinymce.get('my-expressjs-tinymce-app');
    
    if (!editor || !editor.getContent().trim()) {
        alert('Please enter some content');
        return false;
    }
    
    // Set the hidden input value
    document.getElementById('hidden-content').value = editor.getContent();
    
    // Now you can submit the form
    return true;
});