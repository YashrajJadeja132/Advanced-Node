const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    const users = await User.find(res.filterQuery)
      .sort(res.sortOptions)
      .skip(res.paginatedResults.skip)
      .limit(res.paginatedResults.limit);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: res.paginatedResults.currentPage,
        totalPages: res.paginatedResults.totalPages,
        totalCount: res.paginatedResults.totalCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
