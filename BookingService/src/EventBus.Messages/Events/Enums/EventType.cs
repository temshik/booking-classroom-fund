using System.Text.Json.Serialization;

namespace EventBus.Messages.Events.Enums
{
    /// <summary>
    /// List of operations for sending to booking
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EventType
    {
        /// <summary>
        /// Default value if undetermine
        /// </summary>
        Undetermined,

        /// <summary>
        /// Block the audience for some reason
        /// </summary>
        Block,

        /// <summary>
        /// UnBlock the audience after blocking
        /// </summary>
        UnBlock,

        /// <summary>
        /// Delete the audience
        /// </summary>
        Delete
    }
}
