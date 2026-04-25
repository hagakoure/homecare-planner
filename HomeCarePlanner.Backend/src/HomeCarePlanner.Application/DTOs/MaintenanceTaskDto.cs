namespace HomeCarePlanner.Application.DTOs;

public record MaintenanceTaskDto(
    string Id,
    string Title,
    string? Description,
    int IntervalDays,
    string Category,
    string? LastReplacement,
    string CreatedAt,
    bool IsDue,
    int DaysUntilDue);