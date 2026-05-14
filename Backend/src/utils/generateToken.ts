import jwt from "jsonwebtoken";

const generateToken = (user: {
  _id: string;
  email: string;
  role: string;
}) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },

    process.env.JWT_SECRET as string,

    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;