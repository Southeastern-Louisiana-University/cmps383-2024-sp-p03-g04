using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;
using Microsoft.AspNetCore.Identity;
using Selu383.SP24.Api.Extensions;
using Microsoft.Data.SqlClient;
using System.Security.Claims;

namespace Selu383.SP24.Api.Features.Reservations
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly DbSet<Room> rooms;
        private readonly DbSet<Reservation> reservations;


        public ReservationsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            rooms = dataContext.Set<Room>();
            reservations = dataContext.Set<Reservation>();
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
        [HttpGet("user/{userId}")]
        [Authorize]
        public ActionResult<List<ReservationDto>> GetAllReservationsByUserId(int userId)
        {
            var userReservations = reservations.Where(r => r.GuestId == userId)
                               .OrderByDescending(r => r.CheckInDate)
                               .ToList();

            if (userReservations == null || userReservations.Count == 0)
            {
                return NotFound();
            }

            var reservationDtos = userReservations.Select(reservation => new ReservationDto
            {
                Id = reservation.Id,
                GuestId = reservation.GuestId,
                HotelId = reservation.HotelId,
                RoomId = reservation.RoomId,
                CheckInDate = reservation.CheckInDate,
                CheckOutDate = reservation.CheckOutDate,
                NumberOfGuests = reservation.NumberOfGuests,
                ConfirmationNumber = reservation.ConfirmationNumber
            }).ToList();

            return Ok(reservationDtos);
        }


        [HttpGet("hotel/{hotelId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<IEnumerable<ReservationDto>> GetReservationsByHotelId(int hotelId)
        {
            var hotelReservations = reservations.Where(r => r.HotelId == hotelId);
            if (!hotelReservations.Any())
            {
                return NotFound();
            }
            return Ok(GetReservationsDto(hotelReservations));
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

        [HttpGet("availableRoomTypes/{hotelId}/{checkInDate}/{checkOutDate}")]
        public ActionResult<IEnumerable<RoomTypeDto>> GetAvailableRoomTypes(int hotelId, DateTime checkInDate, DateTime checkOutDate)
        {
            // Get all room types in the hotel
            var roomTypes = rooms
                .Where(r => r.HotelId == hotelId && r.IsClean)
                .GroupBy(r => r.Type)
                .Select(g => new { Type = g.Key, Rooms = g.ToList() })
                .ToList();

            // Filter out room types where all rooms are occupied
            var availableRoomTypes = roomTypes
                .Where(rt=> rt.Rooms.Count>0 && rt.Rooms.Any(r=> !IsRoomOccupied(r.Id,hotelId,checkInDate,checkOutDate)))
                .Select(rt => new RoomTypeDto
                {
                    Type = rt.Type,
                    Rooms = new List<RoomDto>{ rt.Rooms.Select(r => new RoomDto
                    {
                        Id = r.Id,
                        Number = r.Number,
                        IsPremium = r.IsPremium,
                        Description = r.Description,
                        Price = r.Price,
                        Capacity = r.Capacity,
                        IsClean = r.IsClean,
                        IsOccupied = IsRoomOccupied(r.Id, hotelId, checkInDate, checkOutDate),
                        HotelId = r.HotelId
                    }).First()
                }
                });

            return Ok(availableRoomTypes);
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
        IsPaid = dto.IsPaid,
        ConfirmationNumber = "EN" + Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper(),
    };
    reservations.Add(reservation);
    
    try
    {
        dataContext.SaveChanges();
    }
    catch (DbUpdateException ex)
    {
        if (ex.InnerException is SqlException sqlException && (sqlException.Number == 547 || sqlException.Number == 2627))
        {
            // Handle foreign key violation
            return BadRequest("Foreign key violation: " + ex.InnerException.Message);
        }
        else
        {
            throw;
        }
    }

    dto.Id = reservation.Id;
    dto.ConfirmationNumber = reservation.ConfirmationNumber;

    return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, dto);
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
                    NumberOfGuests=x.NumberOfGuests,
                    ConfirmationNumber=x.ConfirmationNumber
           
                }); ;
        }

        private bool IsRoomOccupied(int roomId, int hotelId, DateTime checkInDate, DateTime checkOutDate)
        {
            return reservations.Any(r => r.RoomId == roomId && r.HotelId == hotelId &&
                !(checkInDate >= r.CheckOutDate || checkOutDate <= r.CheckInDate));
        }

    }
}