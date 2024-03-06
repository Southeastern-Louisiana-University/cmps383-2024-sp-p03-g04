using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP24.Api.Features.CheckInCheckOut;

namespace Selu383.SP24.Api.Data.Configurations
{
    public class CheckInCheckOutConfiguration : IEntityTypeConfiguration<CheckInCheckOut>
    {
        public void Configure(EntityTypeBuilder<CheckInCheckOut> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.GuestId)
                .IsRequired();

            builder.Property(x => x.RoomId)
                .IsRequired();

            builder.HasIndex(x => new { x.GuestId, x.RoomId })
                .IsUnique();

            builder.Property(x => x.CheckInTime)
                .IsRequired();

            builder.Property(x => x.CheckOutTime)
                .IsRequired();

            builder.Property(x => x.EarlyCheckIn)
                .IsRequired();

            builder.Property(x => x.IsCheckedOut)
                .IsRequired();

            // Define relationships
            builder.HasOne(x => x.Guest)
                .WithMany()
                .HasForeignKey(x => x.GuestId);

            builder.HasOne(x => x.Room)
                .WithMany()
                .HasForeignKey(x => x.RoomId);
        }
    }
}