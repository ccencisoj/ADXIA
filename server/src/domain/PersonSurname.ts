import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const PersonSurnameValidator = Joi.string().min(4).max(32);

interface PersonSurnameProps {
  value: string;
}

export class PersonSurname extends ValueObject<PersonSurnameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PersonSurnameProps) {
    super(props);
  }

  public static create = (value: string): Result<PersonSurname> => {
    const validationResult = PersonSurnameValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<PersonSurname>(validationResult.error.message);
    }

    const personSurname = new PersonSurname({value});

    return Result.ok<PersonSurname>(personSurname);
  }
}
