FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["HomeCarePlanner.Backend/src/HomeCarePlanner.Api/HomeCarePlanner.Api.csproj", "HomeCarePlanner.Backend/src/HomeCarePlanner.Api/"]
COPY ["HomeCarePlanner.Backend/src/HomeCarePlanner.Application/HomeCarePlanner.Application.csproj", "HomeCarePlanner.Backend/src/HomeCarePlanner.Application/"]
COPY ["HomeCarePlanner.Backend/src/HomeCarePlanner.Domain/HomeCarePlanner.Domain.csproj", "HomeCarePlanner.Backend/src/HomeCarePlanner.Domain/"]
COPY ["HomeCarePlanner.Backend/src/HomeCarePlanner.Infrastructure/HomeCarePlanner.Infrastructure.csproj", "HomeCarePlanner.Backend/src/HomeCarePlanner.Infrastructure/"]
RUN dotnet restore "HomeCarePlanner.Backend/src/HomeCarePlanner.Api/HomeCarePlanner.Api.csproj"
COPY . .
WORKDIR "/src/HomeCarePlanner.Backend/src/HomeCarePlanner.Api"
RUN dotnet build "HomeCarePlanner.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build
FROM build AS publish
RUN dotnet publish "HomeCarePlanner.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HomeCarePlanner.Api.dll"]
