using ProjectAssignmentManager.API.Models;
using ProjectAssignmentManager.API.Repositories;
using ProjectAssignmentManager.API.Services;
using ProjectAssignmentManager.API.Middleware;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure OpenAPI
builder.Services.AddOpenApi();

// Configure CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Register repositories as singletons (thread-safe with SemaphoreSlim)
builder.Services.AddSingleton<IRepository<Developer>>(sp => 
    new JsonRepository<Developer>("developers.json"));
builder.Services.AddSingleton<IRepository<Project>>(sp => 
    new JsonRepository<Project>("projects.json"));
builder.Services.AddSingleton<IRepository<DeveloperProject>>(sp => 
    new JsonRepository<DeveloperProject>("developer-projects.json"));

// Register services
builder.Services.AddScoped<IDeveloperService, DeveloperService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IAssignmentService, AssignmentService>();

var app = builder.Build();

// Configure OpenAPI UI
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Global exception handling middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
