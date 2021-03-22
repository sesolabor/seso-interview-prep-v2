import bcrypt from "bcrypt";

export const generateHash = (password: string): Promise<string> => {
  const numHashRounds = 10;
  return bcrypt.hash(password, numHashRounds);
};
export const validPassword = (password: string, passwordIncoming: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordIncoming);
};
