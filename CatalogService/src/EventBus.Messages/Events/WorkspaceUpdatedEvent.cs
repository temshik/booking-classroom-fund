namespace EventBus.Messages.Events
{
    /// <summary>
    /// Sending model.
    /// </summary>
    public class WorkspaceUpdatedEvent
    {
        /// <summary>
        /// The id of workspace.
        /// </summary>
        public int WorkspaceId { get; set; }

        /// <summary>
        /// Falg for the workspace umder renovation or not, any other problems with the audience.
        /// </summary>
        public string Event { get; set; }
    }
}
