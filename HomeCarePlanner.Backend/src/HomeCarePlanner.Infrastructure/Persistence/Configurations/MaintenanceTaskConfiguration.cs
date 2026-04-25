using HomeCarePlanner.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeCarePlanner.Infrastructure.Persistence.Configurations;

public class MaintenanceTaskConfiguration : IEntityTypeConfiguration<MaintenanceTask>
{
    public void Configure(EntityTypeBuilder<MaintenanceTask> builder)
    {
        builder.ToTable("MaintenanceTasks");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Title).IsRequired().HasMaxLength(200);
        builder.Property(t => t.Description).HasMaxLength(1000);
        builder.Property(t => t.Category).IsRequired().HasMaxLength(50);
        builder.Property(t => t.LastReplacement).HasMaxLength(50);
        builder.Property(t => t.CreatedAt).IsRequired();
        builder.HasIndex(t => t.Category);
        builder.HasIndex(t => t.LastReplacement);
    }
}