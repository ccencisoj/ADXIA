import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const PersonPhoneNumberValidator = Joi.string().min(4).max(32);

interface PersonPhoneNumberProps {
  value: string;
}

export class PersonPhoneNumber extends ValueObject<PersonPhoneNumberProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PersonPhoneNumberProps) {
    super(props);
  }

  public static create = (value: string): Result<PersonPhoneNumber> => {
    const validationResult = PersonPhoneNumberValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<PersonPhoneNumber>(validationResult.error.message);
    }

    const personPhoneNumber = new PersonPhoneNumber({value});

    return Result.ok<PersonPhoneNumber>(personPhoneNumber);
  }
}
