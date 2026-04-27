using MediatR;
using HomeCarePlanner.Application.Interfaces;

namespace HomeCarePlanner.Application.Features.Tasks.Commands.DeleteTask;

public record DeleteTaskCommand(string Id) : IRequest<Unit>;

public class DeleteTaskHandler : IRequestHandler<DeleteTaskCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    public DeleteTaskHandler(IApplicationDbContext context) => _context = context;

    public async Task<Unit> Handle(DeleteTaskCommand request, CancellationToken ct)
    {
        var task = await _context.MaintenanceTasks.FindAsync(new object[] { request.Id }, ct)
                   ?? throw new KeyNotFoundException("Task not found");
        
        _context.MaintenanceTasks.Remove(task);
        await _context.SaveChangesAsync(ct);
        return Unit.Value;
    }
}