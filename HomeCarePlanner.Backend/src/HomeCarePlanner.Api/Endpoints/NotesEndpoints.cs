using HomeCarePlanner.Application.Features.Notes.Commands.CreateNote;
using HomeCarePlanner.Application.Features.Notes.Queries.GetNotes;
using MediatR;
namespace HomeCarePlanner.Api.Endpoints;
/// <summary>
/// 
/// </summary>
public static class NotesEndpoints
{
    public static void MapNotesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/notes").WithTags("Notes");
        group.MapGet("/", async (ISender sender) => await sender.Send(new GetNotesQuery())).WithName("GetNotes").WithOpenApi();
        group.MapPost("/", async (ISender sender, CreateNoteCommand command) => await sender.Send(command)).WithName("CreateNote").WithOpenApi();
    }
}
