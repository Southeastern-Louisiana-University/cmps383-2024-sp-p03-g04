﻿namespace Selu383.SP24.Api.Features.Rooms
{
    public class RoomDto
    {
        public int Id { get; set; }
        public RoomType Type { get; set; }
        public int Number { get; set; }
        public bool IsPremium { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int Capacity { get; set; }
        public bool IsClean { get; set; }
        public bool IsOccupied { get; set; }
        public int HotelId { get; set; }


        public bool IsAvailable()
        {
            return IsClean && !IsOccupied;
        }
    }
}
