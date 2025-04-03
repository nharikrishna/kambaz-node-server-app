import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment;
}

export function getAllEnrollments() {
    const { enrollments } = Database;
    return enrollments;
}

export function getUserCourseEnrollmentId(userId, courseId) {
    const { enrollments } = Database;
    const enrollment = enrollments.find(
        enrollment => enrollment.user === userId && enrollment.course === courseId
    );
    return enrollment ? enrollment : null;
}

export function deleteEnrollment(userId, courseId) {
    const { enrollments } = Database;

    const enrollmentIndex = enrollments.findIndex(
        enrollment => enrollment.user === userId && enrollment.course === courseId
    );

    if (enrollmentIndex !== -1) {
        const deletedEnrollment = enrollments[enrollmentIndex];
        enrollments.splice(enrollmentIndex, 1);
        return deletedEnrollment;
    }
    return null;
}