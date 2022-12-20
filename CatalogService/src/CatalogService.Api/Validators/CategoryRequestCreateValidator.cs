using CatalogService.Api.Requests;
using CatalogService.Api.ValidationRules;
using FluentValidation;

namespace CatalogService.Api.Validators
{
    /// <summary>
    /// The validator for the category create request
    /// </summary>
    public class CategoryRequestCreateValidator : AbstractValidator<CategoryRequestCreate>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="CategoryRequestCreateValidator"/>
        /// </summary>
        public CategoryRequestCreateValidator()
        {
            RuleFor(x => x.Name)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNameBeValid();
        }
    }
}
