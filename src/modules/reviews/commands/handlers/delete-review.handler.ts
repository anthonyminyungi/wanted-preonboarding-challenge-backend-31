import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReviewCommand } from '../impl/delete-review.command';
import { ReviewsRepository } from '../../reviews.repository';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler
  implements ICommandHandler<DeleteReviewCommand>
{
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute(command: DeleteReviewCommand): Promise<void> {
    const { reviewId, userId } = command;
    const review = await this.reviewsRepository.getReview(reviewId);
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    if (review.userId !== userId) {
      throw new ForbiddenException(
        '다른 사용자의 리뷰를 삭제할 권한이 없습니다.',
      );
    }

    await this.reviewsRepository.deleteReview(reviewId);
  }
}
