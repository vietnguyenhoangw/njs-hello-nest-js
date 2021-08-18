import { Injectable, NotFoundException } from '@nestjs/common';

// modal
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = new Date().getTime().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProduct(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Can not find product');
    }
    return product;
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const productInfo = this.findProductIndex(id);
    const updateProduct = { ...productInfo.product };
    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[productInfo.productIndex] = updateProduct;
    return this.products[productInfo.productIndex];
  }

  findProductIndex(id: string): any {
    const productIndex = this.products.findIndex((p) => p.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Can not find product');
    }
    return { product, productIndex };
  }
}
