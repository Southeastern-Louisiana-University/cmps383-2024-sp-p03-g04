using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;
using Selu383.SP24.Api.Features.Hotels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Selu383.SP24.Api.Extensions;

namespace Selu383.SP24.Api.Features.Reservations
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly DbSet<Reservations> reservations;
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;


        public ReservationsController(DataContext dataContext) 
        { 
            this.dataContext = dataContext;
            reservations = dataContext.Set<Reservations>();
        }

        // GET: api/reservations
        [HttpGet]
        public IQueryable<ReservationsDto> GetAllReservations()
        {
            // Retrieve all reservations
            return GetReservationsDto(reservations);
        }

        // GET: api/reservations/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = RoleNames.Admin)]

        public ActionResult<ReservationsDto> GetReservation(int id)
        {
            // Retrieve the reservation by its ID
            var reservation = GetReservationsDto(reservations.Where(x => x.Id == id)).FirstOrDefault();
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

        // Retrieve the reservation by checkIn Date
        [HttpGet("date/{checkInDate}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<IEnumerable<ReservationsDto>> GetReservationsByCheckInDate(DateTime checkInDate)
        {
            var dateReservations = reservations.Where(r => r.CheckInDate.Date == checkInDate.Date);
            if (!dateReservations.Any())
            {
                return NotFound();
            }
            return Ok(GetReservationsDto(dateReservations));
        }

        // POST: api/reservations
        [HttpPost]
        [Authorize]
        public ActionResult<ReservationsDto> CreateReservation(ReservationsDto dto)
        {
            var user =  User.GetCurrentUserName();
            var userID = User.GetCurrentUserId();

            if (user == null)
            {
                return Unauthorized("User does not exist.");
            }
            //create new reservation
            var reservation = new Reservations
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

        // PUT: api/reservations/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public IActionResult UpdateReservation(int id, ReservationsDto dto)
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

        // DELETE: api/reservations/{id}
        [HttpDelete("{id}")]
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
        private static IQueryable<ReservationsDto> GetReservationsDto(IQueryable<Reservations> reservations)
        {
            return reservations
                .Select(x => new ReservationsDto
                {
                    Id = x.Id,
                    GuestId = x.GuestId,
                    HotelId = x.HotelId,
                    RoomId = x.RoomId,
                    CheckInDate = x.CheckInDate,
                    CheckOutDate = x.CheckOutDate,
                }); ;
        }

       
    }
}
