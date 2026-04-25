using HomeCarePlanner.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeCarePlanner.Infrastructure.Persistence.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("Notes");
        builder.HasKey(n => n.Id);
        builder.Property(n => n.Title).IsRequired().HasMaxLength(200);
        builder.Property(n => n.Content).HasMaxLength(2000);
        builder.Property(n => n.CreatedAt).IsRequired();
        builder.HasMany(n => n.Todos).WithOne(t => t.Note).HasForeignKey(t => t.NoteId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}