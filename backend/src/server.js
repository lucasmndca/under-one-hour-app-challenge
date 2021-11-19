require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const service = require('./services/service')

async function server() {
    // vars
    const app = express()
    const port = 8080
    const options = {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        preflightContinue: false,
        allowedHeaders: ['Content-Type', 'Accept'],
        optionsSuccessStatus: 200
    }

    // config
    app.use(cors(options))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // connect
    try {
        await mongoose.connect(`${process.env.DB_HOST_BASE}${process.env.DB_USER}:${process.env.DB_PSWD}${process.env.DB_HOST_ROUTE}`)
        console.log('Connected to the database')

        // routes
        app.get('/', (req, res) => res.send('Welcome'))

        app.get('/todos', async (req, res) => {
            try {
                res.status(200).json({data: await service.findAll()})
            } catch (error) {
                console.error(error)
                res.status(500).json({message: 'Could not fetch todos', error})
            }
        })

        app.post('/todos/create', async (req, res) => {
            try {
                res.status(200).json({data: await service.create(req.body)})
            } catch (error) {
                console.error(error)
                res.status(500).json({message: 'Could not fetch todos', error})
            }
        })

        app.delete('/todos/remove', async (req, res) => {
            try {
                res.status(200).json({data: await service.remove(req.query.id)})
            } catch (error) {
                console.error(error)
                res.status(500).json({message: 'Could not fetch todos', error})
            }
        })

        // Run
        app.listen(port, () => console.log(`Server is running on ${port}`))
    } catch (error) {
        console.error(error)
    }
}

// start
server()