const { requireAuth } = require('../../middleware/auth');

module.exports = async (_, args, context) => {
  const user = requireAuth(context.user);
  
  return {
    _id: user._id,
    email: user.email,
    name: user.name
  };
};