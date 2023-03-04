export class Result<T> {
  private readonly _value: T;
  private readonly _error: T|String;
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;

  public constructor(isSuccess: boolean, value?: T, error?: T|String) {
    this._value = value;
    this._error = error;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
  }

  public getValue = ()=> {
    return this._value;
  }

  public getError = ()=> {
    return this._error;
  }

  public static ok = <U>(value?: U): Result<U> => {
    return new Result<U>(true, value, null);
  }

  public static fail = <U>(error?: string): Result<U> => {
    return new Result<U>(false, null, error);
  }

  public static combine = (results: Result<any>[]): Result<any> => {
    for(let result of results) {
      if(result.isFailure) return result;
    }
    return Result.ok();
  }
}
