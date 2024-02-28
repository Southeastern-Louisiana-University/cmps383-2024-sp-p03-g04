using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Reservations;
using Selu383.SP24.Api.Features.Rooms;


public class ReservationConfiguration : IEntityTypeConfiguration<Reservations>
{
    public void Configure(EntityTypeBuilder<Reservations> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.GuestId)
            .IsRequired();

        builder.Property(x => x.RoomId)
            .IsRequired();

        builder.HasIndex(x => new { x.GuestId, x.RoomId })
            .IsUnique();

        builder.Property(x => x.CheckInDate)
            .IsRequired();

        builder.Property(x => x.CheckOutDate)
            .IsRequired();

        builder.Property(x => x.NumberOfGuests)
            .IsRequired();

        builder.Property(x => x.IsPaid)
            .IsRequired();

        
    }
}
