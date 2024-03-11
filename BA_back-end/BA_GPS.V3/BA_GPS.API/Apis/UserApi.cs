using BA_GPS.Domain.Models;
using BA_GPS.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;


namespace BA_GPS.API.Apis
{
    public static class UserApi
    {
        public static IEndpointRouteBuilder MapUserApi(this IEndpointRouteBuilder app)
        {
            app.MapGet("/users",GetAllUsers);
            app.MapGet("/users/{id}", GetUserById);
            app.MapPost("/users",CreateUser);
            app.MapPut("/users/{id}", UpdateUser);
            app.MapDelete("/users/{id}",RemoveUser);

            return app;
        }

        public static async Task<IActionResult> GetAllUsers(UserServices services, ILogger logger)
        {
            IEnumerable<User> users = Enumerable.Empty<User>();
            try
            {
                users = await services.GetAll();           
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while retrieving users.");
                return new StatusCodeResult(500);
            }
            return new OkObjectResult(users);
        }

        public static async Task<IActionResult> GetUserById( UserServices services, Guid id)
        {
           
                var user = await services.GetById(id);
                if (user == null)
                    return new NotFoundObjectResult("User not found");

                return new OkObjectResult(user);
                
        }

        public static async Task<IActionResult> UpdateUser(HttpContext context, UserServices services)
        {
            var idString = context.Request.RouteValues["id"]?.ToString();
            if (!Guid.TryParse(idString, out Guid id))
            {
                return new BadRequestObjectResult("Invalid id format");
            }

            try
            {
                var userToUpdate = await GetUserFromBodyAsync(context);
                //userToUpdate.UserIdentity = id;
                var updatedUser = await services.Update(userToUpdate);
                return new OkObjectResult(updatedUser);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public static async Task<IActionResult> CreateUser(HttpContext context, UserServices services)
        {
            try
            {
                var newUser = await GetUserFromBodyAsync(context);
                var createdUser = await services.Create(newUser);
                return new CreatedResult($"/users/{createdUser.UserIdentity}", createdUser);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public static async Task<IActionResult> RemoveUser(HttpContext context, UserServices services)
        {
            var idString = context.Request.RouteValues["id"]?.ToString();
            if (!Guid.TryParse(idString, out Guid id))
            {
                return new BadRequestObjectResult("Invalid id format");
            }

            try
            {
                var success = await services.Delete(id);
                if (!success)
                    return new NotFoundObjectResult("User not found or already deleted");

                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        private static async Task<User> GetUserFromBodyAsync(HttpContext context)
        {
            using var streamReader = new System.IO.StreamReader(context.Request.Body);
            var body = await streamReader.ReadToEndAsync();
            var newUser = Newtonsoft.Json.JsonConvert.DeserializeObject<User>(body);
            return newUser;
        }

     
    }
}
