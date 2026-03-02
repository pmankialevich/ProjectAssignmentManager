using ProjectAssignmentManager.API.Models;
using ProjectAssignmentManager.API.DTOs;
using ProjectAssignmentManager.API.Repositories;
using ProjectAssignmentManager.API.Common;

namespace ProjectAssignmentManager.API.Services;

public interface IDeveloperService
{
    Task<List<Developer>> GetAllDevelopersAsync();
    Task<Developer> GetDeveloperByIdAsync(Guid id);
    Task<Developer> CreateDeveloperAsync(CreateDeveloperDto dto);
    Task<Developer> UpdateDeveloperAsync(Guid id, UpdateDeveloperDto dto);
    Task DeleteDeveloperAsync(Guid id);
    Task<List<Developer>> GetDevelopersByProjectAsync(Guid projectId);
}

public class DeveloperService : IDeveloperService
{
    private readonly IRepository<Developer> _developerRepository;
    private readonly IRepository<DeveloperProject> _assignmentRepository;
    private readonly IRepository<Project> _projectRepository;

    public DeveloperService(
        IRepository<Developer> developerRepository,
        IRepository<DeveloperProject> assignmentRepository,
        IRepository<Project> projectRepository)
    {
        _developerRepository = developerRepository;
        _assignmentRepository = assignmentRepository;
        _projectRepository = projectRepository;
    }

    public async Task<List<Developer>> GetAllDevelopersAsync()
    {
        return await _developerRepository.GetAllAsync();
    }

    public async Task<Developer> GetDeveloperByIdAsync(Guid id)
    {
        var developer = await _developerRepository.GetByIdAsync(id);
        if (developer == null)
            throw new NotFoundException($"Developer with ID {id} not found");

        var assignments = await _assignmentRepository.GetAllAsync();
        var developerAssignments = assignments.Where(a => a.DeveloperId == id).ToList();
        
        developer.Projects = new List<Project>();
        foreach (var assignment in developerAssignments)
        {
            var project = await _projectRepository.GetByIdAsync(assignment.ProjectId);
            if (project != null)
                developer.Projects.Add(project);
        }

        return developer;
    }

    public async Task<Developer> CreateDeveloperAsync(CreateDeveloperDto dto)
    {
        var existingDevelopers = await _developerRepository.GetAllAsync();
        if (existingDevelopers.Any(d => d.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase)))
        {
            throw new DuplicateException($"Developer with email {dto.Email} already exists");
        }

        var developer = new Developer
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Email = dto.Email,
            SeniorityLevel = dto.SeniorityLevel,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return await _developerRepository.AddAsync(developer);
    }

    public async Task<Developer> UpdateDeveloperAsync(Guid id, UpdateDeveloperDto dto)
    {
        var developer = await _developerRepository.GetByIdAsync(id);
        if (developer == null)
            throw new NotFoundException($"Developer with ID {id} not found");

        var existingDevelopers = await _developerRepository.GetAllAsync();
        if (existingDevelopers.Any(d => d.Id != id && d.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase)))
        {
            throw new DuplicateException($"Another developer with email {dto.Email} already exists");
        }

        developer.Name = dto.Name;
        developer.Email = dto.Email;
        developer.SeniorityLevel = dto.SeniorityLevel;
        developer.UpdatedAt = DateTime.UtcNow;

        return await _developerRepository.UpdateAsync(developer);
    }

    public async Task DeleteDeveloperAsync(Guid id)
    {
        var developer = await _developerRepository.GetByIdAsync(id);
        if (developer == null)
            throw new NotFoundException($"Developer with ID {id} not found");

        var assignments = await _assignmentRepository.GetAllAsync();
        var developerAssignments = assignments.Where(a => a.DeveloperId == id).ToList();
        
        foreach (var assignment in developerAssignments)
        {
            await _assignmentRepository.DeleteAsync(assignment.Id);
        }

        await _developerRepository.DeleteAsync(id);
    }

    public async Task<List<Developer>> GetDevelopersByProjectAsync(Guid projectId)
    {
        var assignments = await _assignmentRepository.GetAllAsync();
        var projectAssignments = assignments.Where(a => a.ProjectId == projectId).ToList();
        
        var developers = new List<Developer>();
        foreach (var assignment in projectAssignments)
        {
            var developer = await _developerRepository.GetByIdAsync(assignment.DeveloperId);
            if (developer != null)
                developers.Add(developer);
        }

        return developers;
    }
}
