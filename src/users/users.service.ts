import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, login: true, email: true, avatarUrl: true, role: true },
      orderBy: { login: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } }) ?? null;
  }

  async findByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } }) ?? null;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } }) ?? null;
  }

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: { ...dto, password: hash, role: dto.role ?? 'CLIENT' },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}