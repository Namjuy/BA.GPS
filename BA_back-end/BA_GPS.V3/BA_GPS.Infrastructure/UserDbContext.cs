using System;
using BA_GPS.Domain.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// 
/// </summary>
/// <Modified>
/// Name    Date    Comments
/// Duypn   11/03/2024 Created
/// </Modified>
namespace BA_GPS.Infrastructure
{
    public class UserDbContext : DbContext
    {

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

    }
}

