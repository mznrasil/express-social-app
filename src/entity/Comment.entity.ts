import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  comment: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "post_id" })
  @Index()
  postId: number;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "user_id" })
  user: User;
}
