import UserModel from "./model.js";
import {v4 as uuidv4} from "uuid";

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return UserModel.create(newUser);
};

export const findAllUsers = () => {
    return UserModel.find();
}
export const findUserById = (userId) => {
    return UserModel.findById(userId);
}
export const findUserByUsername = (username) => {
    return UserModel.findOne({username: username});
}
export const findUserByCredentials = (username, password) => {
    console.log(username, password);
    return UserModel.findOne({username: username, password: password});
}
export const updateUser = async (userId, user) => {
    await UserModel.updateOne({_id: userId}, {$set: user});
}

export const deleteUser = async (userId) => {
    try {
        console.log(userId);
        await UserModel.deleteOne({_id: userId});
        return 204;
    }
    catch (error) {
        return 404;
    }
}

export const findUsersByRole = (role) => {
    return UserModel.find({ role: role });
}

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return UserModel.find({
                          $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
                      });
};

