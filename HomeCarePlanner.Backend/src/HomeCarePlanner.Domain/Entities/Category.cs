using System.ComponentModel.DataAnnotations;

namespace HomeCarePlanner.Domain.Entities;

public class Category
{
    public Category()
    {
    }

    public Category(string name, string? description)
    {
        Id = Guid.NewGuid().ToString();
        Name = name;
        Description = description;
    }

    [Key] public string Id { get; private set; } = null!;
    [Required] [StringLength(100)] public string Name { get; private set; } = null!;
    [StringLength(500)] public string? Description { get; private set; }

    public List<MaintenanceTask> Tasks { get; private set; } = new();
}