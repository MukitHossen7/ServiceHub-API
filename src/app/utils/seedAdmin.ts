import config from "../config";
import { IAuthsProviders, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const isAdminExists = await User.findOne({
      email: config.ADMIN_EMAIL,
      role: "ADMIN",
    });
    if (isAdminExists) {
      console.log("Admin already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(
      config.ADMIN_PASSWORD as string,
      Number(config.BCRYPT_SALT_ROUNDS)
    );

    const authProvider: IAuthsProviders = {
      provider: "credential",
      providerID: config.ADMIN_EMAIL as string,
    };
    const payload: IUser = {
      name: "Admin",
      email: config.ADMIN_EMAIL as string,
      password: hashedPassword,
      role: Role.ADMIN,
      isVerified: true,
      auths: [authProvider],
    };
    await User.create(payload);
  } catch (error) {
    console.log(error);
  }
};
