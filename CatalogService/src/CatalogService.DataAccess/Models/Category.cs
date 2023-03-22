namespace CatalogService.DataAccess.Models
{
    /// <summary>
    /// The category of workspace
    /// </summary>
    public class Category
    {
        /// <summary>
        /// The id of category.
        /// </summary>
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
        public List<Workspace> Workspaces { get; set; }
    }
}
