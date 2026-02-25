import { UserDTO } from 'src/modules/users/presentation/dto/user.dto';

export type IAuthorizationTypes = 'Bearer';

export interface SessionDetailsDTO {
  sessionId: string;
  authorizationToken: string;
  authorizationType: IAuthorizationTypes;
}

export interface UserSessionDTO {
  user: UserDTO;
  session: SessionDetailsDTO;
}
