export class ClientEntity {
  constructor(
    public clientid: number,
    public name: string,
    public lastname: string,
    public identification: string,
    public email: string,
    public phonenumber: string,
    public address: string,
    public referenceaddress: string,
    public createdAt: Date
  ) {}
}
