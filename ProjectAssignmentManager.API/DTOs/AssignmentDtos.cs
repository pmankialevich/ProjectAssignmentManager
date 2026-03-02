namespace ProjectAssignmentManager.API.DTOs;

public record AssignDeveloperToProjectDto(
    Guid DeveloperId,
    Guid ProjectId
);
