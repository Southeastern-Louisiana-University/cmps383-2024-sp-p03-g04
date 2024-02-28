using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Selu383.SP24.Api.Features.Authorization;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Controllers
{
    [ApiController]
    [Route("api/hotels/{hotelId}/rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly DbSet<Room> Rooms;


        public RoomsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            Rooms = dataContext.Set<Room>();

        }

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult<RoomDto>> Create(RoomDto dto)
        {
            var room = new Room
            {
                Type = dto.Type,
                Number = dto.Number,
                IsPremium = dto.IsPremium,
                Description = dto.Description,
                Price = dto.Price,
                Capacity = dto.Type == RoomType.Single ? 2 : 4,
                IsClean=dto.IsClean,
                IsOccupied=dto.IsOccupied,
                HotelId = dto.HotelId,
            };

            Rooms.Add(room);
            try
            {
                await dataContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Conflict("A room with this number already exists.");
            }

            dto.Id = room.Id;
            return Ok(dto);
        }

        [HttpGet]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetAllRoomsByHotel(int hotelId)
        {
            var rooms = await Rooms.Where(x => x.HotelId == hotelId).ToListAsync();

            var roomDtos = rooms.Select(room => new RoomDto
            {
                Id = room.Id,
                Type = room.Type,
                Number = room.Number,
                IsPremium = room.IsPremium,
                Description = room.Description,
                Price = room.Price,
                Capacity = room.Capacity,
                IsClean=room.IsClean,
                IsOccupied = room.IsOccupied,
            });

            return Ok(roomDtos);
        }

        [HttpPut("{roomId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult> EditRoom(int id,int hotelId, RoomDto dto)
        {
            var room = await Rooms.FirstOrDefaultAsync(x => x.Id == id && x.HotelId == hotelId);
            if (room == null)
            {
                return NotFound();
            }

            room.Type = dto.Type;
            room.Number = dto.Number;
            room.IsPremium = dto.IsPremium;
            room.Description = dto.Description;
            room.Price = dto.Price;
            room.Capacity = dto.Type == RoomType.Single ? 2 : 4;
            room.IsClean = dto.IsClean;
            dto.IsOccupied = dto.IsOccupied;

            await dataContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{roomId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult> DeleteRoom(int hotelId, int id)
        {
            var room = await Rooms.FirstOrDefaultAsync(x => x.Id == id && x.HotelId == hotelId);
            if (room == null)
            {
                return NotFound();
            }

            Rooms.Remove(room);
            await dataContext.SaveChangesAsync();

            return NoContent();
        }
    }

}
