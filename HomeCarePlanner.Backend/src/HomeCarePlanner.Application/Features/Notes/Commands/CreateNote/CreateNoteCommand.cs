using MediatR;
using HomeCarePlanner.Application.DTOs;

namespace HomeCarePlanner.Application.Features.Notes.Commands.CreateNote;

public record CreateNoteCommand(string Title, string? Content, List<CreateNoteTodoDto>? Todos) : IRequest<NoteDto>;