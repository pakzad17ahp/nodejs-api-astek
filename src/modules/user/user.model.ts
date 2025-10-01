import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Role } from "../role/role.model";
import * as bcrypt from "bcrypt";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  is_super_admin!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at!: Date;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({ name: "user_roles" })
  roles!: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
