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

    // Auto-start Angular dev server
    StartAngularDevServer();
}

// Global exception handling middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();

// Method to automatically start Angular dev server
void StartAngularDevServer()
{
    var angularPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "ProjectAssignmentManager.UI");

    if (!Directory.Exists(angularPath))
    {
        Console.WriteLine("??  Angular project not found at: " + angularPath);
        return;
    }

    // Check if node_modules exists
    if (!Directory.Exists(Path.Combine(angularPath, "node_modules")))
    {
        Console.WriteLine("??  Angular dependencies not installed. Run 'npm install' in UI folder.");
        return;
    }

    try
    {
        var startInfo = new ProcessStartInfo
        {
            FileName = "cmd.exe",
            Arguments = "/c ng serve --open",
            WorkingDirectory = angularPath,
            UseShellExecute = true,
            CreateNoWindow = false
        };

        Process.Start(startInfo);
        Console.WriteLine("? Angular dev server starting...");
        Console.WriteLine("? Frontend will open at: http://localhost:4200/");
        Console.WriteLine("? Backend API running at: https://localhost:5001/");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"??  Failed to start Angular: {ex.Message}");
        Console.WriteLine("   You can start it manually: cd ProjectAssignmentManager.UI && ng serve");
    }
}
