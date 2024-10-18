const User = require("../models/userModel");

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw new Error("Error fetching users");
  }
};

exports.getUserById = async (parent, { id }) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw new Error("Error fetching user");
  }
};

exports.createUser = async (parent, { name, email, password }) => {
  try {
    const newUser = new User({ name, email, password });
    return await newUser.save();
  } catch (err) {
    throw new Error("Error creating user");
  }
};

exports.updateUser = async (parent, { id, ...updates }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (err) {
    throw new Error("Error updating user");
  }
};

exports.deleteUser = async (parent, { id }) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("User not found");
    return deletedUser;
  } catch (err) {
    throw new Error("Error deleting user");
  }
};
