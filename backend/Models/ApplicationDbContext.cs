using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<MaintenanceTask> MaintenanceTasks => Set<MaintenanceTask>();
    public DbSet<Note> Notes => Set<Note>();
}