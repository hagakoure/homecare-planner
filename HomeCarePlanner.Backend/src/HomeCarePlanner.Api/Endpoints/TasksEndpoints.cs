using HomeCarePlanner.Application.Features.Tasks.Commands.CreateTask;
using HomeCarePlanner.Application.Features.Tasks.Commands.DeleteTask;
using HomeCarePlanner.Application.Features.Tasks.Commands.UpdateTask;
using HomeCarePlanner.Application.Features.Tasks.Queries.GetTasks;
using MediatR;

namespace HomeCarePlanner.Api.Endpoints;

public static class TasksEndpoints
{
    public static void MapTasksEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/tasks").WithTags("Tasks");

        group.MapGet("/", async (ISender s) => await s.Send(new GetTasksQuery())).WithName("GetTasks").WithOpenApi();

        group.MapPost("/", async (ISender s, CreateTaskCommand cmd) => await s.Send(cmd)).WithName("CreateTask")
            .WithOpenApi();

        group.MapPut("/{id}", async (string id, ISender s, UpdateTaskCommand cmd) =>
        {
            if (cmd.Id != id) return Results.BadRequest();
            return Results.Ok(await s.Send(cmd));
        }).WithName("UpdateTask").WithOpenApi();

        group.MapDelete("/{id}", async (string id, ISender s) => await s.Send(new DeleteTaskCommand(id)))
            .WithName("DeleteTask").WithOpenApi();
    }
}