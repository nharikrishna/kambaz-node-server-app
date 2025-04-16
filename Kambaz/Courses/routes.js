import * as courseDao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import {deleteEnrollment, getUserCourseEnrollmentId} from "../Enrollments/dao.js";
import CourseModel from "./model.js";
import UserModel from "../Users/model.js";

export default function CourseRoutes(app) {
    const findCoursesForEnrolledUser = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = await courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };

    app.get("/api/courses", async (req, res) => {
        res.json(await courseDao.findAllCourses());
    });
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await courseDao.deleteCourse(courseId);
        res.send(status);
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await courseDao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await assignmentDao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.post("/api/courses/:courseId/enroll/:userId", async (req, res) => {
        const { courseId, userId } = req.params;

        const course = await CourseModel.findById(courseId);
        const user = await UserModel.findById(userId);

        if (!user || !course) {
            return res.sendStatus(403);
        }

        const newEnrollment = await enrollmentsDao.enrollUserInCourse(user._id, course._id);
        res.send(newEnrollment);
    });


    app.delete("/api/courses/:courseId/enroll/:userId", async (req, res) => {
        const {courseId, userId} = req.params;
        const deletedEnrollment = await deleteEnrollment(userId, courseId);
        return res.send(deletedEnrollment);
    });

    app.get("/api/courses/:courseId/enroll/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const enrollmentId = await getUserCourseEnrollmentId(userId, courseId);

        if (!enrollmentId) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        return res.json({ enrollmentId });
    });

    app.get("/api/courses/:courseId/users", async (req, res) => {
        const { courseId } = req.params;
        const users = await courseDao.findUsersForCourse(courseId);
        res.send(users);
    });

}
