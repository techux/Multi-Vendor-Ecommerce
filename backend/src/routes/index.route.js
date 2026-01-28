import express from "express";
import ApiResponse from "../utils/ApiResponse.js";

const router = express.Router();

router.get("/", (_, res) => {
  return ApiResponse(res, 200, "API is running", null);
});


export default router;
