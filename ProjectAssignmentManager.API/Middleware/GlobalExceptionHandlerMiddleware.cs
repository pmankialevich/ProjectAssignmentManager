using ProjectAssignmentManager.API.Common;
using System.Text.Json;

namespace ProjectAssignmentManager.API.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = exception switch
        {
            NotFoundException notFoundEx => (
                StatusCodes.Status404NotFound,
                ApiResponse<object>.FailureResponse(notFoundEx.Message)
            ),
            DuplicateException duplicateEx => (
                StatusCodes.Status409Conflict,
                ApiResponse<object>.FailureResponse(duplicateEx.Message)
            ),
            ValidationException validationEx => (
                StatusCodes.Status400BadRequest,
                ApiResponse<object>.FailureResponse(validationEx.Message, validationEx.Errors)
            ),
            BusinessRuleException businessEx => (
                StatusCodes.Status400BadRequest,
                ApiResponse<object>.FailureResponse(businessEx.Message)
            ),
            _ => (
                StatusCodes.Status500InternalServerError,
                ApiResponse<object>.FailureResponse("An internal server error occurred")
            )
        };

        context.Response.StatusCode = response.Item1;
        return context.Response.WriteAsync(JsonSerializer.Serialize(response.Item2));
    }
}
