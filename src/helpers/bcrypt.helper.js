import bcrypt from "bcrypt";
const rounds = process.env.SALT_ROUNDS;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hashSync(password, salt);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const comparePasswords = async (input, dbPass) => {
  try {
    return await bcrypt.compare(input, dbPass);
  } catch (error) {
    console.log(error);
  }
  return null;
};
export { hashPassword, comparePasswords };
