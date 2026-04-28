import { Controller, Get, Post, Put, Delete, Patch, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { WaterBodiesService } from './water-bodies.service';
import { CreateWaterBodyDto, UpdateWaterBodyDto } from './dto/water-body.dto';
import { CreateMeasurementDto } from './dto/measurement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('water-bodies')
export class WaterBodiesController {
  constructor(private readonly waterBodiesService: WaterBodiesService) {}

  @Get()
  findAll() {
    return this.waterBodiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.waterBodiesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Post()
  create(@Body() dto: CreateWaterBodyDto) {
    return this.waterBodiesService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWaterBodyDto) {
    return this.waterBodiesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.waterBodiesService.remove(id);
  }

  @Get(':id/measurements')
  getMeasurements(@Param('id', ParseIntPipe) id: number) {
    return this.waterBodiesService.getMeasurements(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Post(':id/measurements')
  addMeasurement(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateMeasurementDto) {
    return this.waterBodiesService.addMeasurement(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(['ADMIN'])
  @Patch(':id/measurements/:measurementId')
  updateMeasurement(
    @Param('id', ParseIntPipe) id: number,
    @Param('measurementId', ParseIntPipe) measurementId: number,
    @Body() dto: CreateMeasurementDto,
  ) {
    return this.waterBodiesService.updateMeasurement(id, measurementId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Delete(':id/measurements/:measurementId')
  removeMeasurement(
    @Param('id', ParseIntPipe) id: number,
    @Param('measurementId', ParseIntPipe) measurementId: number,
  ) {
    return this.waterBodiesService.removeMeasurement(id, measurementId);
  }
}