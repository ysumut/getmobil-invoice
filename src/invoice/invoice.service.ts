import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UserDto } from '../common/dtos/user.dto';

@Injectable()
export class InvoiceService {
  constructor(private prismaService: PrismaService) {}

  async getInvoices(user: UserDto) {
    const invoices = await this.prismaService.invoice.findMany({
      select: {
        id: true,
        orderId: true,
        totalAmount: true,
        payload: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { userId: user.id },
    });
    return invoices;
  }

  async createInvoice(user: UserDto, dto: CreateInvoiceDto): Promise<void> {
    await this.prismaService.invoice.create({
      data: {
        userId: user.id,
        orderId: dto.orderId,
        totalAmount: dto.totalAmount,
        payload: dto.payload,
      },
    });
  }
}
