using BA_GPS.Application.Interfaces;
using BA_GPS.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BA_GPS.Infrastructure.Services
{

    /// <summary>
    /// 
    /// </summary>
    /// <Modified>
    /// Name    Date    Comments
    /// Duypn   11/03/2024 Created
    /// </Modified>
    public class UserServices : IGenericService<User>
    {
        private readonly PaginationRequest _paginationRequest;
        private readonly UserDbContext _dbContext;
        private readonly ILogger<UserServices> _logger;

        public UserServices(UserDbContext dbContext, PaginationRequest paginationRequest, ILogger<UserServices> logger)
        {
            _dbContext = dbContext;
            _paginationRequest = paginationRequest;
            _logger = logger;
        }

        public async Task<User> Create(User newUser)
        {
           
            try
            {
                User user = new()
                {
                    UserId = GenerateUserId(),
                    UserName = newUser.UserName,
                    FullName = newUser.FullName,
                    HashPassword = newUser.HashPassword,
                    IsMale = newUser.IsMale,
                    DateOfBirth = newUser.DateOfBirth,
                    PhoneNumber = newUser.PhoneNumber,
                    Email = newUser.Email,
                    Address = newUser.Address,
                    UserType = newUser.UserType,
                    IsDisable = false,
                    LastModifyDate = DateTime.UtcNow
                };

                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi tạo người dùng");
            }

            
        }

        public async Task<bool> Delete(Guid id)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(item => item.UserIdentity == id);

                if (user == null)
                    return false; // Indicate failure if user is not found

                user.IsDisable = true;
                await _dbContext.SaveChangesAsync();

                return true; // Indicate success
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi xoá người dùng");
            }
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            try
            {
                var pageSize = _paginationRequest.PageSize;
                var pageIndex = _paginationRequest.PageIndex;

                var totalItems = await _dbContext.Users.LongCountAsync();

                var itemsOnPage = await _dbContext.Users
                    .OrderBy(c => c.UserId)
                    .Skip(pageSize * pageIndex)
                    .Take(pageSize)
                    .ToListAsync();

                return itemsOnPage;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi lấy danh sách người dùng")
            }
        }

        public async Task<User> GetById(Guid id)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(item => item.UserIdentity == id) ?? throw new Exception("User not found");
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lấy thông tin người dùng lỗi");
            }
        }


        public async Task<User> Update(User userToUpdate)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(item => item.UserIdentity == userToUpdate.UserIdentity) ?? throw new ArgumentException("User not found");
                user.FullName = userToUpdate.FullName;
                user.IsMale = userToUpdate.IsMale;
                user.DateOfBirth = userToUpdate.DateOfBirth;
                user.Email = userToUpdate.Email;
                user.Address = userToUpdate.Address;
                user.LastModifyDate = DateTime.UtcNow;

                await _dbContext.SaveChangesAsync();

                return user; // Return the updated user
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Cập nhật thông tin người dùng lỗi");
            }
        }

        private string GenerateUserId()
        {
            string prefix = "BA";

            int userCount = _dbContext.Users.Count() + 1;

            string formattedCount = userCount.ToString().PadLeft(4, '0');

            return prefix + formattedCount;
        }
    }
}
