using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;
using Microsoft.AspNetCore.Identity;
using Selu383.SP24.Api.Extensions;

namespace Selu383.SP24.Api.Features.Reservations
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly DbSet<Reservation> reservations;
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly DbSet<Room> rooms;

        public ReservationsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            reservations = dataContext.Set<Reservation>();
            rooms = dataContext.Set<Room>();
        }

        [HttpGet]
        [Authorize(Roles = RoleNames.Admin)]

        public IQueryable<ReservationDto> GetAllReservations()
        {
            // Retrieve all reservations
            return GetReservationsDto(reservations);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RoleNames.Admin)]

        public ActionResult<ReservationDto> GetReservation(int id)
        {
            // Retrieve the reservation by its ID
            var reservation = GetReservationsDto(reservations.Where(x => x.Id == id)).FirstOrDefault();
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

        [HttpGet("date/{checkInDate}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<IEnumerable<ReservationDto>> GetReservationsByCheckInDate(DateTime checkInDate)
        {
            var dateReservations = reservations.Where(r => r.CheckInDate.Date == checkInDate.Date);
            if (!dateReservations.Any())
            {
                return NotFound();
            }
            return Ok(GetReservationsDto(dateReservations));
        }
        //he date should be passed in the URL in the format yyyy-MM-dd. For example, to check available rooms in hotel 1 on January 1, 2023, the URL would be api/reservations/availableRooms/1/2023-01-01
        [HttpGet("availableRooms/{hotelId}/{checkInDate}/{checkOutDate}")]
        [Authorize]
        public ActionResult<IEnumerable<RoomDto>> GetAvailableRooms(int hotelId, DateTime checkInDate, DateTime checkOutDate)
        {
            var availableRooms = rooms
                .Where(r => r.HotelId == hotelId && r.IsClean)
                .ToList();

            // Filter out rooms that are occupied
            availableRooms = availableRooms
                .Where(r => !IsRoomOccupied(r.Id, hotelId, checkInDate, checkOutDate))
                .ToList();

            // Convert to RoomDto
            var availableRoomDtos = availableRooms.Select(r => new RoomDto
            {
                Id = r.Id,
                Type = r.Type,
                Number = r.Number,
                IsPremium = r.IsPremium,
                Description = r.Description,
                Price = r.Price,
                Capacity = r.Capacity,
                IsClean = r.IsClean,
                IsOccupied = IsRoomOccupied(r.Id, hotelId, checkInDate, checkOutDate),
                HotelId = r.HotelId
            });

            return Ok(availableRoomDtos);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ReservationDto>> CreateReservation(ReservationDto dto)
        {
            var userID = User.GetCurrentUserId();

            // Check if the room is available for the entire duration of the stay
            for (var date = dto.CheckInDate; date < dto.CheckOutDate; date = date.AddDays(1))
            {
                if (IsRoomOccupied(dto.RoomId, dto.HotelId, dto.CheckInDate, dto.CheckOutDate))
                {
                    return BadRequest("The room is not available for the entire duration of the stay.");
                }
            }

            // Create new reservation
            var reservation = new Reservation
            {
                GuestId = (int)userID,
                RoomId = dto.RoomId,
                HotelId = dto.HotelId,
                CheckInDate = dto.CheckInDate,
                CheckOutDate = dto.CheckOutDate,
                NumberOfGuests = dto.NumberOfGuests,
                IsPaid = dto.IsPaid
            };
            reservations.Add(reservation);
            dataContext.SaveChanges();
            dto.Id = reservation.Id;

            return Ok(reservation);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public IActionResult UpdateReservation(int id, ReservationDto dto)
        {
            // Update a specific reservation by its ID

            var reservation = GetReservationsDto(reservations.Where(x => x.Id == id)).FirstOrDefault();
            if (reservation == null)
            {
                return NotFound(id);
            }

            reservation.RoomId = dto.RoomId;
            reservation.CheckInDate = dto.CheckInDate;
            reservation.CheckOutDate = dto.CheckOutDate;
            reservation.NumberOfGuests = dto.NumberOfGuests;
            reservation.IsPaid = dto.IsPaid;

            dataContext.SaveChanges();
            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public IActionResult DeleteReservation(int id)
        {
            // Delete a specific reservation by its ID
            var reservation = reservations.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                return NotFound(id);
            }
            reservations.Remove(reservation);
            dataContext.SaveChanges();
            return Ok(reservation);
        }
        private static IQueryable<ReservationDto> GetReservationsDto(IQueryable<Reservation> reservations)
        {
            return reservations
                .Select(x => new ReservationDto
                {
                    Id = x.Id,
                    GuestId = x.GuestId,
                    HotelId = x.HotelId,
                    RoomId = x.RoomId,
                    CheckInDate = x.CheckInDate,
                    CheckOutDate = x.CheckOutDate,
                }); ;
        }

        private bool IsRoomOccupied(int roomId, int hotelId, DateTime checkInDate, DateTime checkOutDate)
        {
            return reservations.Any(r => r.RoomId == roomId && r.HotelId == hotelId &&
                !(checkInDate >= r.CheckOutDate || checkOutDate <= r.CheckInDate));
        }

    }
}