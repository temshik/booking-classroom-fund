using FluentValidation;
using IdentityService.Api.Requests;
using IdentityService.Api.ValidationRules;

namespace IdentityService.Api.Validators
{
    /// <summary>
    /// The validator for the user password update request
    /// </summary>
    public class PasswordRequestUpdateValidator : AbstractValidator<PasswordRequestUpdate>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="PasswordRequestUpdateValidator"/>
        /// </summary>
        public PasswordRequestUpdateValidator()
        {
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustEmailBeValid();

            RuleFor(x => x.OldPassword)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustPasswordBeValid();

            RuleFor(x => x.NewPassword)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustPasswordBeValid();
        }
    }
}
