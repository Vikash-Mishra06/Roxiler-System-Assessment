// Handles store related requests.

const {
  getAllStores,
} = require("../services/storeService");

const getStores = async (req, res) => {
  try {
    const stores = await getAllStores();

    return res.status(200).json({
      success: true,
      data: stores,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stores",
    });
  }
};

module.exports = {
  getStores,
};