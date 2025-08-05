import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });

  // We can also set the token in an HTTP-Only cookie for security
  // For now, we will just return it in the response body
  return token;
};

export default generateToken;
