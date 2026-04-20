using HomeCarePlanner.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeCarePlanner.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class NotesController : ControllerBase
{
    private static readonly List<Note> _notes = new()
    {
        new("1", "Подготовка к весне", "Нужно купить семена и удобрения", 
            new List<NoteTodo>
            {
                new("1", "Купить семена томатов", false),
                new("2", "Заказать компост", true)
            },
            "2026-04-15T10:00:00Z")
    };

    [HttpGet]
    public IEnumerable<Note> Get() => _notes;

    [HttpPost]
    public IActionResult Post([FromBody] Note note)
    {
        if (string.IsNullOrWhiteSpace(note.Id)) return BadRequest("Id обязателен");
        _notes.Add(note);
        return CreatedAtAction(nameof(Get), new { id = note.Id }, note);
    }

    [HttpPut("{id}")]
    public IActionResult Put(string id, [FromBody] Note updatedNote)
    {
        var index = _notes.FindIndex(n => n.Id == id);
        if (index == -1) return NotFound();
        _notes[index] = updatedNote with { Id = id };
        return Ok(updatedNote);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (_notes.RemoveAll(n => n.Id == id) == 0) return NotFound();
        return NoContent();
    }
}