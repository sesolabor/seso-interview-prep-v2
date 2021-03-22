import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, UpdateDateColumn } from "typeorm";
import { otpStatus } from "../constants";

@Entity()
class UserPasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "timestamp", nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "enum", enum: otpStatus, nullable: false })
  status: otpStatus;
}

export default UserPasswordResetToken;
