export const successResponse = (data) => {
      return {
            success: true,
            payload: data,
      }
}

export const errorResponse = (message, error = null) => {
      return {
            success: false,
            description: message,
            details: error,
      }
}

export const HTTP_STATUS = {
      OK: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      NOT_FOUND: 404,
      SERVER_ERROR: 500,
};

export class HttpError {

      constructor(description, status = 500, details = null) {

            this.description = description;
            this.status = status;
            this.details = details;

      }

}