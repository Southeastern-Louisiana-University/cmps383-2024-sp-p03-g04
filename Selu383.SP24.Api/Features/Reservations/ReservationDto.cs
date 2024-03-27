using System;
using Selu383.SP24.Api.Features.Authorization;

namespace Selu383.SP24.Api.Features.Reservations
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int NumberOfGuests { get; set; }
        public bool IsPaid { get; set; }
        public string ConfirmationNumber { get; set; }



        // Constructors
        public ReservationDto()
        {
        }

        public ReservationDto(int Id, int guestId, int hotelId,int roomId, DateTime checkInDate, DateTime checkOutDate, int numberOfGuests, bool isPaid)
        {
            HotelId = hotelId;
            GuestId = guestId;
            RoomId = roomId;
            CheckInDate = checkInDate;
            CheckOutDate = checkOutDate;
            NumberOfGuests = numberOfGuests;
            IsPaid = isPaid;
        }

    }
}
