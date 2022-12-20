using FluentValidation;
using IdentityService.Api.Requests;
using IdentityService.Api.ValidationRules;

namespace IdentityService.Api.Validators
{
    /// <summary>
    /// The validator for the user create request
    /// </summary>
    public class UserRequestCreateValidator : AbstractValidator<UserRequestCreate>
    {
        /// <summary>
        /// Initializes a new instance of <see cref="UserRequestCreateValidator"/>
        /// </summary>
        public UserRequestCreateValidator()
        {
            RuleFor(x => x.FirstName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNameBeValid();

            RuleFor(x => x.LastName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNameBeValid();

            RuleFor(x => x.UserName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustNameBeValid();

            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustEmailBeValid();

            RuleFor(x => x.Password)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustPasswordBeValid()
                .Equal(x => x.ConfirmedPassword);
        }
    }
}
