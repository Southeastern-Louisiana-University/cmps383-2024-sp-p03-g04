using Selu383.SP24.Api.Features.Rooms;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Features.Reservations;

public class Reservations
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public int HotelId { get; set; }
    public int RoomId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int NumberOfGuests { get; set; }
    public bool IsPaid { get; set; }
}
