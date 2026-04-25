using HomeCarePlanner.Application;
using HomeCarePlanner.Infrastructure;
using HomeCarePlanner.Infrastructure.Persistence;
using HomeCarePlanner.Api.Endpoints;
using HomeCarePlanner.Api.Middleware;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
Log.Logger = new LoggerConfiguration().ReadFrom
    .Configuration(builder.Configuration).Enrich.FromLogContext().WriteTo
    .Console().CreateLogger();
builder.Host.UseSerilog();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "HomeCare Planner API", Version = "v1" });
    var xmlPath = Path.Combine(AppContext.BaseDirectory, "HomeCarePlanner.Api.xml");
    if (File.Exists(xmlPath)) c.IncludeXmlComments(xmlPath);
});
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddCors(opt => opt.AddPolicy("AllowFrontend",
    p => p.WithOrigins(
            "http://localhost:5173",
            "http://192.168.1.100:5173",
            "http://*.local:5173")
        .AllowAnyMethod()
        .AllowAnyHeader().AllowCredentials()));
builder.Services.AddHealthChecks();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();  // миграции при старте
}

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseRouting();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapNotesEndpoints();
app.MapNotificationsEndpoints();
app.MapHealthChecks("/health");
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.Run();