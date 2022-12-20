using FluentValidation;
using IdentityService.Api.Requests;
using IdentityService.Api.ValidationRules;

namespace IdentityService.Api.Validators
{
    /// <summary>
    /// The validator for the user update request
    /// </summary>
    public class UserRequestUpdateValidator : AbstractValidator<UserRequestUpdate>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="UserRequestUpdateValidator"/>
        /// </summary>
        public UserRequestUpdateValidator()
        {
            RuleFor(x => x.UserName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNameBeValid();

            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustEmailBeValid();

            RuleFor(x => x.Password)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustPasswordBeValid();
        }
    }
}
