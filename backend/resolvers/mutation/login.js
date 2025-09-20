const User = require('../../models/User');
const { generateToken } = require('../../utils/auth');

module.exports = async (_, { input }) => {
  try {
    const { email, password } = input;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

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