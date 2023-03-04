import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const PersonNameValidator = Joi.string().min(4).max(32);

interface PersonNameProps {
  value: string;
}

export class PersonName extends ValueObject<PersonNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PersonNameProps) {
    super(props);
  }

  public static create = (value: string): Result<PersonName> => {
    const validationResult = PersonNameValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<PersonName>(validationResult.error.message);
    }

    const personName = new PersonName({value});

    return Result.ok<PersonName>(personName);
  }
}
