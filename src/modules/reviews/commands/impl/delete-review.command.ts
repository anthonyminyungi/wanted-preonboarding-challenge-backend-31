export class DeleteReviewCommand {
  constructor(
    public readonly reviewId: number,
    public readonly userId: number,
  ) {}
}
