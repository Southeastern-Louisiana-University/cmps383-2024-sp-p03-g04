using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP24.Api.Features.Rooms; // Make sure you have the correct namespace for your Room entity

public class RoomConfiguration : IEntityTypeConfiguration<Room>
{
    public void Configure(EntityTypeBuilder<Room> builder)
    {
        builder.Property(x => x.Type)
            .IsRequired();

        builder.Property(x => x.Number)
            .IsRequired();

        builder.HasIndex(x => new { x.Number, x.HotelId })
            .IsUnique();

        builder.Property(x => x.IsPremium);

        builder.Property(x => x.Description)
            .HasMaxLength(1000); // Set a max length for the description

        builder.Property(x => x.Price)
            .HasColumnType("decimal(18,2)") // Set the column type for the price
            .IsRequired();

        builder.Property(x => x.Capacity)
            .IsRequired();
    }
}
