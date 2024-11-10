import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { GeneralResponseDto } from '../common/dtos/general-response.dto';
import { User } from '../common/decorators/auth.decorator';
import { UserDto } from '../common/dtos/user.dto';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: GeneralResponseDto })
  async getInvoices(@User() user: UserDto): Promise<GeneralResponseDto> {
    const invoices = await this.invoiceService.getInvoices(user);
    return new GeneralResponseDto().setData(invoices);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateInvoiceDto })
  @ApiOkResponse({ type: GeneralResponseDto })
  async createInvoice(
    @User() user: UserDto,
    @Body() dto: CreateInvoiceDto,
  ): Promise<GeneralResponseDto> {
    await this.invoiceService.createInvoice(user, dto);
    return new GeneralResponseDto();
  }
}
