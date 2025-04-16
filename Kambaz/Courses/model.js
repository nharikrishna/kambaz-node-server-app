import mongoose from "mongoose";
import schema from "./schema.js";
import courseSchema from "./schema.js";

const model = mongoose.model("CourseModel", courseSchema);
export default model;