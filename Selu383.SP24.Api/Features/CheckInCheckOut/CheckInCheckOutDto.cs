using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Features.CheckInCheckOut
{
    public class CheckInCheckOutDto
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public bool EarlyCheckIn { get; set; }
        public bool IsCheckedOut { get; set; }
        public virtual User? Guest { get; set; }
        public virtual Room? Room { get; set; }
        public virtual CheckInCheckOut? CorrespondingCheckIn { get; set; }

    }
}
