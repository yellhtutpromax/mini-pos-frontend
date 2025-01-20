
export function successResponse({status = 200, message = "Request was successful", data = []}) {
  return {
    status: status,
    message: message, // Optional, default is "Request was successful"
    data: data,       // Contains the actual data returned by the API
  };
}

export function errorResponse({status = 500, message = "Internal server error occurred !", data = null}) {
  return {
    status: status, // Default to 400, but you can adjust based on the error (e.g., 401 for Unauthorized)
    message: message, // Custom error message, defaults to "An error occurred"
    errors: data,   // Contains the error details
  };
}

