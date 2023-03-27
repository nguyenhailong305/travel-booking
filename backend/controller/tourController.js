import Tour from "../models/Tour.js";

//create new tour
export const createTour = async (req, res, next) => {
  const newTour = new Tour(req.body);
  try {
    const saveTour = await newTour.save();
    res
      .status(200)
      .json({ success: true, message: "Successful create ", data: saveTour });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create .Try again !!!" });
  }
};

//update tour
export const updateTour = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successful updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to updated" });
  }
};
//delete tour
export const deleteTour = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};
//get single tour
export const getSingleTour = async (req, res, next) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res
      .status(200)
      .json({ success: true, message: "Get successful", data: tour });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all tour
export const getAllTour = async (req, res, next) => {
  //for pagination
  const page = parseInt(req.query.page);
  console.log(page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get tour by search
export const getTourBySearch = async (req, res, next) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    //$gte : Lớn hơn hoặc bằng search
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({ success: true, message: "Successful", data: tours });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get featured tour

export const getFeaturedTour = async (req, res, next) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get tour counts
export const getTourCount = async (req, res, next) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount().populate("reviews");
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(404).json({ success: false, message: "Failed to fetch" });
  }
};
