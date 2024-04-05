class ApiResponse {
    constructor(statusCode, data, message = "success") {
      this.statusCode = statusCode;
      this.data = data;
      this.success = statusCode; // Corrected typo from `sucess` to `success`
    }
  }

  export default ApiResponse;

  