using AutoMapper;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.BusinessLogic.Exceptions;
using CatalogService.BusinessLogic.Services.SyncDataService.Http;
using CatalogService.DataAccess.Models;
using CatalogService.DataAccess.Pagination;
using CatalogService.DataAccess.Repositories;
using Microsoft.Extensions.Logging;

namespace CatalogService.BusinessLogic.Services
{
    /// <summary>
    /// Service for base workspace operations
    /// </summary>
    public class WorkspaceService : IWorkspaceService
    {
        private readonly IWorkspaceRepository _repository;
        private readonly IBookingDataClient _bookingDataClient;
        private readonly IMapper _mapper;
        private readonly ILogger<WorkspaceService> _logger;
        private readonly ISaveChangesRepository _saveChangesRepository;

        /// <summary>
        /// Initializes a new instance of <see cref="WorkspaceService"/> class.
        /// </summary>
        /// <param name="repository">The workspace repository.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="logger">The logger.</param>
        public WorkspaceService(IWorkspaceRepository repository,
            IMapper mapper,
            ILogger<WorkspaceService> logger,
            ISaveChangesRepository saveChangesRepository,
            IBookingDataClient bookingDataClient)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _saveChangesRepository = saveChangesRepository;
            _bookingDataClient = bookingDataClient;
        }

        /// <summary>
        /// Function to create a new workspace to the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to create.</param>
        /// <returns>Added workspace.</returns>
        public async Task AddAsync(WorkspaceDTO workspace, CancellationToken cancellationToken)
        {
            var workspaceMapped = _mapper.Map<Workspace>(workspace);
            var workspaceDatabase = await _repository.GetWorkspaceAsync(workspaceMapped.Id, cancellationToken);

            if (workspaceDatabase != null)
            {
                _logger.LogError("Adding Workspace already exists");

                throw new AlreadyExistException("Workspace already exists");
            }

            _repository.Add(workspaceMapped);
            await _saveChangesRepository.SaveChangesAsync();
        }

        /// <summary>
        /// Function to get a workspace from the database.
        /// </summary>
        /// <param name="id">The workspace that we want to get.</param>
        /// <returns>Task</returns>
        public async Task<WorkspaceDTO> GetWorkspaceAsync(int id, CancellationToken cancellationToken)
        {
            var list = await _repository.GetWorkspaceAsync(id, cancellationToken);

            if (list == null)
            {
                _logger.LogError("Workspace dosen't exist");
            }

            var listDTO = _mapper.Map<WorkspaceDTO>(list);

            return listDTO;
        }

        /// <summary>
        /// Function to get a workspaces from the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to get.</param>
        /// <returns>Task</returns>
        public async Task<WorkspaceDTO> GetWorkspaceAsync(WorkspaceDTO workspace, CancellationToken cancellationToken)
        {
            var workspaceMapped = _mapper.Map<Workspace>(workspace);
            var workspaceDatabase = await _repository.GetWorkspaceAsync(workspaceMapped.Id, cancellationToken);

            if (workspaceDatabase == null)
            {
                _logger.LogError("Workspace dosen't exist");

                throw new NotFoundException("The workspace was not found");
            }

            try
            {
                await _bookingDataClient.SendWorkspaceToBooking(workspaceDatabase);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Could not send synchronously");
            }

            return _mapper.Map<WorkspaceDTO>(workspaceDatabase);
        }

        /// <summary>
        /// Function to get a workspace paged.
        /// </summary>
        /// <param name="number">The number of the course.</param>
        /// <returns>A PagedList of <see cref="WorkspaceDTO"/>.</returns>
        public async Task<PagedList<WorkspaceDTO>> GetWorkspaciesPagedAsync(PagedQueryBase query, CancellationToken cancellationToken)
        {
            try
            {
                var list = await _repository.GetWorkspaciesPagedAsync(query, cancellationToken);
                var mapWorkspaces = _mapper.Map<List<WorkspaceDTO>>(list);
                var workspacesDTO = new PagedList<WorkspaceDTO>(mapWorkspaces, list.TotalCount, list.CurrentPage, list.PageSize);
                if (list == null)
                {
                    _logger.LogError("Such course number dosen't exist");

                    throw new NotFoundException("The workspace was not found");
                }

                //var listDTO = _mapper.Map<List<WorkspaceDTO>>(list);

                return workspacesDTO;
            }
            catch(Exception ex)
            {
                _logger.LogError($"Non correct values in the {nameof(GetWorkspaciesPagedAsync)} action {ex}");
                return null;
            }
        }

        /// <summary>
        /// Function to delete a workspace from the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to delete.</param>
        /// <returns>A <see cref="WorkspaceDTO"/>.</returns>
        public async Task<WorkspaceDTO> RemoveAsync(WorkspaceDTO workspace, CancellationToken cancellationToken)
        {
            var workspaceMapped = _mapper.Map<Workspace>(workspace);
            var workspaceDatabase = await _repository.GetWorkspaceAsync(workspaceMapped.Id, cancellationToken);

            if (workspaceDatabase == null)
            {
                _logger.LogError("Workspace dosen't exist");

                throw new NotFoundException("The workspace was not found");
            }

            _repository.Delete(workspaceMapped);
            await _saveChangesRepository.SaveChangesAsync();

            return workspace;
        }

        /// <summary>
        /// Function to update the workspace to the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to update.</param>
        /// <returns>A <see cref="WorkspaceDTO"/>.</returns>
        public async Task<WorkspaceDTO> UpdateAsync(WorkspaceDTO workspace, CancellationToken cancellationToken)
        {
            var workspaceMapped = _mapper.Map<Workspace>(workspace);
            var workspaceDatabase = await _repository.GetWorkspaceAsync(workspaceMapped.Id, cancellationToken);

            if (workspaceDatabase == null)
            {
                _logger.LogError("Workspace dosen't exist");

                throw new NotFoundException("The workspace was not found");
            }

            _repository.Update(workspaceMapped);
            await _saveChangesRepository.SaveChangesAsync();

            return workspace;
        }
    }
}
