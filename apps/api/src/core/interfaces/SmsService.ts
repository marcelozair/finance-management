interface SmsOptions {
  to: string;
  body: string;
}

interface ISmsService {
  sendSms(options: SmsOptions): Promise<void>;
}

export { SmsOptions, ISmsService };
