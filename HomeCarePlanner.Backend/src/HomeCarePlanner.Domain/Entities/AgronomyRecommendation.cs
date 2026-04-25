using System.ComponentModel.DataAnnotations;
namespace HomeCarePlanner.Domain.Entities;
public class AgronomyRecommendation
{
    public AgronomyRecommendation() { }
    public AgronomyRecommendation(string title, string description, string season)
    { Id = Guid.NewGuid().ToString(); Title = title; Description = description; Season = season; CreatedAt = DateTime.UtcNow.ToString("o"); }
    [Key] public string Id { get; private set; } = null!;
    [Required][StringLength(200)] public string Title { get; private set; } = null!;
    [StringLength(2000)] public string? Description { get; private set; }
    [Required][StringLength(50)] public string Season { get; private set; } = null!;
    public string CreatedAt { get; private set; } = null!;
    public bool IsActive { get; private set; } = true;
    public void Deactivate() => IsActive = false;
}
