import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Post } from "./Post.entity";
import { Token } from "./Token.entity";
import { Comment } from "./Comment.entity";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @Column({
    type: "enum",
    array: true,
    enum: UserRole,
    default: [UserRole.USER],
    select: false
  })
  roles: UserRole[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: "user_followers",
    joinColumn: {
      name: "followerId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "followingId",
      referencedColumnName: "id"
    }
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];
}
