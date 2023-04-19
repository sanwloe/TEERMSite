using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
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
                newuser.PayInfo = user.PayInfo;
                newuser.RoleId = 2;

                newuser.Role = await _authdbcontext.Roles.FirstOrDefaultAsync((r) => r.Id == 2);

                await _authdbcontext.Users.AddAsync(newuser);

                await _authdbcontext.SaveChangesAsync();

                EmailService emailService = new EmailService();

                await emailService.SendUser("samchuk204@gmail.com", newuser);

                newuser.Password = "1";

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

                        dbuser.Password = "1";
                        
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

                dbuser.Password = "1";

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

                    dbuser.Password = "1";

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
                    string token = CryptService.NewToken(dbuser.Email, dbuser.AcademicRank, dbuser.Section, dbuser.TitleReport, DateTime.UtcNow.AddMinutes(10));

                    EmailService emailService = new EmailService();

                    //

                    string recoverylink = "https://localhost:44403/auth/reset-password/" + token;

                    try
                    {
                        var result = emailService.SendRecovery(dbuser.Email,recoverylink);

                        if (result.Exception != null)
                        {
                            return BadRequest(false);
                        }

                        return Ok(result.Result);
                    }
                    catch (Exception)
                    {
                        return BadRequest(false);
                    }
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
                var dbuser = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

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
        [HttpPost("get-all-users")]
        public async Task<ActionResult> GetUsersAsync([FromBody] User user)
        {
            var dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Id == user.Id);

            if(dbuser.Role.Name == "ADMIN")
            {
                var result = await _authdbcontext.Users.ToArrayAsync();

                return Ok(result);

            }
            return BadRequest();
        }
        [HttpPost("get-user")]
        public async Task<ActionResult> GetUserAsync([FromBody] User user)
        {
            var dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Id == user.Id);

            if (dbuser.Role.Name == "ADMIN" && dbuser!=null)
            {
                var result = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

                if (result != null)
                {
                    return Ok(result);
                }

                return NotFound();

            }
            return BadRequest();
        }
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] User[] userlist)
        {
            var admin = userlist[0];

            var changerequestuser = userlist[1];

            var dbuser = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Id == admin.Id);

            var checkemail = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == changerequestuser.Email);

            if (checkemail != null)
            {
                if (checkemail.Id != changerequestuser.Id)
                {
                    return Conflict("This e-mail is exists");
                }
            }

            if (dbuser.Role.Name == "ADMIN" && changerequestuser!=null)
            {
                try
                {
                    var updateuser = await _authdbcontext.Users.FirstOrDefaultAsync(x => x.Id == changerequestuser.Id);

                    updateuser.Email = changerequestuser.Email;
                    updateuser.PayInfo = changerequestuser.PayInfo;
                    updateuser.WorkPlace = changerequestuser.WorkPlace;
                    updateuser.FullName = changerequestuser.FullName;
                    updateuser.AcademicDegree = changerequestuser.AcademicDegree;
                    updateuser.JobTitle = changerequestuser.JobTitle;
                    updateuser.TitleReport = changerequestuser.TitleReport;
                    updateuser.AcademicRank = changerequestuser.AcademicRank;
                    updateuser.ParticipationFormat = changerequestuser.ParticipationFormat;
                    updateuser.Phone = changerequestuser.Phone;
                    updateuser.Section = changerequestuser.Section;

                    _authdbcontext.Update(updateuser);

                    await _authdbcontext.SaveChangesAsync();

                    return Ok();
                }
                catch (Exception ex)
                {
                    return Conflict(ex.Message);
                    
                }


               
            }

            return BadRequest();
        }
        [HttpPost("delete-user")]
        public async Task<IActionResult> DeleteUser([FromBody] User[] userlist)
        {
            var adminuser = userlist[0];

            var deleteuser = userlist[1];

            var checkadmin = await _authdbcontext.Users.Include(x => x.Role).FirstOrDefaultAsync(u => u.Id == adminuser.Id);

            var checkdeleteuser = await _authdbcontext.Users.FirstOrDefaultAsync(u => u.Email == deleteuser.Email);

            if (checkadmin != null && checkdeleteuser!=null) 
            {
                if(checkadmin.Role.Name == "ADMIN" )
                {
                    
                    _authdbcontext.Users.Remove(checkdeleteuser);

                    await _authdbcontext.SaveChangesAsync();

                    return Ok();
                }
            }

            return BadRequest(checkdeleteuser);
        }
    }
}
