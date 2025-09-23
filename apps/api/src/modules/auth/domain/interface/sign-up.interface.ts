import { UserDTO } from 'src/modules/user/domain/dto/user.dto';

export interface SignUpResponse {
  authorization: string;
  user: UserDTO;
}
