import config from "../config";
import bcrypt from "bcrypt";

const passwordEncryptingFunc = async (password: string): Promise<string> => {
  const encryptPass = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round)
  );
  return encryptPass;
};

export default passwordEncryptingFunc;
