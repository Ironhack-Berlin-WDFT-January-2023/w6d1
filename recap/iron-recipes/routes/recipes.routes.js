const express = require("express")
const router = express.Router()
const Recipe = require("../models/Recipe.model")
const Comment = require("../models/Comment.model")

router.get("/recipes/add", (req, res) => {
  res.render("recipes/add")
})

router.post("/recipes", (req, res, next) => {
  // const title = req.body.title
  // const description = req.body.description
  const { title, description } = req.body
  
  Recipe.create({ title, description })
    .then(createdRecipe => {
      res.redirect("/recipes")
    })
    .catch(err => next(err))
})

router.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.render("recipes/all", { recipes })
    })
    .catch(err => next(err))
})

router.get("/recipes/:id", (req, res, next) => {
  const id = req.params.id

  Recipe.findById(id)
    .populate("comments")
    .then(recipe => {
      res.render("recipes/details", { recipe })
    })
    .catch(err => next(err))
})

router.post("/recipes/:id/comments", (req, res, next) => {
  const id = req.params.id
  const { user, comment } = req.body

  Comment.create({ user, comment })
    .then(createdComment => {
      Recipe.findByIdAndUpdate(id, { $push: { comments: createdComment._id } })
        .then(recipe => {
          res.redirect(`/recipes/${id}`)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})




module.exports = router