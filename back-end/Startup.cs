using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Swagger;
using Common;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace back_end
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //  注册swagger
            services.AddSwaggerSetup();
            
            services.AddControllers();
            
            //数据库设置
            services.AddDbContextPool<AppDbContext>(options => options
                // replace with your connection string
                .UseMySql(Configuration.GetConnectionString("ConnectionStrings"), mySqlOptions => mySqlOptions
                    // replace with your Server Version and Type
                    .ServerVersion(new Version(8, 0, 18), ServerType.MySql)
                ));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"/swagger/V1/swagger.json","SuperMarketSystemApi V1");
                c.RoutePrefix = "apidoc";
            });
            
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}