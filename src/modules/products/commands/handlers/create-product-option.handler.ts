import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductOptionCommand } from '../impl/create-product-option.command';
import { ProductsRepository } from '../../products.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateProductOptionResponseData } from '../../dto/product-option.dto';

@CommandHandler(CreateProductOptionCommand)
export class CreateProductOptionHandler
  implements ICommandHandler<CreateProductOptionCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    command: CreateProductOptionCommand,
  ): Promise<CreateProductOptionResponseData> {
    const { productId, dto } = command;
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    return this.productsRepository.createProductOption(dto);
  }
}
