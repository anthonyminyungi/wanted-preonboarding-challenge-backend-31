import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../impl/delete-product.command';
import { ProductsRepository } from '../../products.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const { id } = command;
    const product = await this.productsRepository.getProduct(id);
    if (!product) {
      throw new NotFoundException('요청한 상품을 찾을 수 없습니다.');
    }
    await this.productsRepository.deleteProduct(id);
  }
}
