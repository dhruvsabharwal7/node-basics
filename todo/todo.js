const fs = require('fs')

const filePath = './todo/tasks.json';

const command = process.argv[2]
const arg = process.argv[3]

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(err) {
    return []
  }
}

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks)
  fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
  const tasks = loadTasks()
  tasks.push({ task })
  saveTasks(tasks)
  console.log('task added', task)
}
const removeTask = (taskIndex) => {
  let tasks = loadTasks()
  tasks = tasks.filter( ( task, index ) => Number(taskIndex) !== index )
  saveTasks(tasks)
  console.log('task removed!')
}
const listTasks = () => {
  const tasks = loadTasks()
  tasks.forEach(( task, index ) => {
    console.log(`${ index+1 } - ${ task.task }`)
  })
}

if (command === 'add') {
  addTask(arg)
} else if (command === 'remove') {
  removeTask(arg)
} else if (command === 'list') {
  listTasks()
} else {
  console.log('command not found.')
}