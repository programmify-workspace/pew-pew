function openEditForm(id, name, description) {
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('editName').value = name;
    document.getElementById('editDescription').value = description;
    document.getElementById('editRecordForm').action = '/update/' + id;
}