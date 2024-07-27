export class UserStatusEntity {
  constructor(
    public statusId: string,
    public description: string | null // Puede ser null si no hay descripción
  ) {}
}
