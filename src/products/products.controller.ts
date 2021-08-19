import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // using HttpCode for change code return
  // default for post is 201
  @HttpCode(200)
  addProducts(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): any {
    const newProduct = this.productsService.insertProduct(
      title,
      description,
      price,
    );
    return newProduct;
  }

  // another way to define body with modal
  @Post('/product-modal')
  addProductWModal(@Body() product: Product): any {
    const newProduct = this.productsService.insertProduct(
      product.title,
      product.description,
      product.price,
    );
    return newProduct;
  }

  @Get()
  // using asynchronous
  async getAllProducts(): Promise<any> {
    const allProducts = this.productsService.getProducts();
    return { products: allProducts };
  }

  @Get(':id')
  // using route parameters id
  getProduct(@Param('id') id: string): any {
    const product = this.productsService.getProduct(id);
    return product;
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): any {
    const product = this.productsService.updateProduct(
      id,
      title,
      description,
      price,
    );
    return product;
  }
}
