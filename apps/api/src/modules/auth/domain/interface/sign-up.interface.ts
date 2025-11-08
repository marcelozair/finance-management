import { UserDTO } from 'src/modules/user/domain/dto/user.dto';

export interface SignUpResponse {
  user: UserDTO;
  secret: string;
}
