import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Turn } from "./turn.entity";

@Entity()
export class Cash {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  cashdescription: string;

  @Column()
  active: boolean;

  /**
   * -
   */
  @OneToMany(() => Turn, (turn) => turn.cash)
  turns: Turn[];
}
