using FluentValidation;

namespace CatalogService.Api.ValidationRules
{
    /// <summary>
    /// The category validations rules
    /// </summary>
    public static class CategoryValidationRules
    {
        /// <summary>
        /// Rule to validate the Name
        /// </summary>
        /// <typeparam name="T">T is <see cref="string"/></typeparam>
        /// <param name="ruleBuilder">The Rule Builder Options</param>
        /// <returns>A <see cref="IRuleBuilderOptions{T, string}"/></returns>
        public static IRuleBuilderOptions<T, string> MustNameBeValid<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var builder = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} is Empty")
                .MinimumLength(3).WithMessage("The length {PropertyName} must be at least {MinLength} characters. You entered {TotalLength} characters.")
                .Must(name => name.All(Char.IsLetter)).WithMessage("{PropertyName} contains Invalid characters");

            return builder;
        }
    }
}
