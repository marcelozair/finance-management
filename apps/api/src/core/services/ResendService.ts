import { Resend } from 'resend';
import { IMailOptions, IMailService } from '../interfaces/MailService';

export class ResendService implements IMailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend('re_Xa8zLTvi_NKEhNUum13qbC1qbwcF2Z1zG');
  }

  /**
   * Send mail using resend.mail service
   * @param options Mail options to be send
   */
  async sendMail(options: IMailOptions): Promise<boolean> {
    try {
      const emailResponse = await this.resend.emails.send({
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.content,
      });

      if (emailResponse.error) {
        console.error(
          `[Resend] Error sending mail to ${options.to}:  ${emailResponse.error.name} ${emailResponse.error.message}`,
        );

        return false;
      }
    } catch (error) {
      console.error(`[Resend] Error sending mail to ${options.to}: ${error}`);
      return false;
    }

    return true;
  }
}
