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

export class ConflictError extends Error {
  constructor(
    public readonly err: {
      message: string;
    }
  ) {
    super(err.message);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends Error {
  constructor(
    public readonly err: {
      message: string;
    }
  ) {
    super(err.message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(
    public readonly err: {
      message: string;
    }
  ) {
    super(err.message);
    this.name = "ForbiddenError";
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
