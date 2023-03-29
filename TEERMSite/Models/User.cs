using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace TEERMSite.Models
{
    public class User
    {
        [Key, Required]
        public int Id { get; set; }
        public string Email { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? AcademicStatus { get; set; }
        public string? TopicReport { get; set; }
        public string? MailAddress { get; set; }
        public string? FormOfParticipation { get; set; }
        public byte[]? File { get; set; }
    }
}
