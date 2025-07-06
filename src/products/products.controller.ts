import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private readonly products = [
    { id: 1, name: 'Keyboard', price: 29.99 },
    { id: 2, name: 'Mouse', price: 19.99 },
  ];

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }
}
