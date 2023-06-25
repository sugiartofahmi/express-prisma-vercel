import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(401).json({
        status: "failed",
        message: "Token not provided",
      });
    }
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ status: "failed", message: error.message });
        }
        const token = await prisma.Token.findUnique({
          where: {
            token: refresh_token,
          },
        });
        if (!token) {
          return res.status(401).json({
            status: "failed",
            message: "refresh token not found",
          });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ status: "failed", message: "Server Error" });
  }
};

export default verifyRefreshToken;
