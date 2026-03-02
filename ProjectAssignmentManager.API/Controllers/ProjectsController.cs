using Microsoft.AspNetCore.Mvc;
using ProjectAssignmentManager.API.Services;
using ProjectAssignmentManager.API.DTOs;
using ProjectAssignmentManager.API.Common;

namespace ProjectAssignmentManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectService.GetAllProjectsAsync();
        return Ok(ApiResponse<object>.SuccessResponse(projects));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        return Ok(ApiResponse<object>.SuccessResponse(project));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProjectDto dto)
    {
        var project = await _projectService.CreateProjectAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, 
            ApiResponse<object>.SuccessResponse(project, "Project created successfully"));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProjectDto dto)
    {
        var project = await _projectService.UpdateProjectAsync(id, dto);
        return Ok(ApiResponse<object>.SuccessResponse(project, "Project updated successfully"));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _projectService.DeleteProjectAsync(id);
        return Ok(ApiResponse<object>.SuccessResponse(null, "Project deleted successfully"));
    }

    [HttpGet("by-developer/{developerId:guid}")]
    public async Task<IActionResult> GetByDeveloper(Guid developerId)
    {
        var projects = await _projectService.GetProjectsByDeveloperAsync(developerId);
        return Ok(ApiResponse<object>.SuccessResponse(projects));
    }
}
