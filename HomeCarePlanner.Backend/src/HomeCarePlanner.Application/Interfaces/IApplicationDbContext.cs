// src/HomeCarePlanner.Application/Interfaces/IApplicationDbContext.cs
using HomeCarePlanner.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Note> Notes { get; }
    DbSet<NoteTodo> NoteTodos { get; }
    DbSet<MaintenanceTask> MaintenanceTasks { get; }
    DbSet<AgronomyRecommendation> AgronomyRecommendations { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}