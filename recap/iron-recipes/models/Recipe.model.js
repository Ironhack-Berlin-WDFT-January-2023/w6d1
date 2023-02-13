const { Schema, model } = require("mongoose")

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true
  }
)

const Recipe = model("Recipe", recipeSchema)
module.exports = Recipe
