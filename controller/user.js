import prisma from "../lib/prisma.js";
export const getDataUser = async (req, res) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    console.info(error.message);
    res.status(500).json({
      status: "failed",
      message: "server error",
    });
  }
};
