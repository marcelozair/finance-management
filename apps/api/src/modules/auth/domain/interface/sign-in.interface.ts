import { UserDTO } from 'src/modules/user/domain/dto/user.dto';

export interface SignInRespose {
  authorization: string;
  user: UserDTO;
}
