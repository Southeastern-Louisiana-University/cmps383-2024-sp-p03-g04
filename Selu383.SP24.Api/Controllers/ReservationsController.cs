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

namespace Selu383.SP24.Api.Features.Reservations
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly DbSet<Reservations> reservations;
        private readonly DataContext dataContext;


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

        // POST: api/reservations
        [HttpPost]
        public ActionResult<ReservationsDto> CreateReservation(ReservationsDto dto)
        {
            //create new reservation
            var reservation = new Reservations
            {
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
