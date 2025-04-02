import Database from "../Database/index.js";
import {v4 as uuidv4} from "uuid";

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, id: uuidv4() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course_id === courseId);
}

export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment.id !== assignmentId);
    return 204;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment.id === String(assignmentId));
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}
