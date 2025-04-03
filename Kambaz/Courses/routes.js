import * as dao from "./dao.js";
import * as courseDao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js";
import Database from "../Database/index.js";
import enrollments from "../Database/enrollments.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import {deleteEnrollment, getUserCourseEnrollmentId} from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    const findCoursesForEnrolledUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };

    app.get("/api/courses", (req, res) => {
        res.send(dao.findAllCourses());
    });
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const status = courseDao.deleteCourse(courseId);
        res.send(status);
    });
    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = assignmentDao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.post("/api/courses/:courseId/enroll/:userId", (req, res) => {
        const { courseId, userId } = req.params;

        const course = Database.courses.find(c => c._id === courseId);
        const user = Database.users.find(u => u._id === userId);
        if (!user || !course) {
            res.sendStatus(403);
        }
        const newEnrollment = enrollmentsDao.enrollUserInCourse(user._id, course._id);
        res.send(newEnrollment);
    })

    app.delete("/api/courses/:courseId/enroll/:userId", (req, res) => {
        const { courseId, userId } = req.params;
        const deletedEnrollment = deleteEnrollment(userId, courseId);
        return res.send(deletedEnrollment);
    });

    app.get("/api/courses/:courseId/enroll/:userId", (req, res) => {
        const { courseId, userId } = req.params;
        const enrollmentId = getUserCourseEnrollmentId(userId, courseId);

        if (!enrollmentId) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        return res.json({ enrollmentId });
    });

}
