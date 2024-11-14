import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User, UserRole } from "../../entity/User.entity";
import { Post } from "../../entity/Post.entity";
import { faker } from "@faker-js/faker";
import { config } from "../../config/config";
import bcrypt from "bcryptjs";
import { Comment } from "../../entity/Comment.entity";

export default class MainSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    await userRepository.insert([
      {
        username: config.ADMIN_USERNAME,
        email: config.ADMIN_EMAIL,
        password: bcrypt.hashSync(config.ADMIN_PASSWORD),
        roles: [UserRole.USER, UserRole.ADMIN]
      }
    ]);

    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);

    const postRepository = dataSource.getRepository(Post);
    const postsFactory = factoryManager.get(Post);

    const commentsRepository = dataSource.getRepository(Comment);
    const commentsFactory = factoryManager.get(Comment);

    const posts = await Promise.all(
      Array(20)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            userId: faker.helpers.arrayElement(users.map((user) => user.id))
          });
          return made;
        })
    );
    await postRepository.save(posts);

    const comments = await Promise.all(
      Array(50)
        .fill("")
        .map(async () => {
          const made = await commentsFactory.make({
            userId: faker.helpers.arrayElement(users.map((user) => user.id)),
            postId: faker.helpers.arrayElement(posts.map((post) => post.id))
          });
          return made;
        })
    );
    await commentsRepository.save(comments);
  }
}
