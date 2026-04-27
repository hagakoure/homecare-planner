using MediatR;
using HomeCarePlanner.Application.DTOs;

namespace HomeCarePlanner.Application.Features.Categories.Commands.CreateCategory;

public record CreateCategoryCommand(string Name, string? Description) : IRequest<CategoryDto>;