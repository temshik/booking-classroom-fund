namespace CatalogService.Api.Requests
{
    /// <summary>
    /// The category for update request 
    /// </summary>
    public class CategoryRequestUpdate
    {
        public int Id { get; set; }
        /// <summary>
        /// The name of the category.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Availability flag of selected category.
        /// </summary>
        public bool Selected { get; set; }

        /// <summary>
        /// Navigation property for workspace.
        /// </summary>
        //public List<WorkspaceDTO> Workspaces { get; set; }
    }
}
