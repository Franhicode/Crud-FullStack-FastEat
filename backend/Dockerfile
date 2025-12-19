# Build stage
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ["mvn", "clean", "package", "-DskipTests"]

# Run stage
FROM eclipse-temurin:21-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# puerto que usa Spring Boot xdef
EXPOSE 8080
# Comando para iniciar la aplicación
ENTRYPOINT ["java","-jar","app.jar"]