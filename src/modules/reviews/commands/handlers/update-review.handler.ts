import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateReviewCommand } from '../impl/update-review.command';
import { ReviewsRepository } from '../../reviews.repository';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler
  implements ICommandHandler<UpdateReviewCommand>
{
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute(command: UpdateReviewCommand) {
    const { reviewId, userId, dto } = command;
    const review = await this.reviewsRepository.getReview(reviewId);
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    if (review.userId !== userId) {
      throw new ForbiddenException(
        '다른 사용자의 리뷰를 수정할 권한이 없습니다.',
      );
    }

    return this.reviewsRepository.updateReview(reviewId, dto);
  }
}
