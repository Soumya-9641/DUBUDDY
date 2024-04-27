const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have an Admin model
require('dotenv').config();
async function isStudent(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Check if the user is an admin
    const user = await User.findById(decoded.userId);

    if (!user) { 
      return res.status(403).json({ message: 'User access denied' });
    }

    // Attach the admin's ID to the request object for future use
    if (!user.isTeacher) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: 'Only student can fill the session request' });
      }
    //req.adminId = User._id;
    //next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = isStudent;