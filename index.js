const express = require("express");
const app = express();

app.use(express.urlencoded({ extended:true }));

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('todo.ejs');
});

app.post('/', (req, res) =>{
    console.log(req.body);
})

app.listen(3000, () => console.log("Server up and running"));