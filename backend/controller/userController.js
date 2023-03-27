import User from "../models/User.js";

//create new User
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Successful create ", data: saveUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create .Try again !!!" });
  }
};

//update User
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successful updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to updated" });
  }
};
//delete User
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};
//get single User
export const getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const User = await User.findById(id);
    res
      .status(200)
      .json({ success: true, message: "Get successful", data: User });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all User
export const getAllUser = async (req, res, next) => {
  //for pagination
  const page = parseInt(req.query.page);

  try {
    const Users = await User.find({})
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: Users.length,
      message: "Successful",
      data: Users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};