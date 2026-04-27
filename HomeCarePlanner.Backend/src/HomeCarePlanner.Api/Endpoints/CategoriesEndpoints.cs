using HomeCarePlanner.Application.Features.Categories.Commands.CreateCategory;
using HomeCarePlanner.Application.Features.Categories.Queries.GetCategories;
using MediatR;

namespace HomeCarePlanner.Api.Endpoints;

public static class CategoriesEndpoints
{
    public static void MapCategoriesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/categories").WithTags("Categories");
        group.MapGet("/", async (ISender s) => await s.Send(new GetCategoriesQuery())).WithName("GetCategories").WithOpenApi();
        group.MapPost("/", async (ISender s, CreateCategoryCommand cmd) => await s.Send(cmd)).WithName("CreateCategory").WithOpenApi();
    }
}