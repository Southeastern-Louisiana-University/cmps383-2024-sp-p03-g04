using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace Selu383.SP24.Api.Controllers
{
    [ApiController]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("sendEmail")]
        public async Task<IActionResult> SendEmail(EmailRequestModel model)
        {
            try
            {
                var apiKey = _configuration.GetSection("SendgridApiKey").Value;

                var client = new SendGridClient(apiKey);

                var from = new EmailAddress("enstayhotels@gmail.com", model.SenderName);
                var to = new EmailAddress(model.To);
                var subject = model.Subject;
                var htmlContent = model.Html;

                var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
                var response = await client.SendEmailAsync(msg);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }

    public class EmailRequestModel
    {
        public string To { get; set; }
        public string SenderName { get; set; }
        public string Subject { get; set; }
        public string Html { get; set; }
    }
}
