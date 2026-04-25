using HomeCarePlanner.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Application.Features.Notes.Queries.GetUrgentTasks;

public class GetUrgentTasksHandler : IRequestHandler<GetUrgentTasksQuery, IReadOnlyList<UrgentTaskDto>>
{
    private readonly IApplicationDbContext _context;
    public GetUrgentTasksHandler(IApplicationDbContext context) => _context = context;

    public async Task<IReadOnlyList<UrgentTaskDto>> Handle(GetUrgentTasksQuery request, CancellationToken cancellationToken)
    {
        var tasks = await _context.MaintenanceTasks
            .Where(t => t.LastReplacement != null)
            .ToListAsync(cancellationToken);

        var today = DateTime.Today;

        var urgent = tasks
            .Select(t =>
            {
                var next = DateTime.Parse(t.LastReplacement!).AddDays(t.IntervalDays);
                var daysLeft = (next.Date - today).Days;
                return new
                {
                    t.Id, t.Title, t.Category, t.IntervalDays, t.LastReplacement,
                    NextReplacement = next.ToString("o"),
                    DaysLeft = daysLeft
                };
            })
            .Where(x => x.DaysLeft >= 0 && x.DaysLeft <= 7)
            .OrderBy(x => x.DaysLeft)
            .ToList();

        return urgent.Select(x => new UrgentTaskDto(
            x.Id, x.Title, x.Category, x.IntervalDays, x.LastReplacement, x.NextReplacement, x.DaysLeft
        )).ToList();
    }
}