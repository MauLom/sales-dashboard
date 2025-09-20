const User = require('../../models/User');
const { generateToken } = require('../../utils/auth');

module.exports = async (_, { input }) => {
  try {
    const { email, password, name } = input;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = new User({ email, password, name });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};