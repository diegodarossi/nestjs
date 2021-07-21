import { Domain } from "src/shared/Domain";
import { User } from "src/shared/entity/User";
import { EntitySchema } from "typeorm";

export const UserConfiguration = new EntitySchema<User>({
    name: 'User',
    tableName: 'User',
    columns: {
      userId: {
        type: "uuid",
        primary: true,
      },
      login: {
        type: "varchar",
        length: Domain.descriptionAvg,
      },
      email: {
        type: "varchar",
        length: Domain.descriptionMax,
      },
      name: {
        type: "varchar",
        length: Domain.descriptionMax,
      },
    },
  });