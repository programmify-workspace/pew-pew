const db = require('../db')

// GET ALL EMPLOYEES
module.exports.getAllEmployees = async () => {
    const [records] = await db.query("SELECT * FROM employees")
    return records;
}

// GET EMPLOYEE
module.exports.getEmployeeById = async (id) => {
    const [record] = await db.query("SELECT * FROM employees WHERE id = ?", [id])
    return record;
}

// DELETE
module.exports.deleteEmployee = async (id) => {
    const [{affectedRows}] = await db.query("DELETE FROM employees WHERE id = ?", [id])
    return affectedRows;
}

// CREATE || UPDATE
module.exports.addOrEditEmployee = async (obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, obj.name, obj.employee_code, obj.salary])
    return affectedRows;
}