namespace HomeCarePlanner.Application.DTOs;

public record NoteDto(
    string Id,
    string Title,
    string? Content,
    string CreatedAt,
    IReadOnlyList<NoteTodoDto> Todos);