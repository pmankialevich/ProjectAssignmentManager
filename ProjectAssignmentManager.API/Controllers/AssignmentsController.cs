using Microsoft.AspNetCore.Mvc;
using ProjectAssignmentManager.API.Services;
using ProjectAssignmentManager.API.DTOs;
using ProjectAssignmentManager.API.Common;

namespace ProjectAssignmentManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentService _assignmentService;

    public AssignmentsController(IAssignmentService assignmentService)
    {
        _assignmentService = assignmentService;
    }

    [HttpPost]
    public async Task<IActionResult> AssignDeveloperToProject([FromBody] AssignDeveloperToProjectDto dto)
    {
        await _assignmentService.AssignDeveloperToProjectAsync(dto);
        return Ok(ApiResponse<object>.SuccessResponse(null, "Developer assigned to project successfully"));
    }

    [HttpDelete]
    public async Task<IActionResult> RemoveDeveloperFromProject([FromQuery] Guid developerId, [FromQuery] Guid projectId)
    {
        await _assignmentService.RemoveDeveloperFromProjectAsync(developerId, projectId);
        return Ok(ApiResponse<object>.SuccessResponse(null, "Developer removed from project successfully"));
    }
}
