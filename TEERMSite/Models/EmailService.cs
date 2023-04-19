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
                Credentials = new NetworkCredential(CryptService.GetValue("emailservice"), CryptService.GetValue("emailapppass")),
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
        public async Task<bool> SendUser(string email,User user)
        {
            try
            {
                _messageRecoveryPass.IsBodyHtml = true;
                _messageRecoveryPass.BodyEncoding = Encoding.UTF8;
                _messageRecoveryPass.Body = $"<h3>Новий користувач :<h3>" +
                    $"<p>ПІБ : {user.FullName}</p>" +
                    $"<p>E-mail : {user.Email}</p>" +
                    $"<p>Секція на яку подавалась доповідь : {user.Section}</p>" +
                    $"<p>Посада : {user.JobTitle}</p>" +
                    $"<p>Академічний статус : {user.AcademicDegree}</p>" +
                    $"<p>Вчене звання : {user.AcademicRank}</p>" +
                    $"<p>Формат участі : {user.ParticipationFormat}</p>" +
                    $"<p>Дата реєстрації : {user.DateRegistration}</p>" +
                    $"<p>Платіжна інформація : {user.PayInfo}</p>" +
                    $"<p>Телефон : {user.Phone}</p>" +
                    $"<p>Тема доповіді : {user.TitleReport}</p>" +
                    $"<p>Місце роботи : {user.WorkPlace}</p>";
                _messageRecoveryPass.Subject = "TEERMM Service";
                _messageRecoveryPass.From = new MailAddress("termm.service@gmail.com");
                _messageRecoveryPass.To.Add(new MailAddress(email));


                await _smtpClient.SendMailAsync(_messageRecoveryPass);

                return true;
            }
            catch (Exception ex)
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
