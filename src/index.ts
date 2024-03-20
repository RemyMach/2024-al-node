import express from "express";


const main = () => {
    const app = express()
    const port = 3000
    app.use(express.json())

    app.get("/", (req, res) => {
        res.send({ "message": "hello world" })
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

main()