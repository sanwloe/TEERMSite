using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TEERMSite.Models;

namespace TEERMSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            try
            {
                if (await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email) != null)
                {
                    return Conflict("This user already exists!");
                }
                User newuser = new User();

                newuser.FullName = user.FullName;
                newuser.AcademicDegree = user.AcademicDegree;
                newuser.Section = user.Section;
                newuser.AcademicRank = user.AcademicRank;
                newuser.Email = user.Email;
                newuser.Phone = user.Phone;
                newuser.Password = CryptService.Encrypt(user.Password);
                newuser.DateRegistration = DateTime.Now;
                newuser.TitleReport = user.TitleReport;
                newuser.Token = CryptService.NewToken(user.Email, user.AcademicRank, user.Section, user.TitleReport);
                newuser.JobTitle = user.JobTitle;
                newuser.WorkPlace = user.WorkPlace;
                newuser.ParticipationFormat = user.ParticipationFormat;
                newuser.RoleId = 2;
                
                newuser.Role = await _authdbcontext.Roles.FirstOrDefaultAsync((r) => r.Id == 2);
                newuser.Tenant = new Tenant() { Created = DateTime.UtcNow, LastUpdated = DateTime.UtcNow };


                await _authdbcontext.Users.AddAsync(newuser);

                await _authdbcontext.SaveChangesAsync();

                return Ok(newuser);
            }
            catch(Exception ex) 
            {
                return Conflict($"{ex.Message}");
            }
        }
        [HttpPost("sign-in")]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            try
            {
                var dbuser = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

                if (dbuser != null)
                {
                    if(CryptService.Verify(user.Password,dbuser.Password))
                    {
                        user = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == dbuser.Email);

                        user.Token = CryptService.NewToken(user.Email,user.AcademicRank,user.Section,user.TitleReport);

                        user.Role = await _authdbcontext.Roles.FirstOrDefaultAsync(r => r.Id == user.RoleId);

                        return Ok(user);
                    }
                    return Conflict("Password Error");
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
