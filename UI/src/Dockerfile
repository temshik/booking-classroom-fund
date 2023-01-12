FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["UI/src/ReactServerWebUI.csproj", "UI/src/"]
RUN dotnet restore "UI/src/ReactServerWebUI.csproj"
COPY . .
WORKDIR "/src/UI/src"
RUN dotnet build "ReactServerWebUI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ReactServerWebUI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ReactServerWebUI.dll"]
