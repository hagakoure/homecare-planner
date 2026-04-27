using MediatR;
namespace HomeCarePlanner.Application.Features.Notes.Queries.GetUrgentTasks;
public record UrgentTaskDto(string Id, string Title, string CategoryId, int IntervalDays, string? LastReplacement, string NextReplacement, int DaysLeft);
public record GetUrgentTasksQuery : IRequest<IReadOnlyList<UrgentTaskDto>>;
