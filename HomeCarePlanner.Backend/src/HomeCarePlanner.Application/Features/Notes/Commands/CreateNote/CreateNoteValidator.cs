using FluentValidation;
namespace HomeCarePlanner.Application.Features.Notes.Commands.CreateNote;
public class CreateNoteValidator : AbstractValidator<CreateNoteCommand>
{
    public CreateNoteValidator()
    {
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required").MaximumLength(200);
        RuleFor(x => x.Content).MaximumLength(2000).When(x => !string.IsNullOrEmpty(x.Content));
        RuleFor(x => x.Todos).Must(t => t == null || t.All(todo => !string.IsNullOrWhiteSpace(todo.Text)));
    }
}
