using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Features.CheckInCheckOut
{

    public class CheckInCheckOut
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public bool EarlyCheckIn { get; set; }
        public bool IsCheckedOut { get; set; }
        public virtual User? Guest { get; set; }
        public virtual Room? Room { get; set; }
        public virtual CheckInCheckOut? CorrespondingCheckIn { get; set; }


        // Method to perform check-in
        public bool CheckIn()
        {
            DateTime currentDateTime = DateTime.Now;
            if (currentDateTime.TimeOfDay < new TimeSpan(12, 0, 0))
            {
                // Notify as early check-in
                Console.WriteLine("Notify as early check-in.");
                EarlyCheckIn = true;
            }
            else
            {
                // Proceed with check-in
                Console.WriteLine("Proceed with check-in.");
                EarlyCheckIn = false;
            }
            return EarlyCheckIn;
        }

        // Method to perform check-out
        public bool CheckOut()
        {
            // Perform check-out procedures
            Console.WriteLine("Proceed with check-out.");
            IsCheckedOut = true;
            return IsCheckedOut;
           
        }

    }
}

