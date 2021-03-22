import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { orgTypes } from "../constants";
import User from "./user";

@Entity()
class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.enterprise, { nullable: true })
  employees: User[];

  @Column({ type: "varchar" })
  legalName: string;

  @Column({ type: "varchar", nullable: true })
  fein: string;

  @Column({ type: "enum", enum: orgTypes, nullable: true })
  orgType: orgTypes;

  @Column({ type: "varchar", nullable: true })
  agreementFormSignature: string;

  @Column({ type: "boolean", nullable: true })
  isAgreedToSignElectronically: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  agreementFormSigningUser: User;

  @CreateDateColumn({ type: "timestamp", nullable: true, default: null })
  dateAgreementFormSigned: Date;

  @Column({ type: "text", nullable: true })
  addressDescription?: string;

  @Column({ type: "varchar", nullable: true })
  addressPlaceId?: string;

  @Column({ type: "int", nullable: true })
  netIncome?: number;

  @Column({ type: "int", nullable: true })
  grossIncome?: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default Enterprise;
