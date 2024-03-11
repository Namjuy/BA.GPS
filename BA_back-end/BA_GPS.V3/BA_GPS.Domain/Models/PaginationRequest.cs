using System;
namespace BA_GPS.Domain.Models
{
    /// <summary>
    /// 
    /// </summary>
    /// <Modified>
    /// Name    Date    Comments
    /// Duypn   11/03/2024 Created
    /// </Modified>
    public record PaginationRequest(int PageSize = 10, int PageIndex = 0);
}

