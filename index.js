const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
 
/*instead of using the swagger.json file, you can also use the swagger.yaml file.
Also you can use swaggerjs to write the swagger documentation in the comments of the code itself.*/

let restaurants = [
    { id: 1, name: "The Gourmet Kitchen" },
    { id: 2, name: "Pasta Palace" },
    { id: 3, name: "Sushi Central" },
    { id: 4, name: "Burger Haven" },
    { id: 5, name: "Taco Town" }
]

const app = express()
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/restaurants", (req, res) => {
    res.send(restaurants)
});

app.post("/restaurant", (req, res) => {
    restaurants.push({id: req.body.id, name: req.body.name})
    res.send(` ${restaurants} created!`)
});

app.delete("/restaurant/:id", (req, res) => {
    const id = parseInt(req.params.id)
    restaurants = restaurants.filter(restaurant => restaurant.id !== id)
    res.send(`Restaurant with the id ${id} deleted from the database!`)
});

app.put("/restaurant/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const restaurant = restaurants.find(restaurant => restaurant.id === id)
    restaurant.name = req.body.name
    res.send(`Restaurant with the id ${id} has been updated!`)
});



app.listen(3000, () => {
    console.log("Server running on port 3000")
}); 