using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TEERMSite.Models;

namespace TEERMSite.Controllers
{
    /*[Route("api/[controller]")]
    [ApiController]*/
    public class AuthController : ControllerBase
    {
        public AuthDbContext _authdbcontext;
        public AuthController(AuthDbContext authDbContext)
        {
            _authdbcontext = authDbContext;
        }
        [HttpPost("sign-up")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email) != null)
            {
                return Conflict("This user already exists!");
            }
            if (await _authdbcontext.Users.FirstOrDefaultAsync(u => u.PhoneNumber == user.PhoneNumber) != null)
            {
                return Conflict("This user already exists");
            }
            User newuser = new User();

            newuser.Email = user.Email;

            newuser.PhoneNumber = user.PhoneNumber;

            newuser.UserName = user.UserName;

            newuser.TopicReport = user.TopicReport;

            newuser.File = user.File;

            newuser.AcademicStatus = user.AcademicStatus;

            newuser.MailAddress = user.MailAddress;

            await _authdbcontext.Users.AddAsync(newuser);

            await _authdbcontext.SaveChangesAsync();

            return Ok(true);
        }
    }
}
