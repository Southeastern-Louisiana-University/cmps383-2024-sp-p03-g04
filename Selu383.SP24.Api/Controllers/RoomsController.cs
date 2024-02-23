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
    [Route("api/rooms")]
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
                Capacity = dto.Type == RoomType.Single ? 2 : 4
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
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetAllRooms()
        {
            var rooms = await Rooms.ToListAsync();

            var roomDtos = rooms.Select(room => new RoomDto
            {
                Id = room.Id,
                Type = room.Type,
                Number = room.Number,
                IsPremium = room.IsPremium,
                Description = room.Description,
                Price = room.Price,
                Capacity = room.Capacity
            });

            return Ok(roomDtos);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult> EditRoom(int id, RoomDto dto)
        {
            var room = await Rooms.FindAsync(id);
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

            await dataContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult> DeleteRoom(int id)
        {
            var room = await Rooms.FindAsync(id);
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
