using CatalogService.Api.Requests;
using CatalogService.Api.ValidationRules;
using FluentValidation;

namespace CatalogService.Api.Validators
{
    /// <summary>
    /// The validator for the category update request
    /// </summary>
    public class CategoryRequestUpdateValidator : AbstractValidator<CategoryRequestUpdate>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="CategoryRequestUpdateValidator"/>
        /// </summary>
        public CategoryRequestUpdateValidator()
        {
            RuleFor(x => x.Name)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNameBeValid();
        }
    }
}
