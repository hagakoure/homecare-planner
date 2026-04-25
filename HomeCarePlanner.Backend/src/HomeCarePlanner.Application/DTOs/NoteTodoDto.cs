namespace HomeCarePlanner.Application.DTOs;

public record NoteTodoDto(
    string Id,
    string Text,
    bool Completed);