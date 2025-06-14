import { hash } from 'bcryptjs';


const saltPassword = async (rawPassword: string): Promise<string> => {
  const saltedPassword = await hash(rawPassword, 10);

  return saltedPassword;
}

export default saltPassword;
