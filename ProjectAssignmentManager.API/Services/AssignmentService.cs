using ProjectAssignmentManager.API.Models;
using ProjectAssignmentManager.API.DTOs;
using ProjectAssignmentManager.API.Repositories;
using ProjectAssignmentManager.API.Common;

namespace ProjectAssignmentManager.API.Services;

public interface IAssignmentService
{
    Task AssignDeveloperToProjectAsync(AssignDeveloperToProjectDto dto);
    Task RemoveDeveloperFromProjectAsync(Guid developerId, Guid projectId);
}

public class AssignmentService : IAssignmentService
{
    private readonly IRepository<Developer> _developerRepository;
    private readonly IRepository<Project> _projectRepository;
    private readonly IRepository<DeveloperProject> _assignmentRepository;

    public AssignmentService(
        IRepository<Developer> developerRepository,
        IRepository<Project> projectRepository,
        IRepository<DeveloperProject> assignmentRepository)
    {
        _developerRepository = developerRepository;
        _projectRepository = projectRepository;
        _assignmentRepository = assignmentRepository;
    }

    public async Task AssignDeveloperToProjectAsync(AssignDeveloperToProjectDto dto)
    {
        var developer = await _developerRepository.GetByIdAsync(dto.DeveloperId);
        if (developer == null)
            throw new NotFoundException($"Developer with ID {dto.DeveloperId} not found");

        var project = await _projectRepository.GetByIdAsync(dto.ProjectId);
        if (project == null)
            throw new NotFoundException($"Project with ID {dto.ProjectId} not found");

        var assignments = await _assignmentRepository.GetAllAsync();
        if (assignments.Any(a => a.DeveloperId == dto.DeveloperId && a.ProjectId == dto.ProjectId))
        {
            throw new DuplicateException("Developer is already assigned to this project");
        }

        var assignment = new DeveloperProject
        {
            Id = Guid.NewGuid(),
            DeveloperId = dto.DeveloperId,
            ProjectId = dto.ProjectId,
            AssignedAt = DateTime.UtcNow
        };

        await _assignmentRepository.AddAsync(assignment);
    }

    public async Task RemoveDeveloperFromProjectAsync(Guid developerId, Guid projectId)
    {
        var assignments = await _assignmentRepository.GetAllAsync();
        var assignment = assignments.FirstOrDefault(a => 
            a.DeveloperId == developerId && a.ProjectId == projectId);

        if (assignment == null)
            throw new NotFoundException("Assignment not found");

        await _assignmentRepository.DeleteAsync(assignment.Id);
    }
}
