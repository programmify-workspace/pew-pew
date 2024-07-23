document.addEventListener('DOMContentLoaded', function () {
    const updateFormContainer = document.getElementById('update-form-container');
    const editButtons = document.querySelectorAll('.edit-btn');
    const taskInput = document.getElementById("task-input");
    const idInput = document.getElementById('list-id');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.getAttribute('data-id');
            const task = button.getAttribute('data-task');

            idInput.value = id;
            taskInput.value = task;

            updateFormContainer.classList.remove('hidden');
        });
    });

    updateFormContainer.addEventListener('click', function (e) {
        if (e.target === updateFormContainer) {
            updateFormContainer.classList.add('hidden');
        }
    });

    // document.querySelectorAll('.status-form input[type="checkbox"]').forEach(function(checkbox) {
    //     checkbox.addEventListener('change', function() {
    //         const taskCell = this.closest('tr').querySelector('.task-cell');
    //         if (this.checked) {
    //             taskCell.classList.add('checked-task');
    //         } else {
    //             taskCell.classList.remove('checked-task');
    //         }
    //     });
    // });
});