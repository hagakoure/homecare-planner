namespace HomeCarePlanner.Models;

public record Note(
    string Id,
    string Title,
    string Content,
    List<NoteTodo> Todos,
    string CreatedAt // ISO 8601
);

public record NoteTodo(
    string Id,
    string Text,
    bool Completed
);