import { setSeederFactory } from "typeorm-extension";
import { Post } from "../entity/Post.entity";
import { faker } from "@faker-js/faker";

export const PostsFactory = setSeederFactory(Post, () => {
  const post = new Post();
  post.title = faker.lorem.sentence(10);
  post.content = faker.lorem.sentence(100);
  post.tags = Array.from({length: Math.ceil((Math.random() * 4))}).fill("").map(() => faker.lorem.word());
  return post;
})