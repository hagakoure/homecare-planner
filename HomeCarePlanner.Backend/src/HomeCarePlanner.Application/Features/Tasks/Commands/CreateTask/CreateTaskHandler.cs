using MediatR;
using HomeCarePlanner.Application.DTOs;
using HomeCarePlanner.Application.Interfaces;
using HomeCarePlanner.Domain.Entities;

namespace HomeCarePlanner.Application.Features.Tasks.Commands.CreateTask;

public class CreateTaskHandler : IRequestHandler<CreateTaskCommand, MaintenanceTaskDto>
{
    private readonly IApplicationDbContext _context;
    public CreateTaskHandler(IApplicationDbContext context) => _context = context;

    public async Task<MaintenanceTaskDto> Handle(CreateTaskCommand request, CancellationToken ct)
    {
        var task = new MaintenanceTask(request.Title, request.Description ?? "", request.IntervalDays,
            request.Category);
        if (!string.IsNullOrEmpty(request.LastReplacement))
            task.UpdateLastReplacement(DateTime.Parse(request.LastReplacement));

        _context.MaintenanceTasks.Add(task);
        await _context.SaveChangesAsync(ct);
        return Map(task);
    }

    internal static MaintenanceTaskDto Map(MaintenanceTask t) => new(
        t.Id, t.Title, t.Description, t.IntervalDays, t.CategoryId,
        t.LastReplacement, t.CreatedAt, t.IsDueForReplacement(), t.GetDaysUntilReplacement());
}