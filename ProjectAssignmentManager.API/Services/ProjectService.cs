using ProjectAssignmentManager.API.Models;
using ProjectAssignmentManager.API.DTOs;
using ProjectAssignmentManager.API.Repositories;
using ProjectAssignmentManager.API.Common;

namespace ProjectAssignmentManager.API.Services;

public interface IProjectService
{
    Task<List<Project>> GetAllProjectsAsync();
    Task<Project> GetProjectByIdAsync(Guid id);
    Task<Project> CreateProjectAsync(CreateProjectDto dto);
    Task<Project> UpdateProjectAsync(Guid id, UpdateProjectDto dto);
    Task DeleteProjectAsync(Guid id);
    Task<List<Project>> GetProjectsByDeveloperAsync(Guid developerId);
}

public class ProjectService : IProjectService
{
    private readonly IRepository<Project> _projectRepository;
    private readonly IRepository<DeveloperProject> _assignmentRepository;
    private readonly IRepository<Developer> _developerRepository;

    public ProjectService(
        IRepository<Project> projectRepository,
        IRepository<DeveloperProject> assignmentRepository,
        IRepository<Developer> developerRepository)
    {
        _projectRepository = projectRepository;
        _assignmentRepository = assignmentRepository;
        _developerRepository = developerRepository;
    }

    public async Task<List<Project>> GetAllProjectsAsync()
    {
        return await _projectRepository.GetAllAsync();
    }

    public async Task<Project> GetProjectByIdAsync(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            throw new NotFoundException($"Project with ID {id} not found");

        var assignments = await _assignmentRepository.GetAllAsync();
        var projectAssignments = assignments.Where(a => a.ProjectId == id).ToList();
        
        project.Developers = new List<Developer>();
        foreach (var assignment in projectAssignments)
        {
            var developer = await _developerRepository.GetByIdAsync(assignment.DeveloperId);
            if (developer != null)
                project.Developers.Add(developer);
        }

        return project;
    }

    public async Task<Project> CreateProjectAsync(CreateProjectDto dto)
    {
        var existingProjects = await _projectRepository.GetAllAsync();
        if (existingProjects.Any(p => p.Name.Equals(dto.Name, StringComparison.OrdinalIgnoreCase)))
        {
            throw new DuplicateException($"Project with name '{dto.Name}' already exists");
        }

        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return await _projectRepository.AddAsync(project);
    }

    public async Task<Project> UpdateProjectAsync(Guid id, UpdateProjectDto dto)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            throw new NotFoundException($"Project with ID {id} not found");

        var existingProjects = await _projectRepository.GetAllAsync();
        if (existingProjects.Any(p => p.Id != id && p.Name.Equals(dto.Name, StringComparison.OrdinalIgnoreCase)))
        {
            throw new DuplicateException($"Another project with name '{dto.Name}' already exists");
        }

        project.Name = dto.Name;
        project.Description = dto.Description;
        project.UpdatedAt = DateTime.UtcNow;

        return await _projectRepository.UpdateAsync(project);
    }

    public async Task DeleteProjectAsync(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            throw new NotFoundException($"Project with ID {id} not found");

        var assignments = await _assignmentRepository.GetAllAsync();
        var projectAssignments = assignments.Where(a => a.ProjectId == id).ToList();
        
        foreach (var assignment in projectAssignments)
        {
            await _assignmentRepository.DeleteAsync(assignment.Id);
        }

        await _projectRepository.DeleteAsync(id);
    }

    public async Task<List<Project>> GetProjectsByDeveloperAsync(Guid developerId)
    {
        var assignments = await _assignmentRepository.GetAllAsync();
        var developerAssignments = assignments.Where(a => a.DeveloperId == developerId).ToList();
        
        var projects = new List<Project>();
        foreach (var assignment in developerAssignments)
        {
            var project = await _projectRepository.GetByIdAsync(assignment.ProjectId);
            if (project != null)
                projects.Add(project);
        }

        return projects;
    }
}
