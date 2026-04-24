using Microsoft.AspNetCore.Mvc;

namespace HomeCarePlanner.Backend.Controllers;

public record AgronomyRecommendation(string Action, string Crop, int StartDay, int EndDay);

[ApiController]
[Route("api/[controller]")]
public class AgronomyController : ControllerBase
{
    private static readonly List<AgronomyRecommendation> _recommendations = new()
    {
        new("Посев", "томаты", 10, 20),
        new("Сбор урожая", "картофель", 150, 180),
        new("Посев", "огурцы", 15, 25)
    };

    [HttpGet]
    public IEnumerable<AgronomyRecommendation> Get(string region = "central", int month = 4)
    {
        // Простая фильтрация по месяцу (в реальности — сложнее)
        return _recommendations;
    }
}
