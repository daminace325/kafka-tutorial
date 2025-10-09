import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})

app.post("/payment-service", async (req, res) => {
    const {cart} = req.body
    //assume we got the cookie and decrypt the userId
    const userId = "123"

    //TODO: payment
    console.log("API HIT!");
    
    //TODO: Kafka

    return res.status(200).send("Payment Successful")
})

app.listen(8000, ()=>{
    console.log("Payment Service running port 8000");
})