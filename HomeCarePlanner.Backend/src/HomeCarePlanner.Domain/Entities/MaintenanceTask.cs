using System.ComponentModel.DataAnnotations;
namespace HomeCarePlanner.Domain.Entities;
public class MaintenanceTask
{
    public MaintenanceTask() { }
    public MaintenanceTask(string title, string description, int intervalDays, string category)
    { Id = Guid.NewGuid().ToString(); Title = title; Description = description; IntervalDays = intervalDays; Category = category; CreatedAt = DateTime.UtcNow.ToString("o"); }
    [Key] public string Id { get; private set; } = null!;
    [Required][StringLength(200)] public string Title { get; private set; } = null!;
    [StringLength(1000)] public string? Description { get; private set; }
    public int IntervalDays { get; private set; }
    [Required][StringLength(50)] public string Category { get; private set; } = null!;
    public string? LastReplacement { get; private set; }
    public string CreatedAt { get; private set; } = null!;
    public void UpdateLastReplacement(DateTime date) => LastReplacement = date.ToString("o");
    public bool IsDueForReplacement() { if (string.IsNullOrEmpty(LastReplacement)) return false; return DateTime.UtcNow >= DateTime.Parse(LastReplacement).AddDays(IntervalDays); }
    public int GetDaysUntilReplacement() { if (string.IsNullOrEmpty(LastReplacement)) return int.MaxValue; var next = DateTime.Parse(LastReplacement).AddDays(IntervalDays); return (next - DateTime.UtcNow).Days; }
}
