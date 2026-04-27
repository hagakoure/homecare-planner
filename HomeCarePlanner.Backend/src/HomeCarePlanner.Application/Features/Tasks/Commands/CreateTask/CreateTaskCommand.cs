using MediatR;
using HomeCarePlanner.Application.DTOs;

namespace HomeCarePlanner.Application.Features.Tasks.Commands.CreateTask;

public record CreateTaskCommand(
    string Title,
    string? Description,
    int IntervalDays,
    string Category,
    string? LastReplacement
) : IRequest<MaintenanceTaskDto>;