import { v4 as uuidv4 } from 'uuid';

export class Entity<T> {
  protected readonly _id: string;
  public readonly props: T;
  
  public constructor(props: T, id?: string) {
    this._id = id ? id : uuidv4();
    this.props = props;
  }

  public equals = (entity: Entity<any>)=> {
    return this._id === entity._id;
  }
}
