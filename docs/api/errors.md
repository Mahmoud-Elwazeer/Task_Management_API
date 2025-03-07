# Error Codes

The following error codes may be returned by the API. These errors can help you troubleshoot and understand what went wrong with a request.

## General Errors

- **400 Bad Request**: The request was invalid or cannot be processed.
  - Example: "from" parameter is not a valid date..

- **404 Not Found**: The requested resource could not be found.
  - Example: Not Found Metadata.

- **500 Internal Server Error**: A generic error indicating a problem with the server.
  - Example: Server is temporarily unavailable.

## Example Response:
```json
{
    "status": "fail",
    "message": "No data found for the selected time range. Please adjust the date range and try again"
}
```
### Key Notes:
* ```status: "error"``` corresponds to internal server errors (HTTP 500), meaning the problem is on the server side.
* ```status: "fail"``` corresponds to client-side errors (HTTP 4xx), meaning the issue lies with the request made by the user.