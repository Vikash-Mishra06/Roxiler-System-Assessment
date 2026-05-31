const { findRating, createRating, updateRating } = require("../services/ratingService");

const submitRating = async (req, res) => {
  try {
    const { storeId } = req.params;

    const { rating } = req.body;

    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const existingRating = await findRating(userId, storeId);

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this store",
      });
    }

    const newRating = await createRating(userId, storeId, rating);

    return res.status(201).json({
      success: true,
      data: newRating,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit rating",
    });
  }
};

const modifyRating = async (req, res) => {
  try {
    const { storeId } = req.params;

    const { rating } = req.body;

    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const existingRating = await findRating(userId, storeId);

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    const updatedRating = await updateRating(userId, storeId, rating);

    return res.status(200).json({
      success: true,
      data: updatedRating,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update rating",
    });
  }
};

module.exports = {
  submitRating,
  modifyRating,
};
