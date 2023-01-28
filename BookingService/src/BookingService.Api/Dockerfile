#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/BookingService.Api/BookingService.Api.csproj", "src/BookingService.Api/"]
COPY ["src/BookingService.DatabaseMigrator/BookingService.DatabaseMigrator.csproj", "src/BookingService.DatabaseMigrator/"]
COPY ["src/EventBus.Messages/EventBus.Messages.csproj", "src/EventBus.Messages/"]
COPY ["src/BookingService.DataAccess/BookingService.DataAccess.csproj", "src/BookingService.DataAccess/"]
COPY ["src/BookingService.BusinessLogic/BookingService.BusinessLogic.csproj", "src/BookingService.BusinessLogic/"]
RUN dotnet restore "src/BookingService.Api/BookingService.Api.csproj"
COPY . .
WORKDIR "/src/src/BookingService.Api"
RUN dotnet build "BookingService.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BookingService.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookingService.Api.dll"]