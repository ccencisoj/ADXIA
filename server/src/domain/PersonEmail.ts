import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const PersonEmailValidator = Joi.string().email({tlds: false});

interface PersonEmailProps {
  value: string;
}

export class PersonEmail extends ValueObject<PersonEmailProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PersonEmailProps) {
    super(props);
  }

  public static create = (value: string): Result<PersonEmail> => {
    const validationResult = PersonEmailValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<PersonEmail>(validationResult.error.message);
    }

    const personEmail = new PersonEmail({value});

    return Result.ok<PersonEmail>(personEmail);
  }
}
