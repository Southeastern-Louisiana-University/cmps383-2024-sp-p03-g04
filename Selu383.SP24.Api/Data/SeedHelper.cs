using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Reservations;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);
        await AddHotels(dataContext);
        await AddRooms(dataContext);
        await AddReservations(dataContext);

    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi",
            Email = "galkadi@gmail.com"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob",
            Email = "bob@gmail.com"

        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue",
            Email = "sue@gmail.com"

        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddHotels(DataContext dataContext)
    {
        var hotels = dataContext.Set<Hotel>();

        if (await hotels.AnyAsync())
        {
            return;
        }

        var hotelData = new List<Hotel>
{
    new Hotel
    {
        HotelCode = "enstay1",
        Name = "EnStay Baronne",
        StreetAddress = "225 Baronne St",
        City = "New Orleans",
        State = "LA",
        ZipCode = "70112"
    },
    new Hotel
    {
        HotelCode = "enstay2",
        Name = "EnStay Esplanade",
        StreetAddress = "405 Esplanade Ave",
        City = "New Orleans",
        State = "LA",
        ZipCode = "70116"
    },
    new Hotel
    {
        HotelCode = "enstay3",
        Name = "EnStay Convention",
        StreetAddress = "200 Convention St",
        City = "Baton Rouge",
        State = "LA",
        ZipCode = "70801"
    }
};

        foreach (var hotel in hotelData)
        {
            hotels.Add(hotel);
        }

        await dataContext.SaveChangesAsync();
    }



    private static async Task AddRooms(DataContext dataContext)
    {
        var rooms = dataContext.Set<Room>();
        var hotels = dataContext.Set<Hotel>();

        if (await rooms.AnyAsync())
        {
            return;
        }

        var roomTypes = new RoomType[] { RoomType.Single, RoomType.Single, RoomType.Double, RoomType.Double };

        var allhotel = await hotels.ToListAsync();
        foreach (var hotel in allhotel)
        {

            for (int i = 0; i < 4; i++)
            {
                var isPremium = i % 2 == 0;
                var description = isPremium ? "Premium room with snacks, extra plus comfy pillows, comforter and bigger TV" : "Standard room";
                var price = isPremium ? 200 : 100;
                dataContext.Set<Room>()
               .Add(new Room
               {
                   Type = roomTypes[i],
                   Number = 101 + i,
                   IsPremium = isPremium,
                   Description = description,
                   Price = price,
                   Capacity = roomTypes[i] == RoomType.Single ? 2 : 4,
                   IsClean = true,
                   IsOccupied = false,
                   HotelId = hotel.Id

               });

            }
        }
        await dataContext.SaveChangesAsync();


    }

    private static async Task AddReservations(DataContext dataContext)
    {
        var reservations = dataContext.Set<Reservation>();

        if (await reservations.AnyAsync())
        {
            return;
        }


        for (int i = 0; i < 3; i++)
        {
            dataContext.Set<Reservation>()
                .Add(new Reservation
                {
                    GuestId = i,
                    HotelId = i + 1,
                    RoomId =  i + 1,
                    CheckInDate = DateTime.Now.AddDays(i * 7),
                    CheckOutDate = DateTime.Now.AddDays((i * 7) + 7),
                    NumberOfGuests = i + 1,
                    IsPaid = true
                });
        }
        await dataContext.SaveChangesAsync();


    }

}
