using BCrypt.Net;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Cryptography.Algorithms;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace TEERMSite.Models
{
    public class CryptService
    {
        public static string Encrypt(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        public static bool Verify(string password, string hpassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hpassword);
        }
        public static string NewToken(string email,string academicrank,string section,string TitleReport)
        {
            var rsaprivatekey = new RSACryptoServiceProvider();
            
            rsaprivatekey.FromXmlString(GetValue("privatekey"));

            var claims = new Claim[]
            {
                new Claim("email", email),
                new Claim("academicrank", academicrank),
                new Claim("section", section),
                new Claim("titlereport", TitleReport)
            };


            var jwtToken = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddDays(1),
                claims: claims,
                signingCredentials: new SigningCredentials(new RsaSecurityKey(rsaprivatekey), SecurityAlgorithms.RsaSha256),
                issuer : "backendtermmsite",
                audience: "memberconference"
                );


            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            return handler.WriteToken(jwtToken);
        }
        public static string GetValue(string field)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

            return configuration[field];
        }
    }
}
