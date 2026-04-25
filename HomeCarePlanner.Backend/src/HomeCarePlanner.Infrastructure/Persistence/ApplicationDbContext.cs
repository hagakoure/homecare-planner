
using HomeCarePlanner.Application.Interfaces;
using HomeCarePlanner.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Note> Notes => Set<Note>();
    public DbSet<NoteTodo> NoteTodos => Set<NoteTodo>();
    public DbSet<MaintenanceTask> MaintenanceTasks => Set<MaintenanceTask>();
    public DbSet<AgronomyRecommendation> AgronomyRecommendations => Set<AgronomyRecommendation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}