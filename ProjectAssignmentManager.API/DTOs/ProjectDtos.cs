namespace ProjectAssignmentManager.API.DTOs;

public record CreateProjectDto(
    string Name,
    string? Description
);

public record UpdateProjectDto(
    string Name,
    string? Description
);
