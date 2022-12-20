#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/CatalogService.Api/CatalogService.Api.csproj", "src/CatalogService.Api/"]
COPY ["src/CatalogService.Contracts/CatalogService.Contracts.csproj", "src/CatalogService.Contracts/"]
COPY ["src/CatalogService.DatabaseMigratoe/CatalogService.DatabaseMigratoe.csproj", "src/CatalogService.DatabaseMigratoe/"]
COPY ["src/CatalogService.DataAccess/CatalogService.DataAccess.csproj", "src/CatalogService.DataAccess/"]
COPY ["src/CatalogService.BusinessLogic/CatalogService.BusinessLogic.csproj", "src/CatalogService.BusinessLogic/"]
COPY ["src/RabbitMQ.Producer/RabbitMQ.Producer.csproj", "src/RabbitMQ.Producer/"]
RUN dotnet restore "src/CatalogService.Api/CatalogService.Api.csproj"
COPY . .
WORKDIR "/src/src/CatalogService.Api"
RUN dotnet build "CatalogService.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CatalogService.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CatalogService.Api.dll"]