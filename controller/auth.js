import prisma from "../lib/prisma.js";
import { comparePassword, encryptPassword } from "../utils/password.js";
import generateToken from "../utils/token.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "name cannot be empty",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "email cannot be empty",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: "failed",
        message: "password cannot be empty",
      });
    }

    const isEmailExist = await prisma.User.findUnique({
      where: {
        email,
      },
    });
    if (isEmailExist) {
      return res.status(400).json({
        status: "failed",
        message: "email already exist, please login",
      });
    }

    const user = await prisma.User.create({
      data: {
        email,
        name,
        password: await encryptPassword(password),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.info(error.message);
    res.status(500).json({
      status: "failed",
      message: "server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "email cannot be empty",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: "failed",
        message: "password cannot be empty",
      });
    }

    const user = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "account not found",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Wrong  password",
      });
    }
    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: {
        access_token: await generateToken.accessToken(user),
        refresh_token: await generateToken.refreshToken(user),
      },
    });
  } catch (error) {
    console.info(error.message);
    res.status(500).json({
      status: "failed",
      message: "server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const token = await prisma.Token.findUnique({
      where: {
        token: refresh_token,
      },
    });
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid token",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Logged Out Sucessfully",
    });
  } catch (error) {
    console.info(error.message);
    res.status(500).json({
      status: "failed",
      message: "server error",
    });
  }
};

export const refresh = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      access_token: await generateToken.accessToken(req.user),
    });
  } catch (error) {
    console.info(error.message);
    res.status(500).json({
      status: "failed",
      message: "server error",
    });
  }
};
