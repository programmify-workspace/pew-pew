const express = require('express'),
    router = express.Router()

const service = require('../services/employees.service')

// GET ALL EMPLOYEES
// http:localhost:3000/api/employees/
router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

// GET EMPLOYEE BY ID
router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
    // Check if ID is available
    if (employee.length == 0) {
        res.status(404).json('No Record with given id : ' + req.params.id)
    } else {
        res.send(employee)
    }
})

// DELETE EMPLOYEE
router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    // Check if ID is available
    if (affectedRows.length == 0) {
        res.status(404).json('No Record with given id : ' + req.params.id)
    } else {
        res.send("Deleted Successfully!")
    }
})

// CREATE
router.post('/', async (req, res) => {
    await service.addOrEditEmployee(req.body)
    res.status(201).send("Created Successfully!")
})

// UPDATE
router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0) {
        res.status(404).json('No Record with given id : ' + req.params.id)
    } else {
        res.send("Updated Successfully!")
    }
})

module.exports = router;