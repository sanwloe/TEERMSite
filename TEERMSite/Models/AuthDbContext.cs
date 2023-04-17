using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using System.ComponentModel.DataAnnotations.Schema;

namespace TEERMSite.Models
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext() {  }

        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) 
        {
            Database.Migrate();

            foreach (var item in InsertAdministrators())
            {
                if(Users.FirstOrDefault(u => u.Email == item.Email) == null)
                {
                    this.Users.Add(item);
                    this.SaveChanges();
                }             
            }

            
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>().HasData(new Role[] 
            {
                new Role() { Name = "ADMIN" ,Id = 1},
                new Role() { Name = "USER", Id = 2 }
            });
            //modelBuilder.Entity<User>().HasData(InsertAdministrators());
            
                
        }
        
        private User[] InsertAdministrators()
        {
            return new List<User>()
            {
                new User {
                    FullName = "Sanya",
                    AcademicDegree = "",
                    Section = "",
                    AcademicRank = "",
                    Email = "oleksandr.ill.x@gmail.com",
                    Phone = "+380977012344",
                    Password = CryptService.Encrypt("iadministrator2023@"),
                    Token = CryptService.NewToken("oleksandr.ill.x@gmail.com","null","null","null",DateTime.UtcNow.AddDays(1)),
                    DateRegistration = DateTime.Now,
                    TitleReport = "",
                    JobTitle = "",
                    WorkPlace = "",
                    ParticipationFormat = "",
                    RoleId = 1,
                    Role = Roles.FirstOrDefault(r => r.Name == "ADMIN"),
                }
            }.ToArray();
        }
    }
}
