using FluentValidation;
using IdentityService.Api.Requests;
using IdentityService.Api.ValidationRules;

namespace IdentityService.Api.Validators
{
    /// <summary>
    /// The validator fot he user login request
    /// </summary>
    public class UserRequestLoginValidator : AbstractValidator<UserRequestLogin>
    {
        /// <summary>
        /// Initilizes a new instance of <see cref="UserRequestLoginValidator"/>
        /// </summary>
        public UserRequestLoginValidator()
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
