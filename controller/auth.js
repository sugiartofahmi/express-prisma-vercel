import prisma from "../lib/prisma.js";

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

    const isEmailExist = await prisma.user.findUnique({
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

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
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
