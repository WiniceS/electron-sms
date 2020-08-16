using System;
using Microsoft.EntityFrameworkCore;

namespace Common
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
    }
}
