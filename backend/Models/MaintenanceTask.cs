namespace HomeCarePlanner.Backend.Models;

public record MaintenanceTask(
    string Id,
    string Title,
    string? Description,
    string? LastReplacement, // ISO 8601
    int IntervalDays,
    string Category
);
