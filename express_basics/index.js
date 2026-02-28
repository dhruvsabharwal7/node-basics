import 'dotenv/config'
import express from "express"

import logger from "./logger.js";
import morgan from "morgan";

const app = express()
const port = process.env.PORT || 3000

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json())

let teaData = []
let nextId = 1

// get home page
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// post/add a tea 
app.post('/teas', (req, res) => {
  logger.info('POST')
  const { name, price } = req.body
  const newTea = { id: nextId++, name: name, price: price }
  teaData.push(newTea)
  res.status(200).send(newTea)
})

// get all teas
app.get('/teas', (req, res) => {
  res.status(200).send(teaData)
})

// get tea with id
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(tea => tea.id === parseInt(req.params.id))
  if(!tea){
    res.status(404).send('404: Error (Tea not found)')
  }else{
    res.status(200).send(tea)
  }
})

//update tea info
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(tea => tea.id === parseInt(req.params.id))
  if(!tea){
    res.status(404).send('404: Error (Tea not found)')
  }

  const { name, price } = req.body
  tea.name = name 
  tea.price = price
  res.status(200).send(`Tea Updated : ${tea}`)

})

//delete tea
app.delete('/teas/:id', (req, res) => {
  const teaIdx = teaData.findIndex(tea => tea.id === parseInt(req.params.id))
  if(teaIdx === -1){
    res.status(404).send('404: Error (Tea not found)')
  }
  teaData = teaData.filter((tea, index) => {
    return index !== teaIdx
  })
  res.status(200).send(`Tea Deleted :)`)
  //teaData.splice(teaIdx, 1)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})