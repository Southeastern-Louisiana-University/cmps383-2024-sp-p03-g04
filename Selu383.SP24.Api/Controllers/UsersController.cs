using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;

namespace Selu383.SP24.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> userManager;

    public UsersController(UserManager<User> userManager)
    {
        this.userManager = userManager;
    }

    [HttpPost("employee")] //employee registration                                            
    [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
    {
        using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var user = await userManager.FindByEmailAsync(dto.Email);
        if (user != null)
        {
            return BadRequest("The user with this email already exists. Please use a different email");
        }

        var newUser = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
        };
        var createResult = await userManager.CreateAsync(newUser, dto.Password);
        if (!createResult.Succeeded)
        {
            return BadRequest();
        }

        try
        {
            var roleResult = await userManager.AddToRolesAsync(newUser, dto.Roles);
            if (!roleResult.Succeeded)
            {
                return BadRequest();
            }
        }
        catch (InvalidOperationException e) when (e.Message.StartsWith("Role") && e.Message.EndsWith("does not exist."))
        {
            return BadRequest();
        }

        transaction.Complete();

        return Ok(new UserDto
        {
            Id = newUser.Id,
            Roles = dto.Roles,
            UserName = newUser.UserName,
            Email = newUser.Email,
        });
    }

    [HttpGet] //get all employees
    [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    {
        var users = await userManager.Users.ToListAsync();

        var userDtos = users.Select(user => new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Roles = userManager.GetRolesAsync(user).Result.ToArray(),
        });

        return Ok(userDtos);
    }

    [HttpGet("{email}")]
    [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<UserDto>> GetUserByIdorName(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return NotFound();
        }

        // Create the user DTO
        var userDto = new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Roles = (await userManager.GetRolesAsync(user)).ToArray()
        };

        return Ok(userDto);
    }

    [HttpPut("update/{id}")]
    [Authorize(Roles = RoleNames.User + "," + RoleNames.Admin)]
    public async Task<ActionResult<UserDto>> UpdateUser(string id, UpdateUserDto dto)
    {
        var user = await userManager.FindByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        user.UserName = dto.UserName;
        user.Email = dto.Email;

        var updateResult = await userManager.UpdateAsync(user);

        if (!updateResult.Succeeded)
        {
            return BadRequest();
        }

        return Ok(new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Roles = (await userManager.GetRolesAsync(user)).ToArray()
        });
    }


    [HttpPost("customer")] //customer registration
    public async Task<ActionResult<CreateUserDto>> RegisterUser(CreateUserDto dto)
    {
        var checkUser = await userManager.FindByNameAsync(dto.UserName);
        if (checkUser != null)
        {
            return BadRequest($"The username {dto.UserName} is already taken");
        }

        var checkEmail = await userManager.FindByEmailAsync(dto.Email);
        if (checkEmail != null)
        {
            return BadRequest($"The Email {dto.Email} is already taken");
        }

        var userCreated = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
            SecurityStamp = Guid.NewGuid().ToString() // Generate a random security stamp

        };
        var validatePassword = await userManager.CreateAsync(userCreated, dto.Password);

        if (!validatePassword.Succeeded)
        {
            return BadRequest($"The password is not strong enough. Please use a strong password.");
        }

        var roleResult = await userManager.AddToRoleAsync(userCreated, "User");
        if (!roleResult.Succeeded)
        {
            return BadRequest("Failed to add role to user.");
        }

        var newUser = new UserDto
        {
            Id = userCreated.Id,
            UserName = dto.UserName,
            Roles = new[] { "User" },
            Email = dto.Email,
        };


        return Ok(newUser);
    }



}

[HttpGet("{email}")]
[Authorize(Roles = RoleNames.Admin)]
public async Task<ActionResult<UserDto>> GetUserByIdorName(string email)
{
    var user = await userManager.FindByEmailAsync(email);

    if (user == null)
    {
        return NotFound();
    }

    // Create the user DTO
    var userDto = new UserDto
    {
        Id = user.Id,
        UserName = user.UserName,
        Email = user.Email,
        Roles = (await userManager.GetRolesAsync(user)).ToArray()
    };

    return Ok(userDto);
}