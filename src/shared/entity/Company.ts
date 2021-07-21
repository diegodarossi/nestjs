import { Entity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Company {
  constructor() {
    this.companyId = uuidv4();
  }

  companyId: string;

  code: string;

  corporateName: string;
}