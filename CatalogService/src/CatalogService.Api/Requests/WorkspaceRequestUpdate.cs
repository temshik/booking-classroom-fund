using CatalogService.DataAccess.Models;

namespace CatalogService.Api.Requests
{
    /// <summary>
    /// The workspace for update request 
    /// </summary>
    public class WorkspaceRequestUpdate
    {
        public int Id { get; set; }
        /// <summary>
        /// The number of the campus on the territory of the university.
        /// </summary>
        public int CampusNumber { get; set; }

        /// <summary>
        /// Workspace number of classroom fund.
        /// </summary>
        public int WorkspaceNumber { get; set; }

        /// <summary>
        /// The category id of the workspace.
        /// </summary>
        public int CategoryId { get; set; }

        /// <summary>
        /// Type of classroom fund.
        /// </summary>
        //public CategoryDTO Category { get; set; }

        /// <summary>
        /// Brief description of the audience.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Number of seats in the audience.
        /// </summary>
        public int NumberOfSeats { get; set; }

        /// <summary>
        /// The number of the course for which it is intended a workspace.
        /// </summary>
        public CourseNumbers CourseNumber { get; set; }

        /// <summary>
        /// Availability flag of workspaces special equipment.
        /// </summary>
        public bool SpecialEquipment { get; set; }

        /// <summary>
        /// Falg for the workspace umder renovation or not, any other problems with the audience
        /// </summary>
        public bool IsAvailable { get; set; }
    }
}
