document.addEventListener('DOMContentLoaded', function() {
    const deleteBtn = document.getElementById('deleteBtn');
    const deleteModal = document.querySelector('.delete-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    const deleteForm = document.getElementById('deleteForm');

    function showModal() {
        deleteModal.classList.add('active');
        modalOverlay.classList.add('active');
    }

    function hideModal() {
        deleteModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }

    deleteBtn?.addEventListener('click', showModal);
    modalOverlay?.addEventListener('click', hideModal);
    cancelDelete?.addEventListener('click', hideModal);
    
    confirmDelete?.addEventListener('click', function() {
        deleteForm.submit();
    });
});