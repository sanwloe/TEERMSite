using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;

namespace TEERMSite.Models
{
    public static class AuthService
    {
        public static bool TokenIsValid(User user)
        {
            var rsa = new RSACryptoServiceProvider();

            rsa.FromXmlString(CryptService.GetValue("publickey"));

            var tokenvalidator = new TokenValidationParameters
            {
                ValidAudience = "memberconference",
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new RsaSecurityKey(rsa),
                ValidateIssuer = true,
                ValidIssuer = "backendtermmsite",
            };

            try
            {
                var handler = new JwtSecurityTokenHandler();

                if (user != null)
                {
                    handler.ValidateToken(user.Token, tokenvalidator, out var result);
                    return true;
                }
                else
                {
                    throw new InvalidOperationException();
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
