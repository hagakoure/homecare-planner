using HomeCarePlanner.Application.Features.Notes.Queries.GetUrgentTasks;
using MediatR;

namespace HomeCarePlanner.Api.Endpoints;

public static class NotificationsEndpoints
{
    public static void MapNotificationsEndpoints(this WebApplication app)
    {
        app.MapGet("/api/notifications", async (ISender sender) => await sender.Send(new GetUrgentTasksQuery()))
            .WithTags("Notifications").WithName("GetUrgentNotifications").WithOpenApi();
    }
}