import mongoose from "mongoose";
import schema from "./schema.js";
import courseSchema from "./schema.js";

const CourseModel  = mongoose.model("CourseModel", courseSchema);
export default CourseModel;