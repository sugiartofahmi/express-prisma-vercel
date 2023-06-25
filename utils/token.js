import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
const generateToken = {
  accessToken: async (payload) => {
    return jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
  },
  refreshToken: async (payload) => {
    const token = await jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "2m",
      }
    );
    const userToken = await prisma.Token.findUnique({
      where: {
        userId: payload.id,
      },
    });

    if (userToken) {
      await prisma.Token.update({
        where: {
          userId: payload.id,
        },
        data: {
          token,
        },
      });
    } else {
      await prisma.Token.create({
        data: {
          userId: payload.id,
          token,
        },
      });
    }
    return token;
  },
};

export default generateToken;
