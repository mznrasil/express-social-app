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
import { User } from "./User.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  @Index()
  title: string;

  @Column({ type: "varchar", length: 1000 })
  content: string;

  @Column("text", { array: true, nullable: true })
  @Index()
  tags: string[];

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "user_id" })
  @Index()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
