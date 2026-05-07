import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  ProfileRepository,
  UpdateProfileData,
} from 'src/modules/profiles/domain/interfaces/ProfileRepository';

import { ProfileEntity } from '../entities/ProfileEntity';
import { Profile } from 'src/modules/profiles/domain/entities/Profile';
import { ProfileMapper } from 'src/modules/profiles/application/mappers/ProfileMapper';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  @InjectRepository(ProfileEntity)
  private readonly repository: Repository<ProfileEntity>;

  async save(profile: Profile): Promise<Profile> {
    const entity = this.repository.create({
      name: profile._name,
      color: profile._color,
      userId: profile._userId,
      currency: profile._currency,
    });

    const newProfile = await this.repository.save(entity);

    return ProfileMapper.entityToDomain(newProfile);
  }

  async findById(id: number): Promise<Profile | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return ProfileMapper.entityToDomain(entity);
  }

  async findAllByUserId(userId: number): Promise<Profile[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map((entity) => ProfileMapper.entityToDomain(entity));
  }

  async update(id: number, data: UpdateProfileData): Promise<Profile> {
    await this.repository.update({ id }, data);
    const updatedEntity = await this.repository.findOne({ where: { id } });
    if (!updatedEntity) {
      throw new Error(`Profile with id ${id} not found after update`);
    }
    return ProfileMapper.entityToDomain(updatedEntity);
  }
}
