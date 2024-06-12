class ApiResponse {
    constructor(statusCode, data, message = "success" , sucess) {
      this.statusCode = statusCode;
      this.data = data;
      this.success = sucess; // Corrected typo from `sucess` to `success`
    }
  }

  export default ApiResponse;

  