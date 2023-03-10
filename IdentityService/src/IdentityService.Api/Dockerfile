#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/IdentityService.Api/IdentityService.Api.csproj", "src/IdentityService.Api/"]
COPY ["src/IdentityService.BusinessLogic/IdentityService.BusinessLogic.csproj", "src/IdentityService.BusinessLogic/"]
COPY ["src/IdentityService.DataAccess/IdentityService.DataAccess.csproj", "src/IdentityService.DataAccess/"]
COPY ["src/IdentityService.DatabaseMigrator/IdentityService.DatabaseMigrator.csproj", "src/IdentityService.DatabaseMigrator/"]
RUN dotnet restore "src/IdentityService.Api/IdentityService.Api.csproj"
COPY . .
WORKDIR "/src/src/IdentityService.Api"
RUN dotnet build "IdentityService.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IdentityService.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IdentityService.Api.dll"]