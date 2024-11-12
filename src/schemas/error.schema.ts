/**
 * @openapi
 * components:
 *  schemas:
 *    ErrorSchema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *  examples:
 *    InternalServerErrorExample:
 *      summary: Internal Server Error
 *      value:
 *        message: "Internal Server Error"
 *        status: 500
 *    BadRequestErrorExample:
 *      summary: Bad Request Error
 *      value:
 *        message: "Bad Request"
 *        status: 400
 *    UnauthorizedErrorExample:
 *      summary: Unauthorized
 *      value:
 *        message: "Unauthorized"
 *        status: 401
 *    NotFoundErrorExample:
 *      summary: Not Found
 *      value:
 *        message: "Resource Not Found"
 *        status: 404
 *    ConflictErrorExample:
 *      summary: Conflict
 *      value:
 *        message: "Conflict"
 *        status: 409
 */
