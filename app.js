const express = require('express')
//const bodyparser = require('body-parser')
const mysql = require('mysql')



const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const taskId = await tasks.createTask(req.body)
    res.status(201).json({ id: taskId, message: 'Task created successfully' })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Failed to create task' }) 
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const allTasks = await tasks.getAllTasks()
    res.json(allTasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
});

//route handling post request
app.post('/submit-form', (req, res) => {
    console.log(req.body)
    res.send('Form submitted successfully!')
  })
  


//mysql code
 const Pool = mysql.createPool({
connectionLimit:10,
host:'localhost',
user: 'root',
password:'',
database:'mysql project 2'
 });

 //get all beere
 app.get('', (req,res) =>{
     Pool.getConnection((err, connection)=>{
      if(err) throw err
      console.log('connected as id ${connection.threadId}')
      connection.query('SELECT * from beers', (err, rows) =>{
        connection.release()//return the connection to pool

        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
      })
     })
 })





  //get all beer by id 
  app.get('/:id', (req,res) =>{
    Pool.getConnection((err, connection)=>{
     if(err) throw err
     console.log('connected as id ${connection.threadId}')
     connection.query('SELECT * from beers WHERE id = ?', [req.params.id], (err, rows) =>{
       connection.release()//return the connection to pool

       if(!err){
           res.send(rows)
       }else{
           console.log(err)
       }
     })
    })
})



 //Add A records / beers
 app.post('/', (req,res) =>{
    Pool.getConnection((err, connection)=>{
     if(err) throw err
     console.log('connected as id ${connection.threadId}')

     const params = req.body
     connection.query('INSERT INTO beers SET ?', params, (err, rows) =>{
       connection.release()//return the connection to pool

       if(!err){
           res.send('beer with the Record name: ${params.name} has been added.')
       }else{
           console.log(err)
       }
     })
     console.log(req.body)
    })
})


//Update a records / beers
app.put('', (req,res) =>{
    Pool.getConnection((err, connection)=>{
     if(err) throw err
     console.log('connected as id ${connection.threadId}')

     const {id, name,tagline, description, image} = req.body
     connection.query('UPDATE  beers SET name = ?, tagline =?,description =?,image = ?, WHERE id =?',[name, tagline,description,image, id], (err, rows) =>{
       connection.release()//return the connection to pool

       if(!err){
           res.send('beer with the name: ${name} has been added.')
       }else{
           console.log(err)
       }
     })
     console.log(req.body)
    })
})



//listening on  port 5000
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
  })