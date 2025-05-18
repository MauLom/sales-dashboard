const mongoose = require("mongoose");
const Order = require("../../models/Order");

const getSalesAnalytics = async (_, { startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const analytics = await Order.aggregate([
    {
      $match: {
        status: "completed",
        orderDate: { $gte: start, $lte: end }
      }
    },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalAmount" },
              completedOrders: { $sum: 1 }
            }
          }
        ],
        categoryRevenue: [
          { $unwind: "$items" },
          {
            $lookup: {
              from: "products",
              localField: "items.product",
              foreignField: "_id",
              as: "productInfo"
            }
          },
          { $unwind: "$productInfo" },
          {
            $group: {
              _id: "$productInfo.category",
              revenue: {
                $sum: {
                  $multiply: ["$items.quantity", "$productInfo.price"]
                }
              }
            }
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              revenue: 1
            }
          },
          {
            $sort: { category: 1 }
          }
        ]
      }
    }
  ]);

  const totals = analytics[0].totals[0] || { totalRevenue: 0, completedOrders: 0 };
  const revenuePerCategory = analytics[0].categoryRevenue;

  return {
    totalRevenue: totals.totalRevenue,
    completedOrders: totals.completedOrders,
    revenuePerCategory
  };
};

module.exports = getSalesAnalytics;
