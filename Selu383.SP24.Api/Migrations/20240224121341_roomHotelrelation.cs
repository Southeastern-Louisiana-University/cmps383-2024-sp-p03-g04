using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class roomHotelrelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Room_Number",
                table: "Room");

            migrationBuilder.AddColumn<int>(
                name: "HotelId",
                table: "Room",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Room_HotelId",
                table: "Room",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_Room_Number_HotelId",
                table: "Room",
                columns: new[] { "Number", "HotelId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Hotel_HotelId",
                table: "Room",
                column: "HotelId",
                principalTable: "Hotel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_Hotel_HotelId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_HotelId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_Number_HotelId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "HotelId",
                table: "Room");

            migrationBuilder.CreateIndex(
                name: "IX_Room_Number",
                table: "Room",
                column: "Number",
                unique: true);
        }
    }
}
