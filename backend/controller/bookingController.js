import Booking from "../models/Booking.js";

export const createBooking = async (req, res, next) => {
  const newBooking = new Booking({...req.body});
  try {
    const saveBooking = await newBooking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked",
        data: saveBooking,
      });
  } catch (error) { 
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get single booking
export const getBooking = async (req, res, next) => {
    const id = req.params.id;
    try {
        const book = await Booking.findById(id);
        res.status(200).json({success: true , message : "Successful" , data : book});
    } catch (error) {
        return res.status(404).json({ success: false, message: "Not found" });

    }
}

//get all booking
export const getAllBooking = async (req, res, next) => {
    try {
        const book = await Booking.find();
        res.status(200).json({success: true , message : "Successful" , data : book});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Not found" });
        
    }
}