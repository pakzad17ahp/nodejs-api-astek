import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../user/user.model";

class PermissionSet {
  create!: boolean;
  update!: boolean;
  view!: boolean;
}

class UserPermissionSet extends PermissionSet {
  Assign!: boolean;
}

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({
    type: "jsonb",
    default: { create: false, update: false, view: false, Assign: false },
  })
  account!: UserPermissionSet;

  @Column({
    type: "jsonb",
    default: { create: false, update: false, view: false },
  })
  product!: PermissionSet;

  @Column({
    type: "jsonb",
    default: { create: false, update: false, view: false },
  })
  role!: PermissionSet;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
