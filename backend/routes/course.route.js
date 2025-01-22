import express from 'express'
import { courseDetails, createCourse, deleteCourse, getCourses, updateCourse, buyCourses } from '../controllers/course.controller.js';
import userMiddleware from '../middleware/user.mid.js';
import adminMiddleware from '../middleware/admin.min.js';

const router = express.Router()

router.post("/create",adminMiddleware, createCourse)
router.put("/update/:courseId",adminMiddleware, updateCourse)
router.delete("/delete/:courseId",adminMiddleware, deleteCourse)

router.get("/courses",getCourses)
router.get("/:courseId",courseDetails)

router.post("/buy/:courseId",userMiddleware,buyCourses)

export default router;