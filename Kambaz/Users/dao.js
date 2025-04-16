import model from "./model.js";
import {v4 as uuidv4} from "uuid";

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
};

export const findAllUsers = () => {
    return model.find();
}
export const findUserById = (userId) => {
    return model.findById(userId);
}
export const findUserByUsername = (username) => {
    return model.findOne({username: username});
}
export const findUserByCredentials = (username, password) => {
    console.log(username, password);
    return model.findOne({username: username, password: password});
}
export const updateUser = async (userId, user) => {
    await model.updateOne({_id: userId}, {$set: user});
}

export const deleteUser = async (userId) => {
    try {
        console.log(userId);
        await model.deleteOne({_id: userId});
        return 204;
    }
    catch (error) {
        return 404;
    }
}

export const findUsersByRole = (role) => {
    return model.find({ role: role });
}

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
                          $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
                      });
};

