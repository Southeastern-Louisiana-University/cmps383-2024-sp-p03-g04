using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Reservations;

public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
{
    public void Configure(EntityTypeBuilder<Reservation> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.GuestId)
            .IsRequired();

        builder.Property(x => x.RoomId)
            .IsRequired();

        builder.Property(x => x.HotelId)
            .IsRequired();

        builder.HasIndex(x => new { x.GuestId, x.RoomId, x.HotelId,x.CheckInDate,x.CheckOutDate })
            .IsUnique();

        builder.Property(x => x.CheckInDate)
            .IsRequired();

        builder.Property(x => x.CheckOutDate)
            .IsRequired();

        builder.Property(x => x.NumberOfGuests)
            .IsRequired();

        builder.Property(x => x.IsPaid)
            .IsRequired();

        // Configure relationships
        builder.HasOne(r => r.Room)
            .WithMany(ro => ro.Reservations)
            .HasForeignKey(r => r.RoomId)
            .OnDelete(DeleteBehavior.Restrict); // restrict delete behavior

        builder.HasOne(r => r.Hotel)
            .WithMany(h => h.Reservations)
            .HasForeignKey(r => r.HotelId)
            .OnDelete(DeleteBehavior.Restrict); // restrict delete behavior
    }
}
