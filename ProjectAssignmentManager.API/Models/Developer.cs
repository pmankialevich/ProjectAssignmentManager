namespace ProjectAssignmentManager.API.Models;

public enum SeniorityLevel
{
    Junior = 0,
    Middle = 1,
    Senior = 2,
    Lead = 3
}

public class Developer
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public SeniorityLevel SeniorityLevel { get; set; }
    public List<Project>? Projects { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
