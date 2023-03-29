using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TEERMSite.Models
{
    public class CryptService
    {
        /*public static string Encrypt(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        public static bool Verify(string password,string hpassword) 
        {
            return BCrypt.Net.BCrypt.Verify(password,hpassword);
        }*/
        public static string NewToken(string email)
        {
            var claims = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim("email", email),
                    }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("conferenceskeyrandomfromstudent")), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(claims);
            return handler.WriteToken(token);
        }
    }
}
