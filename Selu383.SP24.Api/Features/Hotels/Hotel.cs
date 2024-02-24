using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Features.Hotels;

public class Hotel
{
    public int Id { get; set; }
    public string HotelCode { get; set; }

    public string Name { get; set; }

    public string Address { get; set; }

    public int? ManagerId { get; set; }
    public virtual User Manager { get; set; }
    public ICollection<Room> Rooms { get; set; }
}
