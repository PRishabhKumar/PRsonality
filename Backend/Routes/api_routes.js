import {Router} from "express"
import {fetchRepo, getAnalysis, getErrorLocation, getSolution} from "../Controllers/controller.js"


const router = Router()

router.route("/fetchRepo").post(fetchRepo)
router.route("/analyze").post(getAnalysis)
router.route("/get_error_location").post(getErrorLocation)
router.route("/get_solution").post(getSolution)

export default router