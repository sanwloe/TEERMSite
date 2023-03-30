using System.ComponentModel.DataAnnotations;

namespace TEERMSite.Models
{
    public class Role
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Test {get;set;}
    }
}
