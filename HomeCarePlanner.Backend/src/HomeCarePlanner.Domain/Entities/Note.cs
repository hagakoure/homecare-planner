using System.ComponentModel.DataAnnotations;

namespace HomeCarePlanner.Domain.Entities;

public class Note
{
    public Note()
    {
    }

    public Note(string title, string? content, string createdAt)
    {
        Id = Guid.NewGuid().ToString();
        Title = title;
        Content = content;
        CreatedAt = createdAt;
        Todos = new List<NoteTodo>();
    }

    [Key] public string Id { get; private set; } = null!;
    [Required] [StringLength(200)] public string Title { get; private set; } = null!;
    [StringLength(2000)] public string? Content { get; private set; }
    public string CreatedAt { get; private set; } = null!;
    public List<NoteTodo> Todos { get; private set; } = new();

    public void UpdateContent(string? newContent)
    {
        if (newContent?.Length > 2000) throw new ArgumentException("Content too long");
        Content = newContent;
    }

    public void AddTodo(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) throw new ArgumentException("Todo text required");
        var todo = new NoteTodo(text);
        todo.LinkToNote(Id);
        Todos.Add(todo);
    }

    public void DeleteTodo(string todoId)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == todoId);
        if (todo != null) Todos.Remove(todo);
    }
}