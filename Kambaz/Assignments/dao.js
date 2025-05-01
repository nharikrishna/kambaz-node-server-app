import Database from "../Database/index.js";
import {v4 as uuidv4} from "uuid";
import AssignmentModel from "./model.js";

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return AssignmentModel.create(newAssignment);
}

export function findAssignmentsForCourse(courseId) {
    return AssignmentModel.find({ course: courseId });
}

export function deleteAssignment(assignmentId) {
    console.log(assignmentId);
    return AssignmentModel.deleteOne({ _id: assignmentId }).then(() => 204);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    return AssignmentModel.findByIdAndUpdate(assignmentId, assignmentUpdates, { new: true });
}
