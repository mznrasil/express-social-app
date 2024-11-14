import { setSeederFactory } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import { Comment } from "../entity/Comment.entity";

export const CommentsFactory = setSeederFactory(Comment, () => {
  const comment = new Comment();
  comment.comment = faker.lorem.sentence(20);
  return comment;
});
