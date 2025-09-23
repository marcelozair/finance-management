import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthContextModule } from '../auth-context/auth-context.module';

@Module({
  providers: [UserService],
  imports: [AuthContextModule],
})
export class UserModule {}
