using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.CheckInCheckOut;
using System.Security.Claims;


namespace Selu383.SP24.Api.Controllers
{
    [Route("api/checkincheckout")]
    [ApiController]
    public class CheckInCheckOutController : ControllerBase
    {
        private readonly DbSet<CheckInCheckOut> checkInCheckOuts;
        private readonly DataContext dataContext;
        private readonly UserManager<User> _userManager;


        public CheckInCheckOutController(DataContext dataContext, UserManager<User> userManager)
        {
            this.dataContext = dataContext;
            checkInCheckOuts = dataContext.Set<CheckInCheckOut>();
            _userManager = userManager;

        }

        [HttpPost("check-in")]
        public async Task<IActionResult> CheckIn(CheckInRequest request)
        {
            // Get the currently logged-in user
            User currentUser = await _userManager.GetUserAsync(User);

            if (currentUser == null)
            {
                return Unauthorized("User not authenticated.");
            }

            // Use the user's ID as the GuestId in the CheckInRequest
            request.GuestId = currentUser.Id;

            // Perform check-in logic
            // For simplicity, I'll assume you directly add the check-in to the database without additional processing
            var checkInCheckOut = new CheckInCheckOut
            {
                GuestId = request.GuestId,
                RoomId = request.RoomId,

                CheckInTime = DateTime.UtcNow // Example: using UTC time for consistency
            };

            dataContext.CheckInCheckOut.Add(checkInCheckOut);
            dataContext.SaveChanges();

            return Ok("Check-in successful.");
        }



            [HttpPost("check-out")]
            public IActionResult CheckOut(int checkInId, [FromBody] DateTime checkOutTime)
        {
            var checkIn = dataContext.CheckInCheckOut.Find(checkInId);
            if (checkIn == null)
            {
                return NotFound("Check-in not found.");
            }

            // Perform check-out logic
            checkIn.CheckOutTime = checkOutTime;
            checkIn.IsCheckedOut = true;

            // Save changes to the database
            dataContext.SaveChanges();

            // Return success response
            return Ok("Check-out successful.");
        }

        public class CheckInRequest
        {
            // Properties that can be set through the request
            public int GuestId { get; set; } // User ID
            public int RoomId { get; set; } // Room ID

        }
    }
}


