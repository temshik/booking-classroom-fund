using AutoMapper;
using CatalogService.Api.Requests;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.BusinessLogic.Services;
using CatalogService.Contracts.Events;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Producer;

namespace CatalogService.Api.Controllers
{
    /// <summary>
    /// The workspacies controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class WorkspaciesController : ControllerBase
    {
        private readonly IWorkspaceService _service;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of <see cref="WorkspaciesController"/> class.
        /// </summary>
        /// <param name="service">Workspace service.</param>
        /// <param name="mapper">AutoMapper registration.</param>
        public WorkspaciesController(IWorkspaceService service,
            IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        /// <summary>
        /// Get a specific workspace by The theory ot timetable.
        /// </summary>
        /// <param name="number">Course number.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Desired workspace.</returns>
        [Route("[action]/{id}")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetWorkspaces(int id, CancellationToken cancellationToken)
        {
            var list = await _service.GetWorkspaceAsync(id, cancellationToken);

            if (list == null)
            {
                return BadRequest();
            }

            return Ok(list);
        }

        /// <summary>
        /// Get a specific workspace data.
        /// </summary>
        /// <param name="number">Course number.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Desired workspace.</returns>
        [Route("[action]/{number}")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(string number, CancellationToken cancellationToken)
        {
            var list =  _service.GetWorkspaciesByCourseNumberAsync(number, cancellationToken);

            if (list == null)
            {
                return BadRequest();
            }

            return Ok(list);
        }

        /// <summary>
        /// Creates a new workspace.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>New workspace.</returns>
        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateWorkspace([FromBody] WorkspaceRequestCreate workspaceRequest, CancellationToken cancellationToken)
        {
            await _service.AddAsync(_mapper.Map<WorkspaceDTO>(workspaceRequest), cancellationToken);

            return Ok(workspaceRequest);          
        }

        /// <summary>
        /// Updates a workspace.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Updated workspace.</returns>
        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateWorkspace([FromBody] WorkspaceRequestUpdate workspaceRequest, CancellationToken cancellationToken)
        {
            var result = await _service.UpdateAsync(_mapper.Map<WorkspaceDTO>(workspaceRequest), cancellationToken);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        /// <summary>
        /// Deletes a specific workspace.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Updated list of workspaces.</returns>
        [Route("[action]")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteWorkspace([FromBody] WorkspaceRequestUpdate workspaceRequest, CancellationToken cancellationToken)
        {
            var result = await _service.RemoveAsync(_mapper.Map<WorkspaceDTO>(workspaceRequest), cancellationToken);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        [Route("[action]/{workspaceId}/{workspaceNumber}/{isAvailable}")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public void LockWorkspace(int workspaceId, int workspaceNumber, bool isAvailable, CancellationToken cancellationToken)
        {
            MessageSenderRabbitMQ.SendMessage<WorkspaceUpdatedEvent>(new WorkspaceUpdatedEvent(workspaceId, workspaceNumber, isAvailable));
        }
    }
}
