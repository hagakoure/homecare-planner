using MediatR;
using HomeCarePlanner.Application.DTOs;
using HomeCarePlanner.Application.Features.Tasks.Commands.CreateTask;
using HomeCarePlanner.Application.Interfaces;

namespace HomeCarePlanner.Application.Features.Tasks.Commands.UpdateTask;

public record UpdateTaskCommand(string Id, string Title, string? Description, int IntervalDays, string Category, string? LastReplacement) : IRequest<MaintenanceTaskDto>;

public class UpdateTaskHandler : IRequestHandler<UpdateTaskCommand, MaintenanceTaskDto>
{
    private readonly IApplicationDbContext _context;
    public UpdateTaskHandler(IApplicationDbContext context) => _context = context;

    public async Task<MaintenanceTaskDto> Handle(UpdateTaskCommand request, CancellationToken ct)
    {
        var task = await _context.MaintenanceTasks.FindAsync(new object[] { request.Id }, ct)
                   ?? throw new KeyNotFoundException("Task not found");

        task.GetType().GetProperty("Title")!.SetValue(task, request.Title);
        task.GetType().GetProperty("Description")!.SetValue(task, request.Description);
        task.GetType().GetProperty("IntervalDays")!.SetValue(task, request.IntervalDays);
        task.GetType().GetProperty("Category")!.SetValue(task, request.Category);
        if (!string.IsNullOrEmpty(request.LastReplacement)) task.UpdateLastReplacement(DateTime.Parse(request.LastReplacement));

        await _context.SaveChangesAsync(ct);
        return CreateTaskHandler.Map(task); // Reuse mapping
    }
}