using ApiGateway.AppDependenciesConfiguration;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.ConfigureDependencies();

var app = builder.Build();

await app.UseOcelot();

app.UseAuthorization();

app.UseHttpsRedirection();

app.Run();