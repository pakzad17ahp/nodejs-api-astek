import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "../role/role.model";

@Entity({ name: "permissions" })
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  resource!: string;

  @Column()
  action!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
