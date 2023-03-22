using System.Text.Json.Serialization;

namespace IdentityService.BusinessLogic.DTOs.SeedPrefilingsDatas
{
    /// <summary>
    /// List of Roles which can be taken by a User
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PrefilingRoleData
    {
        /// <summary>
        /// Has the highest priority for booking classrooms for (1-2 courses)
        /// </summary>
        Dispacher,

        /// <summary>
        /// Responsible for the educational process, which has medium priority for booking classrooms for (3-4 courses)
        /// </summary>
        Employee,

        /// <summary>
        /// Can leave a request to the dispatcher to change the time of the lesson
        /// </summary>
        Teacher
    }
}
