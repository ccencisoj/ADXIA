import bcrypt from 'bcrypt';
import { IHashService } from "../../application";

export class HashService implements IHashService {
  public hash = (value: string): string => {
    const hash = bcrypt.hashSync(value, 8);

    return hash;
  }

  public equals = (hashValue: string, value: string): boolean => {
    const areEquals = bcrypt.compareSync(value, hashValue);

    return areEquals;
  }
}
