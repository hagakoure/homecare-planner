using MediatR;
using HomeCarePlanner.Application.DTOs;

namespace HomeCarePlanner.Application.Features.Tasks.Queries.GetTasks;

public record GetTasksQuery : IRequest<IReadOnlyList<MaintenanceTaskDto>>;