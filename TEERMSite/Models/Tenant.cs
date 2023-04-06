using System.ComponentModel.DataAnnotations;

namespace TEERMSite.Models
{
    public class Tenant
    {
        [Key,Required]
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
