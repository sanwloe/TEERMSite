using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TEERMSite.Migrations
{
    /// <inheritdoc />
    public partial class Versions1001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ParticipationFormat",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParticipationFormat",
                table: "Users");
        }
    }
}
