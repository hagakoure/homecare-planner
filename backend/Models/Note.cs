namespace HomeCarePlanner.Backend.Models;

public record Note(
    string Id,
    string Title,
    string Content,
    List<NoteTodo> Todos,
    string CreatedAt
);