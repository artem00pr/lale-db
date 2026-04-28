import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWaterBodyDto, UpdateWaterBodyDto } from './dto/water-body.dto';
import { CreateMeasurementDto } from './dto/measurement.dto';

@Injectable()
export class WaterBodiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.waterBody.findMany({
      include: { 
        passport: true, 
        measurements: { orderBy: { date: 'desc' } } 
      },
    });
  }

  async findOne(id: number) {
    const wb = await this.prisma.waterBody.findUnique({
      where: { id },
      include: { 
        passport: true, 
        measurements: { orderBy: { date: 'desc' } } 
      },
    });
    if (!wb) throw new NotFoundException('Water body not found');
    return wb;
  }

  async create(dto: CreateWaterBodyDto) {
    const { passport, ...data } = dto;

    return this.prisma.waterBody.create({
      data: {
        ...data,
        passport: passport ? { create: passport } : undefined,
      },
      include: { passport: true, measurements: true },
    });
  }

  async update(id: number, dto: UpdateWaterBodyDto) {
    const { passport, ...data } = dto;

    return this.prisma.waterBody.update({
      where: { id },
      data: {
        ...data,
        passport: passport ? { 
          upsert: { 
            create: passport,
            update: passport 
          } 
        } : undefined,
      },
      include: { passport: true, measurements: true },
    });
  }

  remove(id: number) {
    return this.prisma.waterBody.delete({ where: { id } });
  }

  // ====================== Measurements ======================
  async addMeasurement(id: number, dto: CreateMeasurementDto) {
    const wb = await this.prisma.waterBody.findUnique({ where: { id } });
    if (!wb) throw new NotFoundException('Water body not found');

    return this.prisma.measurement.create({
      data: { ...dto, waterBodyId: id },
    });
  }

  getMeasurements(id: number) {
    return this.prisma.measurement.findMany({
      where: { waterBodyId: id },
      orderBy: { date: 'desc' },
    });
  }

  async updateMeasurement(id: number, measurementId: number, dto: CreateMeasurementDto) {
    const m = await this.prisma.measurement.findFirst({ 
      where: { id: measurementId, waterBodyId: id } 
    });
    if (!m) throw new NotFoundException('Measurement not found');

    return this.prisma.measurement.update({ 
      where: { id: measurementId }, 
      data: dto 
    });
  }

  async removeMeasurement(id: number, measurementId: number) {
    const m = await this.prisma.measurement.findFirst({ 
      where: { id: measurementId, waterBodyId: id } 
    });
    if (!m) throw new NotFoundException('Measurement not found');

    return this.prisma.measurement.delete({ where: { id: measurementId } });
  }
}