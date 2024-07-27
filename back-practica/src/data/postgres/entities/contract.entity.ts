import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";
import { Client } from "./client.entity";
import { MethodPayment } from "./methodpayment.entity";
import { StatusContract } from "./statuscontract.entity";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  contractid: number;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  startdate: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  enddate: Date;
  /**
   *
   */

  @ManyToOne(() => Service, (service) => service.contracts)
  service: Service;

  /**
   *
   */
  @ManyToOne(() => StatusContract, (contractStatus) => contractStatus.contracts)
  contractStatus: StatusContract;
  /**
   *
   */
  @ManyToOne(() => Client, (client) => client.contracts)
  client: Client;
  /**
   *
   */
  @ManyToOne(() => MethodPayment, (methodPayment) => methodPayment.contracts)
  methodPayment: MethodPayment;
}
