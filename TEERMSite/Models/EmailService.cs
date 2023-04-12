using System.Net;
using System.Net.Mail;
using System.Text;

namespace TEERMSite.Models
{
    public class EmailService : IDisposable
    {
        MailMessage _messageRecoveryPass;
        SmtpClient _smtpClient;
        
        public EmailService()
        {
            _smtpClient = new SmtpClient()
            {
                UseDefaultCredentials = false,
                Host = "smtp.gmail.com",
                Port = 587,               
                EnableSsl = true,
                Credentials = new NetworkCredential("termm.service@gmail.com", "lgjmdrmruijedtao"),
            };
            _messageRecoveryPass = new MailMessage();
            
        }
        public async Task<bool> SendRecovery(string email,string origin)
        {
            try
            {
                _messageRecoveryPass.IsBodyHtml = true;
                _messageRecoveryPass.BodyEncoding = Encoding.UTF8;
                _messageRecoveryPass.Body = $"<h3>Your recovery link : <br><a href='{origin}'>Click!<h3>";
                _messageRecoveryPass.Subject = "TEERMM Service";
                _messageRecoveryPass.From = new MailAddress("termm.service@gmail.com");
                _messageRecoveryPass.To.Add(new MailAddress(email));


                await _smtpClient.SendMailAsync(_messageRecoveryPass);

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
        public void Dispose()
        {
            _smtpClient.Dispose();
        }
        

    }
}
