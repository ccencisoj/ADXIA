export interface IHashService {
  hash(value: string): string;
  equals(hashValue: string, value: string): boolean;
}
