const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use(express.urlencoded({ extended:true }));

app.use("/static", express.static("public"));
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }) 
    .then(() => {
        console.log("Connected to db!");
        app.listen(3000, () => console.log("Server Up and running")); 
    })
    .catch((err) => { console.error(err); });

app.set("view engine", "ejs");

app.get('/', async (req, res) => { try {
    const tasksresults = await TodoTask.find({},);
    res.render("todo.ejs", { todoTasks: tasksresults }); } catch (err) {
          res.send(500, err);
           res.redirect("/");
    } });

app.post('/',async (req, res) => { const todoTask = new TodoTask({
    content: req.body.content });
        try {
            await todoTask.save();
            res.redirect("/");
        } catch (err) {
            res.send(500, err);
            res.redirect("/");
    } });

// app.listen(3000, () => console.log("Server up and running"));