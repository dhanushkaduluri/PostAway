import jwt from 'jsonwebtoken';
import { UserModel } from '../features/user/user.repository.js';

export const jwtAuth = async (req, res, next) => {
  // read the token
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).send('Unauthorized: Token not provided');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Store user information in the request
    req.id = decoded.userId;
    req.user = decoded.user;

    // Check if the user exists and the token is in the user's tokens array
    const user = await UserModel.findById(decoded.userId);

    if (!user || !user.tokens.includes(token)) {
      return res.status(401).send('Unauthorized: Invalid token or user');
    }

    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    console.error('JWT Verification Error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send('Unauthorized: Token has expired');
    }

    return res.status(401).send('Unauthorized: Invalid token');
  }
};
