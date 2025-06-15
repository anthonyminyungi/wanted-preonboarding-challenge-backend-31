import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { GetReviewsRequestDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async getReviews(productId: number, query: GetReviewsRequestDto) {
    const items = await this.reviewsRepository.getReviews(productId, query);
    const summary = await this.reviewsRepository.getReviewsSummary(
      productId,
      query,
    );

    return {
      items,
      summary,
    };
  }
}
