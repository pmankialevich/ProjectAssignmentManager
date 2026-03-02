using ProjectAssignmentManager.API.Models;

namespace ProjectAssignmentManager.API.DTOs;

public record CreateDeveloperDto(
    string Name,
    string Email,
    SeniorityLevel SeniorityLevel
);

public record UpdateDeveloperDto(
    string Name,
    string Email,
    SeniorityLevel SeniorityLevel
);
