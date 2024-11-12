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

export enum TokenStatus {
  ACTIVE = "active",
  USED = "used",
  REVOKED = "revoked"
}

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  @Index()
  userId: number;

  @Column({ name: "refresh_token", unique: true })
  @Index()
  refreshToken: string;

  @Column({ name: "expires_at", type: "timestamp" })
  expiresAt: Date;

  @Column({ type: "enum", enum: TokenStatus, default: TokenStatus.ACTIVE })
  status: TokenStatus;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
