/**
 * @openapi
 * components:
 *  schemas:
 *    TokensSchema:
 *      type: object
 *      properties:
 *        tokens:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *            refreshToken:
 *              type: string
 *  examples:
 *    TokenCreatedExample:
 *      summary: Token created
 *      value:
 *        data: {
 *          tokens: {
 *            accessToken: "<access_token>",
 *            refreshToken: "<refresh_token>"
 *          }
 *        }
 *        message: "Successful"
 *        status: 200
 */
