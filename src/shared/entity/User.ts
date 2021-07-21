import { Entity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  constructor() {
    this.userId = uuidv4();
  }

  userId: string;

  login: string;

  email: string;

  name: string;
}