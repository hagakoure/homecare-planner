using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeCarePlanner.Domain.Entities;

public class NoteTodo
{
    public NoteTodo()
    {
    }

    public NoteTodo(string text)
    {
        Id = Guid.NewGuid().ToString();
        Text = text;
        Completed = false;
    }

    [Key] public string Id { get; private set; } = null!;
    [Required] [StringLength(500)] public string Text { get; private set; } = null!;
    public bool Completed { get; private set; }

    [ForeignKey(nameof(Note))] public string NoteId { get; internal set; } = null!;

    public Note? Note { get; private set; }

    public void Toggle() => Completed = !Completed;

    internal void LinkToNote(string noteId) => NoteId = noteId;
}