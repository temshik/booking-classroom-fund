using CatalogService.DataAccess.Pagination;

namespace CatalogService.BusinessLogic.DTOs
{
    public class PagedWorkspaceDTO
    {
        public PagedList<WorkspaceDTO> WorkspaceDTOs { get; set; }

        public int TotalPages { get; set; }

        public PagedWorkspaceDTO(PagedList<WorkspaceDTO> workspaceDTOs, int totalPages)
        {
            WorkspaceDTOs = workspaceDTOs;
            TotalPages = totalPages;
        }
    }
}
