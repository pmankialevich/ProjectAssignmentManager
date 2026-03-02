using Microsoft.AspNetCore.Mvc;
using ProjectAssignmentManager.API.Services;
using ProjectAssignmentManager.API.DTOs;
using ProjectAssignmentManager.API.Common;

namespace ProjectAssignmentManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevelopersController : ControllerBase
{
    private readonly IDeveloperService _developerService;

    public DevelopersController(IDeveloperService developerService)
    {
        _developerService = developerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var developers = await _developerService.GetAllDevelopersAsync();
        return Ok(ApiResponse<object>.SuccessResponse(developers));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var developer = await _developerService.GetDeveloperByIdAsync(id);
        return Ok(ApiResponse<object>.SuccessResponse(developer));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDeveloperDto dto)
    {
        var developer = await _developerService.CreateDeveloperAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = developer.Id }, 
            ApiResponse<object>.SuccessResponse(developer, "Developer created successfully"));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateDeveloperDto dto)
    {
        var developer = await _developerService.UpdateDeveloperAsync(id, dto);
        return Ok(ApiResponse<object>.SuccessResponse(developer, "Developer updated successfully"));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _developerService.DeleteDeveloperAsync(id);
        return Ok(ApiResponse<object>.SuccessResponse(null, "Developer deleted successfully"));
    }

    [HttpGet("by-project/{projectId:guid}")]
    public async Task<IActionResult> GetByProject(Guid projectId)
    {
        var developers = await _developerService.GetDevelopersByProjectAsync(projectId);
        return Ok(ApiResponse<object>.SuccessResponse(developers));
    }
}
