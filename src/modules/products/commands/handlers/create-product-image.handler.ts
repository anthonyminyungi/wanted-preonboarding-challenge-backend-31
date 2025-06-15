import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductImageCommand } from '../impl/create-product-image.command';
import { ProductsRepository } from '../../products.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateProductImageResponseData } from '../../dto/product-image.dto';

@CommandHandler(CreateProductImageCommand)
export class CreateProductImageHandler
  implements ICommandHandler<CreateProductImageCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    command: CreateProductImageCommand,
  ): Promise<CreateProductImageResponseData> {
    const { productId, dto } = command;
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    return this.productsRepository.createProductImage(productId, dto);
  }
}
