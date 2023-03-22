using FluentValidation;
using IdentityService.Api.Requests;
using IdentityService.Api.ValidationRules;

namespace IdentityService.Api.Validators
{
    /// <summary>
    /// The validator for the user password reset request
    /// </summary>
    public class PasswordRequestResetValidator : AbstractValidator<PasswordRequestReset>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="PasswordRequestResetValidator"/>
        /// </summary>
        public PasswordRequestResetValidator()
        {
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustEmailBeValid();

            RuleFor(x => x.Password)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustPasswordBeValid();
        }
    }
}
