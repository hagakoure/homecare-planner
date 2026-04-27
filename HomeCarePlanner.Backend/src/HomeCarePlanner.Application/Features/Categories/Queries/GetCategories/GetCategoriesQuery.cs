using MediatR;
using HomeCarePlanner.Application.DTOs;
namespace HomeCarePlanner.Application.Features.Categories.Queries.GetCategories;
public record GetCategoriesQuery : IRequest<IReadOnlyList<CategoryDto>>;

// Handler GetNotesHandler: _context.Categories.ToListAsync() → Map to DTO