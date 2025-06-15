export class DeleteProductOptionCommand {
  constructor(
    public readonly productId: number,
    public readonly optionId: number,
  ) {}
}
