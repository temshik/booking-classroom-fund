namespace CatalogService.BusinessLogic.DTOs
{
    /// <summary>
    /// Data transfer object fot Category.
    /// </summary>
    public class CategoryDTO
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
    }
}
