import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsEmail, IsStrongPassword, MinLength } from "class-validator";
import { Post } from "./Post";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @MinLength(3, { message: "Username must be 3 characters long" })
  username: string;

  @Column({ unique: true })
  @IsEmail(null, { message: "Invalid email" })
  @MinLength(1)
  email: string;

  @Column({ select: false })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    { message: "Password is weak" }
  )
  password: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
