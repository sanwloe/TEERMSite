﻿using Microsoft.EntityFrameworkCore;

namespace TEERMSite.Models
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext() { }

        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) 
        {
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
                
        }

    }
}
