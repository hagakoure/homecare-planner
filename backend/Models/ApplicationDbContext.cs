using Microsoft.EntityFrameworkCore;

namespace HomeCarePlanner.Backend.Models;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<MaintenanceTask> MaintenanceTasks => Set<MaintenanceTask>();
    public DbSet<Note> Notes => Set<Note>();
}
