import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
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

  @Get()
  getAllProducts(): any {
    const allProducts = this.productsService.getProducts();
    return { products: allProducts };
  }

  @Get(':id')
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
