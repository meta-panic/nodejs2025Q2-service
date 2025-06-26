import { hash, getSalt } from 'bcryptjs';


const validatePassword = async (password: string, saltedPassword): Promise<boolean> => {
  const salt = await getSalt(saltedPassword);

  const loggedPassword = await hash(password, salt);

  if (loggedPassword === saltedPassword) {
    return true;
  }

  return false;
}

export default validatePassword;
