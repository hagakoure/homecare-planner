using MediatR;
using HomeCarePlanner.Application.DTOs;
using HomeCarePlanner.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Application.Features.Tasks.Queries.GetTasks;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, IReadOnlyList<MaintenanceTaskDto>>
{
    private readonly IApplicationDbContext _context;
    public GetTasksHandler(IApplicationDbContext context) => _context = context;

    public async Task<IReadOnlyList<MaintenanceTaskDto>> Handle(GetTasksQuery request, CancellationToken ct)
    {
        var tasks = await _context.MaintenanceTasks
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(ct);
        return tasks.Select(Map).ToList();
    }

    private static MaintenanceTaskDto Map(Domain.Entities.MaintenanceTask t) => new(
        t.Id, t.Title, t.Description, t.IntervalDays, t.CategoryId,
        t.LastReplacement, t.CreatedAt, t.IsDueForReplacement(), t.GetDaysUntilReplacement());
}