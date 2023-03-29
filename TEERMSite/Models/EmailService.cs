using System.Net;
using System.Net.Mail;
using System.Text;

namespace TEERMSite.Models
{
    public class EmailService : IDisposable
    {
        public EmailService() 
        {
            smtpClient = new SmtpClient();
            mail = new MailMessage();
            mail.IsBodyHtml = true;
            mail.Subject = "LNTU TEERM Service";
            mail.From = new MailAddress("service@LNTU-TEERM.com");
            mail.BodyEncoding = Encoding.UTF8;
            mail.Body = "<html>" +
                "<h2>Ласкаво Просимо!</h2>" +
                "Тільки що ви були зареєстровані на www.Teerm.lntu.edu.ua!" +
                "</html>";
            smtpClient.Port = 587;
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("service@LNTU-TEERM.com", "");
        }
        public MailMessage mail { get; set; }
        public SmtpClient smtpClient { get; set; }

        public void SendWelcomeEmail()
        {
            smtpClient.SendMailAsync(mail);
            Dispose();
        }
        public void Dispose()
        {
            mail.Dispose();
        }
        

    }
}
