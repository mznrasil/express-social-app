export class BadRequestError extends Error {
  constructor(
    public readonly err: {
      message: string;
    }
  ) {
    super(err.message);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends Error {
  constructor(
    public readonly err: {
      message: string;
    }
  ) {
    super(err.message);
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends Error {
  constructor(
    public readonly err: {
      message: string;
    }
  ) {
    super(err.message);
    this.name = "InternalServerError";
  }
}
