import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        not_available_until: String,         // e.g., "May 6 at 12:00 AM"
        due: String,                         // e.g., "May 13 at 12:00 AM"
        points: String,                      // e.g., "100 pts"
        not_available_until_date: String,    // e.g., "2024-05-06"
        due_date: String                     // e.g., "2024-05-13"
    },
    {
        collection: "assignments"
    }
);

export default assignmentSchema;
