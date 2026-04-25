namespace HomeCarePlanner.Application.DTOs;

public record AgronomyRecommendationDto(
    string Id,
    string Title,
    string? Description,
    string Season,
    string CreatedAt,
    bool IsActive);