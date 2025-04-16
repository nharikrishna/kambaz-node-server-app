import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import EnrollmentModel from "../Enrollments/model.js";

export function findAllCourses() {
    return CourseModel.find();
}

export function findCoursesForEnrolledUser(userId) {
    return EnrollmentModel.find({ user: userId })
        .populate("course")
        .then(enrollments => enrollments.map(e => e.course));
}

export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return CourseModel.create(newCourse);
}

export async function deleteCourse(courseId) {
    await CourseModel.deleteOne({ _id: courseId });
    await EnrollmentModel.deleteMany({ course: courseId });
    return 204;
}

export function updateCourse(courseId, courseUpdates) {
    return CourseModel.findByIdAndUpdate(courseId, courseUpdates, { new: true });
}

export function findUsersForCourse(courseId) {
    return EnrollmentModel.find({ course: courseId }).populate("user").then(enrollments =>
                                                                                enrollments.map(e => e.user)
    );
}
