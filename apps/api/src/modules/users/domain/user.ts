export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  secret: string;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    secret: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.secret = secret;
  }
}
