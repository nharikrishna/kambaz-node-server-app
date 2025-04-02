import * as assignmentDao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function AssignmentsRoutes(app) {
    const findAssignmentsForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = assignmentDao.deleteAssignment(assignmentId);
        res.send(status);
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });
}
