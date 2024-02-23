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
        
        var user=await userManager.FindByEmailAsync(dto.Email);
        if(user != null)
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
            Email= user.Email,
            Roles = (await userManager.GetRolesAsync(user)).ToArray()
        };

        return Ok(userDto);
    }


    [HttpPost("customer")] //customer registration
    public async Task<ActionResult<CreateUserDto>> RegisterUser(CreateUserDto dto)
    {
        var existingUser = await userManager.FindByNameAsync(dto.UserName);
        if (existingUser != null)
        {
            return BadRequest($"The username {dto.UserName} is already taken");
        }

        var userCreated = new User
        {
            UserName = dto.UserName,
        };

        var validatePassword = await userManager.CreateAsync(userCreated, dto.Password);

        if (!validatePassword.Succeeded)
        {
            return BadRequest($"The password is not strong enough. Please use a strong password.");
        }

        var newUser = new UserDto
        {
            Id = userCreated.Id,
            UserName = dto.UserName,
            Roles = ["Customer"],
            Email = dto.Email,
        };

        return Ok(newUser);
    }



}
