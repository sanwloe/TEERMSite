using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using TEERMSite.Models;

namespace TEERMSite
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews().AddJsonOptions(p =>
            {
                p.JsonSerializerOptions.Converters.Add(new IgnoreMethodBaseException());
            });
            builder.Services.AddDbContext<AuthDbContext>((options) =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("connectString"));
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("https://localhost:44403", "https://localhost:1555", "https://localhost:4200", "https://termm.lntu.edu.ua").AllowAnyMethod().AllowAnyHeader());
            });
            

            var app = builder.Build();
            


            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseCors("AllowSpecificOrigin");

                app.UseHttpsRedirection();
                app.UseStaticFiles();

                app.UseCors("AllowSpecificOrigin");
                app.UseRouting();


                app.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors("AllowSpecificOrigin");
            app.UseRouting();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");
            app.Run();
        }
    }
}