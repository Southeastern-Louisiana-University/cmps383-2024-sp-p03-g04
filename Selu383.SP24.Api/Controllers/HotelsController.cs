using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Controllers;

[Route("api/hotels")]
[ApiController]
public class HotelsController : ControllerBase
{
    private readonly DbSet<Hotel> hotels;
    private readonly DataContext dataContext;

    public HotelsController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        hotels = dataContext.Set<Hotel>();
    }

    [HttpGet]
    public IQueryable<HotelDto> GetAllHotels()
    {
        return GetHotelDtos(hotels);
    }



    [HttpGet]
    [Route("{id}")]
    public ActionResult<HotelDto> GetHotelById(int id)
    {
        var result = GetHotelDtos(hotels.Where(x => x.Id == id)).FirstOrDefault();
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpGet]
    [Route("manager/{userId}")]
    public ActionResult<IEnumerable<HotelDto>> GetHotelsByManagerId(int userId)
    {
        var result = GetHotelDtos(hotels.Where(x => x.ManagerId == userId)).ToList();
        if (result == null || result.Count == 0)
        {
            return NotFound();
        }

        return Ok(result);
    }


    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<HotelDto> CreateHotel(HotelDto dto)
    {
        if (IsInvalid(dto))
        {
            return BadRequest();
        }

        var hotel = new Hotel
        {
            Name = dto.Name,
            StreetAddress = dto.StreetAddress,
            City = dto.City,
            State = dto.State,
            ZipCode = dto.ZipCode,
            ManagerId = dto.ManagerId
        };
        hotels.Add(hotel);

        dataContext.SaveChanges();

        dto.Id = hotel.Id;

        return CreatedAtAction(nameof(GetHotelById), new { id = dto.Id }, dto);
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public ActionResult<HotelDto> UpdateHotel(int id, HotelDto dto)
    {
        if (IsInvalid(dto))
        {
            return BadRequest();
        }

        var hotel = hotels.FirstOrDefault(x => x.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != hotel.ManagerId)
        {
            return Forbid();
        }

        hotel.Name = dto.Name;
        hotel.StreetAddress = dto.StreetAddress;
        hotel.City = dto.City;
        hotel.State = dto.State;
        hotel.ZipCode = dto.ZipCode;
        if (User.IsInRole(RoleNames.Admin))
        {
            hotel.ManagerId = dto.ManagerId;
        }

        dataContext.SaveChanges();

        dto.Id = hotel.Id;

        return Ok(dto);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public ActionResult DeleteHotel(int id)
    {
        var hotel = hotels.FirstOrDefault(x => x.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != hotel.ManagerId)
        {
            return Forbid();
        }

        hotels.Remove(hotel);

        dataContext.SaveChanges();

        return Ok();
    }

    private bool InvalidManagerId(int? managerId)
    {
        if (managerId == null)
        {
            return false;
        }

        if (!User.IsInRole(RoleNames.Admin))
        {
            // only admins can change manager ids anyway
            return false;
        }
        return !dataContext.Set<User>().Any(x => x.Id == managerId);
    }

    private bool IsInvalid(HotelDto dto)
    {
        return string.IsNullOrWhiteSpace(dto.Name) ||
               dto.Name.Length > 120 ||
               string.IsNullOrWhiteSpace(dto.StreetAddress) ||
               string.IsNullOrWhiteSpace(dto.City) ||
               string.IsNullOrWhiteSpace(dto.State) ||
               string.IsNullOrWhiteSpace(dto.ZipCode) ||
               InvalidManagerId(dto.ManagerId);
    }

    private static IQueryable<HotelDto> GetHotelDtos(IQueryable<Hotel> hotels)
    {
        return hotels
            .Select(x => new HotelDto
            {
                Id = x.Id,
                HotelCode = x.HotelCode,
                Name = x.Name,
                StreetAddress = x.StreetAddress,
                City = x.City,
                State = x.State,
                ZipCode = x.ZipCode,
                ManagerId = x.ManagerId
            });
    }
}
