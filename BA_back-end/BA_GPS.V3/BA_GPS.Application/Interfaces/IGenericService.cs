using System;
namespace BA_GPS.Application.Interfaces
{
    /// <summary>
    /// 
    /// </summary>
    /// <Modified>
    /// Name    Date    Comments
    /// Duypn   11/03/2024 Created
    /// </Modified>
	public interface IGenericService<TEntity>
	{
        /// <summary>
        /// Retrieves all entities.
        /// </summary>
        /// <returns>1 tập hợp các đối tượng</returns>
        Task<IEnumerable<TEntity>> GetAll();

        /// <summary>
        /// Retrieves a single entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the entity to retrieve.</param>
        /// <returns>Lấy thông tin đối tượng theo id.</returns>
        Task<TEntity> GetById(Guid id);

        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>Tạo đối tượng.</returns>
        Task<TEntity> Create(TEntity entity);

        /// <summary>
        /// Updates an existing entity.
        /// </summary>
        /// <param name="entity">The entity to update.</param>
        /// <returns>Cập nhật giá trị đối tượng.</returns>
        Task<TEntity> Update(TEntity entity);

        /// <summary>
        /// Deletes an entity by its ID.
        /// </summary>
        /// <param name="id">Id của đối tượng cần xoá.</param>
        /// <returns>True nếu xoá thành công , false nếu xoá thất bại</returns>
        Task<bool> Delete(Guid id);

        
    }
}

