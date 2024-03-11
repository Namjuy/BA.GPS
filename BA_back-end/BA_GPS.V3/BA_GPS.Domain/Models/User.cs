using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

/// <summary>
/// 
/// </summary>
/// <Modified>
/// Name    Date    Comments
/// Duypn   11/03/2024 Created
/// </Modified>
namespace BA_GPS.Domain.Models
{
	[Table("User")]
	public class User
	{
		
		public User()
		{
			
		}

		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[NotNull]
		public Guid UserIdentity { get; private set; }

		[NotNull]
		public string UserId { get; set; }

		[MaxLength(50)]
        [NotNull]
        public string UserName { get; set; }

        [NotNull]
        public string HashPassword { get; set; }

		[MaxLength(200)]
		[NotNull]
		public string FullName { get; set; }

		[NotNull]
		public byte? IsMale { get; set; }

		[NotNull]
		public DateTime DateOfBirth { get; set; }

        [RegularExpression(@"^[0-9]{10,11}$")]
        [NotNull]
		public string PhoneNumber { get; set; }

		[DataType(DataType.EmailAddress)]
		[NotNull]
		public string Email { get; set; }

		[AllowNull]
		public string Address { get; set; }

        [NotNull]
        public byte? UserType { get; set; }

		[NotNull]
		public bool IsDisable { get; set; }

        [NotNull]
        public DateTime LastModifyDate { get; set; }



    }
}

