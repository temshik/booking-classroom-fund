using CatalogService.Api.Requests;
using CatalogService.Api.ValidationRules;
using FluentValidation;

namespace CatalogService.Api.Validators
{
    /// <summary>
    /// The validator for the workspace create request
    /// </summary>
    public class WorkspaceRequestCreateValidator : AbstractValidator<WorkspaceRequestCreate>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="WorkspaceRequestCreateValidator"/>
        /// </summary>
        public WorkspaceRequestCreateValidator()
        {
            RuleFor(x => x.CampusNumber)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNumberBeValid();

            RuleFor(x => x.WorkspaceNumber)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNumberBeValid();

            RuleFor(x => x.CategoryId)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNumberBeValid();

            RuleFor(x => x.Description)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustDescriptionBeValid();

            RuleFor(x => x.NumberOfSeats)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNumberBeValid();

            RuleFor(x => x.CourseNumber)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustCourseNumberBeValid();

            RuleFor(x => x.IsAvailable)
                .NotNull().WithMessage("{PropertyName} cannot be null");
        }
    }
}
