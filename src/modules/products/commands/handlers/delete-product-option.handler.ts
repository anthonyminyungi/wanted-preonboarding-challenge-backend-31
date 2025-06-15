import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductOptionCommand } from '../impl/delete-product-option.command';
import { ProductsRepository } from '../../products.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductOptionCommand)
export class DeleteProductOptionHandler
  implements ICommandHandler<DeleteProductOptionCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(command: DeleteProductOptionCommand): Promise<void> {
    const { productId, optionId } = command;
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    await this.productsRepository.deleteProductOption(optionId);
  }
}
