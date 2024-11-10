import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [CommonModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [],
})
export class InvoiceModule {}
