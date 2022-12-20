using CatalogService.DataAccess.Models;
using FluentValidation;

namespace CatalogService.Api.ValidationRules
{
    /// <summary>
    /// The workspace validations rules
    /// </summary>
    public static class WorkspaceValidationRules
    {
        /// <summary>
        /// Rule to validate the Description
        /// </summary>
        /// <typeparam name="T">T is <see cref="string"/></typeparam>
        /// <param name="ruleBuilder">The Rule Builder Options</param>
        /// <returns>A <see cref="IRuleBuilderOptions{T, string}"/></returns>
        public static IRuleBuilderOptions<T, string> MustDescriptionBeValid<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var builder = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} is Empty")
                .MinimumLength(2).WithMessage("The length {PropertyName} must be at least {MinLength} characters. You entered {TotalLength} characters.")
                .Must(name => name.All(Char.IsLetter)).WithMessage("{PropertyName} contains Invalid characters");

            return builder;
        }

        /// <summary>
        /// Rule to validate the Number
        /// </summary>
        /// <typeparam name="T">T is <see cref="int"/></typeparam>
        /// <param name="ruleBuilder">The Rule Builder Options</param>
        /// <returns>A <see cref="IRuleBuilderOptions{T, int}"/></returns>
        public static IRuleBuilderOptions<T, int> MustNumberBeValid<T>(this IRuleBuilder<T, int> ruleBuilder)
        {
            var builder = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} is Empty")
                .InclusiveBetween(1, 1000).WithMessage("{PropertyName} must be between {From} and {To}. You entered {PropertyValue}.");

            return builder;
        }

        /// <summary>
        /// Rule to validate the Course number
        /// </summary>
        /// <typeparam name="T">T is <see cref="CourseNumbers"/></typeparam>
        /// <param name="ruleBuilder">The Rule Builder Options</param>
        /// <returns>A <see cref="IRuleBuilderOptions{T, CourseNumbers}"/></returns>
        public static IRuleBuilderOptions<T, CourseNumbers> MustCourseNumberBeValid<T>(this IRuleBuilder<T, CourseNumbers> ruleBuilder)
        {
            var builder = ruleBuilder
                .IsInEnum().WithMessage("{PropertyName} has a range of values which does not include {PropertyValue}.");

            return builder;
        }
    }
}
