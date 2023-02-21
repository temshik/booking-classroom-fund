using AutoMapper;
using CatalogService.Api.Requests;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.BusinessLogic.Services;
using EventBus.Messages.Events;
using EventBus.Messages.Events.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Producer.AsyncDataService;

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
        private readonly IMessageProducer _messageProducer;

        /// <summary>
        /// Initializes a new instance of <see cref="WorkspaciesController"/> class.
        /// </summary>
        /// <param name="service">Workspace service.</param>
        /// <param name="mapper">AutoMapper registration.</param>
        public WorkspaciesController(IWorkspaceService service,
            IMessageProducer messageProducer,
            IMapper mapper)
        {
            _service = service;
            _messageProducer = messageProducer;
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
        [Authorize]
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
        [Authorize]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(string number, CancellationToken cancellationToken)
        {
            var list = _service.GetWorkspaciesByCourseNumberAsync(number, cancellationToken);

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
        [Authorize(Roles = "Dispacher, Employee")]
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
        [Route("[action]")]
        [HttpPut]
        [Authorize(Roles = "Dispacher, Employee")]
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
        [Authorize(Roles = "Dispacher, Employee")]
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

        [Route("[action]/{workspaceId}/{eventType}")]
        [HttpPost]
        [Authorize(Roles = "Dispacher, Employee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LockWorkspace(int workspaceId, EventType eventType, CancellationToken cancellationToken)
        {
            var result = await _service.GetWorkspaceAsync(workspaceId, cancellationToken);

            if (result != null)
            {
                _messageProducer.PublishUpdatedEvent(new WorkspaceUpdatedEvent()
                {
                    WorkspaceId = workspaceId,
                    Event = eventType.ToString()
                });

                return Ok(result);
            }

            return BadRequest();
        }
    }
}
