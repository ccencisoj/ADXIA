import { v4 as uuidv4 } from 'uuid';
import { ValueObject } from './ValueObject';

interface UniqueEntityIdProps {
  value: string;
}

export class UniqueEntityId extends ValueObject<UniqueEntityIdProps> {

  public get value(): string {
    return this.props.value;
  }

  private constructor(props: UniqueEntityIdProps) {
    super({value: props.value ? props.value : uuidv4()});
  }

  public static create = (value?: string)=> {
    return new UniqueEntityId({value});
  }
}
