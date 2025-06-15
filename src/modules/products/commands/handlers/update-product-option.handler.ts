import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductOptionCommand } from '../impl/update-product-option.command';
import { ProductsRepository } from '../../products.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductOptionResponseData } from '../../dto/product-option.dto';

@CommandHandler(UpdateProductOptionCommand)
export class UpdateProductOptionHandler
  implements ICommandHandler<UpdateProductOptionCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    command: UpdateProductOptionCommand,
  ): Promise<UpdateProductOptionResponseData> {
    const { productId, optionId, dto } = command;
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    return this.productsRepository.updateProductOption(optionId, dto);
  }
}
