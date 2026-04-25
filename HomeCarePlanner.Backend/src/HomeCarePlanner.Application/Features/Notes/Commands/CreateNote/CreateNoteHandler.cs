using MediatR;
using HomeCarePlanner.Application.DTOs;
using HomeCarePlanner.Application.Interfaces;
using HomeCarePlanner.Domain.Entities;

namespace HomeCarePlanner.Application.Features.Notes.Commands.CreateNote;

public class CreateNoteHandler : IRequestHandler<CreateNoteCommand, NoteDto>
{
    private readonly IApplicationDbContext _context;
    public CreateNoteHandler(IApplicationDbContext context) => _context = context;

    public async Task<NoteDto> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
    {
        var note = new Note(request.Title, request.Content, DateTime.UtcNow.ToString("o"));
        if (request.Todos != null)
            foreach (var todo in request.Todos)
                note.AddTodo(todo.Text);

        _context.Notes.Add(note);
        await _context.SaveChangesAsync(cancellationToken);
        return new NoteDto(note.Id, note.Title, note.Content, note.CreatedAt,
            note.Todos.Select(t => new NoteTodoDto(t.Id, t.Text, t.Completed)).ToList());
    }
}