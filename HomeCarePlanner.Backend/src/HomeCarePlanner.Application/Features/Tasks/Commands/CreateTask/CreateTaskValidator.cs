using FluentValidation;

namespace HomeCarePlanner.Application.Features.Tasks.Commands.CreateTask;

public class CreateTaskValidator : AbstractValidator<CreateTaskCommand>
{
    public CreateTaskValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.IntervalDays).InclusiveBetween(1, 3650);
        RuleFor(x => x.Category).Must(c => new[] { "water-filter", "air-filter", "garden", "other" }.Contains(c));
    }
}