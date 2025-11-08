export interface IMailService {
  sendMail(options: IMailOptions): Promise<boolean>;
}

export interface IMailOptions {
  to: string;
  from: string;
  subject: string;
  content: string;
}
