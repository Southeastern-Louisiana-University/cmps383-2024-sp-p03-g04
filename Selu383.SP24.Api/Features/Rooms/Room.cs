namespace Selu383.SP24.Api.Features.Rooms
{
    public enum RoomType
    {
        Single, Double, Studio
    }

    public class Room
    {
        public int Id { get; set; }
        public RoomType Type { get; set; }
        public int Number { get; set; }
        public bool IsPremium { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int Capacity { get; set; }
    }

}
