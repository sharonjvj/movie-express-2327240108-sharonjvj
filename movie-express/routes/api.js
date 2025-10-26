import express from "express"
import * as movieController from "../controllers/movieController.js"

const api = express.Router()

api.get("/movies", movieController.movieList)
api.post("/movies", movieController.addMovie)
api.put("/movies/:id", movieController.updateMovie)
api.delete("/movies/:id", movieController.deleteMovie)


export default api