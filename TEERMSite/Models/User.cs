using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace TEERMSite.Models
{
    public class User
    {
        [Key, Required]
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? AcademicDegree { get; set; }
        public string? AcademicRank { get; set; }
        public string? WorkPlace { get; set; }
        public string? JobTitle { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        public string? TitleReport { get; set; }
        public string? Section { get; set; }
        public string? ParticipationFormat { get; set; }
        public DateTime? DateRegistration { get; set; }
        public string? PayInfo { get; set; }
        public int? RoleId { get; set; }
        public Role? Role { get; set; }
        [NotMapped]
        public string? Token { get; set; }
    }
}
