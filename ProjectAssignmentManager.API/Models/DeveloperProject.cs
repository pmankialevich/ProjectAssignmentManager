namespace ProjectAssignmentManager.API.Models;

public class DeveloperProject
{
    public Guid Id { get; set; }
    public Guid DeveloperId { get; set; }
    public Guid ProjectId { get; set; }
    public DateTime AssignedAt { get; set; }
}
