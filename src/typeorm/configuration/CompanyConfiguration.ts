import { Domain } from "src/shared/Domain";
import { Company } from "src/shared/entity/Company";
import { EntitySchema } from "typeorm";

export const CompanyConfiguration = new EntitySchema<Company>({
    name: 'Company',
    tableName: 'Company',
    columns: {
      companyId: {
        type: "uuid",
        primary: true,
      },
      corporateName: {
        type: "varchar",
        length: Domain.descriptionMax,
      },
      code: {
        type: "varchar",
        length: Domain.descriptionMax,
      },
    },
  });