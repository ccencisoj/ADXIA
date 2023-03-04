export class ValueObject<T> {
  public readonly props: T;

  public constructor(props: T) {
    this.props = props;
  }
};
