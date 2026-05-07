import { Email } from '../vo/Email';
import { FullName } from '../vo/FullName';

export class User {
  private readonly id: number;
  private readonly name: FullName;
  private readonly email: Email;
  private readonly phone: string;
  private readonly secret: string;
  private readonly password: string;

  constructor(
    id: number,
    name: FullName,
    email: Email,
    phone: string,
    secret: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.secret = secret;
    this.password = password;
  }

  static forCreate(
    name: FullName,
    email: Email,
    phone: string,
    secret: string,
    password: string,
  ) {
    return new User(0, name, email, phone, secret, password);
  }

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name.getValue();
  }

  get _email() {
    return this.email.getValue();
  }

  get _password() {
    return this.password;
  }

  get _phone() {
    return this.phone;
  }

  get _secret() {
    return this.secret;
  }
}
