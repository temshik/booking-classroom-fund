using ApiGateway.AppDependenciesConfiguration;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.ConfigureDependencies();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CorsPolicy");

await app.UseOcelot();

app.UseAuthorization();

app.Run();
