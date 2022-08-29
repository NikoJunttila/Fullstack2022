const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/person")

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method)
	console.log("Path:  ", request.path)
	console.log("Body:  ", request.body)
	console.log("---")
	next()
}
app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static("build"))


morgan.token("body", (req,res) => {
	if(req.method === "POST"){
		return JSON.stringify(req.body)
	}
	return ""
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))



app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1>")
})



app.post("/api/persons", (request, response, next) => {
	const body = request.body
	// let names = Person.map(nameCheck => nameCheck.name)
	if (!body.name) {
		return response.status(400).json({
			error: "name missing"
		})
	}
	const person = new Person({
		name: body.name,
		number: body.number
	})
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
})

/*

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
if (names.includes(body.name) === true){
  return response.status(400).json({
    error: 'name is already added'
  })
}
*/



app.get("/info", (req, res) => {
	const today = new Date()
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	const date = days[today.getDay()] +" "+ months[today.getMonth()] +" "+ today.getDate() +" "
                + today.getFullYear() +" "+ today.toTimeString()
  Person.find({}).then(persons => {
  const show = `<div>Phonebook has info for ${persons.length} people <br/>${date}</div>`
	res.send(show)
  })
})

app.get("/api/persons", (request, response) => {
	Person.find({}).then(people => {
		response.json(people.map(person => person.toJSON()))
	})
})

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.put("/api/person/:id", (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: "query" }
	)

	Person.findByIdAndUpdate(request.params.id, Person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})