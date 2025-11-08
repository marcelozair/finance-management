import { UserDTO } from 'src/modules/user/domain/dto/user.dto';

export type IAuthorizationTypes = 'Bearer';

export interface ISession {
  sessionId: string;
  authorizationToken: string;
  authorizationType: IAuthorizationTypes;
}

export interface ISessionUser {
  user: UserDTO;
  session: ISession;
}
