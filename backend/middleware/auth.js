const { verifyToken } = require('../utils/auth');
const User = require('../models/User');

const getUser = async (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  try {
    const { userId } = verifyToken(token);
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return null;
  }
};

const requireAuth = (user) => {
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
};

module.exports = {
  getUser,
  requireAuth
};