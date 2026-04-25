using MediatR;
using HomeCarePlanner.Application.DTOs;

namespace HomeCarePlanner.Application.Features.Notes.Queries.GetNotes;

public record GetNotesQuery : IRequest<IReadOnlyList<NoteDto>>;