import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from "typeorm";

import Enterprise from "./enterprise";
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true, select: false })
  password: string;

  @Index({ unique: true })
  @Column({ type: "text", nullable: true })
  email: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar" })
  jobTitle: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.employees)
  enterprise: Enterprise;
}

export default User;
