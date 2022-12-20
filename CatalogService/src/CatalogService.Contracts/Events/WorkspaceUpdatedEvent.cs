namespace CatalogService.Contracts.Events
{
    public class WorkspaceUpdatedEvent
    {
        /// <summary>
        /// The id of workspace.
        /// </summary>
        public int WorkspaceId { get; set; }

        /// <summary>
        /// Workspace number of classroom fund.
        /// </summary>
        public int WorkspaceNumber { get; set; }

        /// <summary>
        /// Falg for the workspace umder renovation or not, any other problems with the audience
        /// </summary>
        public bool IsAvailable { get; set; }

        public WorkspaceUpdatedEvent(int workspaceId, int workspaceNumber, bool isAvailable)
        {
            WorkspaceId = workspaceId;
            IsAvailable = isAvailable;
            WorkspaceNumber = workspaceNumber;
        }
    }
}
