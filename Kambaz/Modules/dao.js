import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import ModuleModel from "./model.js";

export function findModulesForCourse(courseId) {
    return ModuleModel.find({ course: courseId });
}

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return ModuleModel.create(newModule);
}

export function deleteModule(moduleId) {
    return ModuleModel.deleteOne({ _id: moduleId }).then(() => 204);
}

export function updateModule(moduleId, moduleUpdates) {
    return ModuleModel.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
}
