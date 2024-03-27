using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class updatedReservationReln : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reservation_GuestId_RoomId_HotelId",
                table: "Reservation");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_GuestId_RoomId_HotelId_CheckInDate_CheckOutDate",
                table: "Reservation",
                columns: new[] { "GuestId", "RoomId", "HotelId", "CheckInDate", "CheckOutDate" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reservation_GuestId_RoomId_HotelId_CheckInDate_CheckOutDate",
                table: "Reservation");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_GuestId_RoomId_HotelId",
                table: "Reservation",
                columns: new[] { "GuestId", "RoomId", "HotelId" },
                unique: true);
        }
    }
}
