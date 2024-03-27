namespace Selu383.SP24.Api.Features.EmailRequest
{
    public class EmailRequestDto
    {
        public string To { get; set; }
        public string From { get; set; }
        public string Subject { get; set; }
        public string Html { get; set; }
    }
}
