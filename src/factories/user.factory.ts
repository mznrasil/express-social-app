import { setSeederFactory } from "typeorm-extension";
import { User, UserRole } from "../entity/User.entity";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

export const UsersFactory = setSeederFactory(User, () => {
  const user = new User();
  user.username = faker.internet.username();
  user.email = faker.internet.email();
  user.password = bcrypt.hashSync("Test@123");
  user.roles = [UserRole.USER];
  return user;
});