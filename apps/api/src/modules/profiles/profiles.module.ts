import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from './presentation/ProfileController';
import { GetAllProfilesUseCase } from './application/useCases/GetAllProfilesUseCase';
import { UpdateProfileUseCase } from './application/useCases/UpdateProfileUseCase';
import { ProfileRepository } from './domain/interfaces/ProfileRepository';
import { ProfileRepositoryImpl } from 'src/shared/infrastructure/database/repositories/ProfileRepositoryImpl';
import { ProfileEntity } from 'src/shared/infrastructure/database/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [
    {
      provide: ProfileRepository,
      useClass: ProfileRepositoryImpl,
    },
    {
      provide: GetAllProfilesUseCase,
      useFactory: (profileRepo: ProfileRepository) => {
        return new GetAllProfilesUseCase(profileRepo);
      },
      inject: [ProfileRepository],
    },
    {
      provide: UpdateProfileUseCase,
      useFactory: (profileRepo: ProfileRepository) => {
        return new UpdateProfileUseCase(profileRepo);
      },
      inject: [ProfileRepository],
    },
  ],
})
export class ProfilesModule {}
