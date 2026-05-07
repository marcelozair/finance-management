import { UserDTO } from 'src/modules/users/presentation/dto/user.dto';

export interface SignUpResponseDTO {
  user: UserDTO;
  secret: string;
}
