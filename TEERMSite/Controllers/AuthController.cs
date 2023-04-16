using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using TEERMSite.Models;

namespace TEERMSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthDbContext _authdbcontext;
        public ConfigurationManager _configuration;
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
                newuser.Token = CryptService.NewToken(user.Email, user.AcademicRank, user.Section, user.TitleReport,DateTime.UtcNow.AddDays(1));
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
            catch (Exception ex)
            {
                return Conflict($"{ex.Message}");
            }
        }
        [HttpPost("sign-in")]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            try
            {
                var dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Email == user.Email);

                if (dbuser != null)
                {
                    if (CryptService.Verify(user.Password, dbuser.Password))
                    {
                        dbuser.Token = CryptService.NewToken(dbuser.Email, dbuser.AcademicRank, dbuser.Section, dbuser.TitleReport,DateTime.UtcNow.AddDays(1));

                        return Ok(dbuser);
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
        [HttpPost("check-token")]
        public async Task<ActionResult> TokenCheckValid([FromBody] User user)
        {
            if (AuthService.TokenIsValid(user))
            {
                var dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Email == user.Email);

                dbuser.Token = CryptService.NewToken(dbuser.Email, dbuser.AcademicRank, dbuser.Section, dbuser.TitleReport,DateTime.UtcNow.AddDays(1));

                return Ok(dbuser);
            }
            else
            {
                return Conflict("Session is not valid!");
            }


            
        }
        [HttpPost("user-update-info")]
        public async Task<ActionResult> UserUpdateInfo([FromBody] User user)
        {
            var dbuser = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if(dbuser != null) 
            {
                if (AuthService.TokenIsValid(user))
                {
                    dbuser.FullName = user.FullName;
                    dbuser.AcademicRank = user.AcademicRank;
                    dbuser.AcademicDegree = user.AcademicDegree;
                    dbuser.JobTitle = user.JobTitle;
                    dbuser.Section = user.Section;
                    dbuser.WorkPlace = user.WorkPlace;
                    dbuser.TitleReport = user.TitleReport;

                    _authdbcontext.Users.Update(dbuser);

                    _authdbcontext.SaveChanges();

                    dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Email == user.Email);

                    dbuser.Token = CryptService.NewToken(dbuser.Email, dbuser.AcademicRank, dbuser.Section, dbuser.TitleReport,DateTime.UtcNow.AddDays(1));

                    return Ok(dbuser);
                }
                return Conflict("Session is not valid");
            }
            return NotFound("error");
        }
        [HttpPost("recovery-password")]
        public async Task <IActionResult> SendRecoveryLink([FromBody] User user)
        {
            var dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Email == user.Email);

            if (dbuser != null) 
            {
                try
                {
                    string token = CryptService.NewToken(dbuser.Email, dbuser.AcademicRank, dbuser.Section, dbuser.TitleReport, DateTime.UtcNow.AddMinutes(30));

                    EmailService emailService = new EmailService();

                    //

                    string recoverylink = "https://localhost:44403/auth/reset-password/" + token;

                    var result = emailService.SendRecovery(dbuser.Email,recoverylink);

                    return Ok(result.Result);
                }
                catch (Exception ex)
                {
                    return Conflict(ex.Message);
                }
                

            }

            return BadRequest();
        }
        [HttpPost("reset-password")]
        public async Task<ActionResult> ResetPassword([FromBody] User user)
        {
            if(AuthService.TokenIsValid(user))
            {
                var dbuser = _authdbcontext.Users.FirstOrDefault(u => u.Email == user.Email);

                if (dbuser!=null)
                {
                    dbuser.Password = CryptService.Encrypt(user.Password);

                    _authdbcontext.Users.Update(dbuser);

                    _authdbcontext.SaveChanges();

                    return Ok();
                }
                return NotFound("User not found");
            }

            return Conflict("Token no valid");
        }
    }
}
