using FluentValidation;

namespace IdentityService.Api.ValidationRules
{
    /// <summary>
    /// The model validations rules
    /// </summary>
    public static class ModelValidator
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
                .Length(2, 50).WithMessage("Length ({TotalLength}) of {PropertyName} Invalid")
                .Must(name => name.All(Char.IsLetter)).WithMessage("{PropertyName} contains Invalid characters");

            return builder;
        }

        /// <summary>
        /// Rule to validate the email
        /// </summary>
        /// <typeparam name="T">T is <see cref="string"/></typeparam>
        /// <param name="ruleBuilder">The Rule Builder Options</param>
        /// <returns>A <see cref="IRuleBuilderOptions{T, string}"/></returns>
        public static IRuleBuilderOptions<T, string> MustEmailBeValid<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var builder = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} is Empty")
                .EmailAddress().WithMessage("Received invalid email");

            return builder;
        }

        /// <summary>
        /// Rule to validate Password
        /// </summary>
        /// <typeparam name="T">T is <see cref="string"/></typeparam>
        /// <param name="ruleBuilder">The Rule Builder Options</param>
        /// <returns>A <see cref="IRuleBuilderOptions{T, string}"/></returns>
        public static IRuleBuilderOptions<T, string> MustPasswordBeValid<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var builder = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} is Empty")
                .NotEqual("admin").WithMessage("{PropertyName} should not be equal to {ComparisonValue}.")
                .MinimumLength(6).WithMessage("{PropertyName} must contain more then {MinLength} elements, but received {{TotalLength}}.")
                .Matches("^(?=.*[0-9]).{6,}$").WithMessage("{PropertyName} should contain at least one numeric value.")
                .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Zа-яА-Я]).{6,}$").WithMessage("{PropertyName} must contain at least one lower case and one upper case letter of English languages.")
                .Matches("^(?=.*[_+-/?:;№!@#$%^&*]).{6,}$").WithMessage("{PropertyName} must contain at least one special case character.");

            return builder;
        }

    }
}