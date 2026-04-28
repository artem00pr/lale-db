import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    const [userCount, waterBodyCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.waterBody.count(),
    ]);

    return {
      message: "✅ Lale Backend is running successfully!",
      status: "ok",
      version: "1.0",
      statistics: {
        totalUsers: userCount,
        totalWaterBodies: waterBodyCount,
      },
      description: "Geoportal of water bodies in North Kazakhstan Region",
      timestamp: new Date().toISOString()
    };
  }
}