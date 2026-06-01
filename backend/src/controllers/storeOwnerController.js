// Handles store owner dashboard requests.

const { getStoreOwnerDashboard, getRatedUsers, } = require("../services/storeOwnerService");

const dashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await getStoreOwnerDashboard(ownerId);

    const ratedUsers = await getRatedUsers(ownerId);

    return res.status(200).json({
      success: true,
      data: {
        store,
        ratedUsers,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  dashboard,
};
