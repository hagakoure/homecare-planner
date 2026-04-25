using MediatR;
using HomeCarePlanner.Application.DTOs;
using HomeCarePlanner.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Application.Features.Notes.Queries.GetNotes;

public class GetNotesHandler : IRequestHandler<GetNotesQuery, IReadOnlyList<NoteDto>>
{
    private readonly IApplicationDbContext _context;
    public GetNotesHandler(IApplicationDbContext context) => _context = context;

    public async Task<IReadOnlyList<NoteDto>> Handle(GetNotesQuery request, CancellationToken cancellationToken)
    {
        var notes = await _context.Notes
            .Include(n => n.Todos)
            .OrderByDescending(n => n.CreatedAt)
            .ToListAsync(cancellationToken);

        return notes.Select(n => new NoteDto(n.Id, n.Title, n.Content, n.CreatedAt,
            n.Todos.Select(t => new NoteTodoDto(t.Id, t.Text, t.Completed)).ToList())).ToList();
    }
}