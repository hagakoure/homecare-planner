using HomeCarePlanner.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeCarePlanner.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class MaintenanceTasksController : ControllerBase
{
    private static readonly List<MaintenanceTask> _tasks = new()
    {
        new("1", "Замена угольного фильтра", "Фильтр под мойкой", "2026-04-01", 90, "water-filter")
    };

    /// <summary>
    /// Получить все задачи
    /// </summary>
    [HttpGet]
    public IEnumerable<MaintenanceTask> Get() => _tasks;

    /// <summary>
    /// Создать новую задачу
    /// </summary>
    [HttpPost]
    public IActionResult Post([FromBody] MaintenanceTask task)
    {
        if (string.IsNullOrWhiteSpace(task.Id)) return BadRequest("Id обязателен");
        _tasks.Add(task);
        return CreatedAtAction(nameof(Get), new { id = task.Id }, task);
    }

    /// <summary>
    /// Обновить задачу
    /// </summary>
    [HttpPut("{id}")]
    public IActionResult Put(string id, [FromBody] MaintenanceTask updatedTask)
    {
        var index = _tasks.FindIndex(t => t.Id == id);
        if (index == -1) return NotFound();
        _tasks[index] = updatedTask with { Id = id };
        return Ok(updatedTask);
    }

    /// <summary>
    /// Удалить задачу
    /// </summary>
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (_tasks.RemoveAll(t => t.Id == id) == 0) return NotFound();
        return NoContent();
    }
}