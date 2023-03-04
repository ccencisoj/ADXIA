import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const PersonDocumentValidator = Joi.string().min(4).max(32);

interface PersonDocumentProps {
  value: string;
}

export class PersonDocument extends ValueObject<PersonDocumentProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PersonDocumentProps) {
    super(props);
  }

  public static create = (value: string): Result<PersonDocument> => {
    const validationResult = PersonDocumentValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<PersonDocument>(validationResult.error.message);
    }

    const personDocument = new PersonDocument({value});

    return Result.ok<PersonDocument>(personDocument);
  }
}
