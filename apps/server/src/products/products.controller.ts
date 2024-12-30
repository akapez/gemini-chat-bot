import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductRequest } from '@repo/types';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductRequest) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }
}
