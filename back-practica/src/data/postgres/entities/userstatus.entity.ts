import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Device } from "./device.entity";

@Entity()
export class UserStatus {
  @PrimaryColumn({ type: "varchar", length: 3 })
  statusId: string;

  @Column({ length: 50, nullable: true })
  description: string;
  /**
   *
   */

  @OneToMany(() => User, (user) => user.userStatus)
  users: User[];
}
