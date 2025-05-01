import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import EnrollmentModel from "./model.js";


export function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    return EnrollmentModel.create(newEnrollment);
}

export function getUserCourseEnrollmentId(userId, courseId) {
    return EnrollmentModel.findOne({ user: userId, course: courseId });
}

export function deleteEnrollment(userId, courseId) {
    return EnrollmentModel.findOneAndDelete({ user: userId, course: courseId });
}