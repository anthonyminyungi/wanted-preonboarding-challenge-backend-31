import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReviewCommand } from '../impl/create-review.command';
import { ReviewsRepository } from '../../reviews.repository';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler
  implements ICommandHandler<CreateReviewCommand>
{
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute(command: CreateReviewCommand) {
    const { productId, userId, dto } = command;
    return this.reviewsRepository.createReview(productId, userId, dto);
  }
}
