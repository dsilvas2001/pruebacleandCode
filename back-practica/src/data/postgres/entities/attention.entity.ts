import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "./client.entity";
import { AttentionType } from "./attentiontype.entity";
import { Turn } from "./turn.entity";
import { AttentionStatus } from "./attentionstatus.entity";

@Entity()
export class Attention {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Turn, (turn) => turn.attentions)
  turn: Turn;

  @Column()
  client_clientid: number;

  /**
   *
   */
  @ManyToOne(() => AttentionType, (attentionType) => attentionType.attentions)
  attentionType: AttentionType;

  /**
   *
   */
  @ManyToOne(
    () => AttentionStatus,
    (attentionStatus) => attentionStatus.attentions
  )
  attentionStatus: AttentionStatus;
  /**
   *
   */
  @ManyToOne(() => Client, (client) => client.attentions)
  client: Client;
}
