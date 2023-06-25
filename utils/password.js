import bcryptjs from "bcryptjs";

export const encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
};

export const comparePassword = async (inputPassword, userPassword) => {
  return await bcryptjs.compare(inputPassword, userPassword);
};
