import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  calculateOrder(dto: CreateOrderDto) {
    // Fake prices: $10 per unit
    const total = dto.items.reduce((sum, item) => sum + item.quantity * 10, 0);
    return { total, currency: 'USD' };
  }
}
