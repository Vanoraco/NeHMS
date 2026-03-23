using HospitalManagementSystem.API.Models;
using HospitalManagementSystem.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using System;
using HospitalManagementSystem.API.Data;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmailController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IEmailService emailService;
        public EmailController(DatabaseContext context, IEmailService service)
        {
            this._context = context;
            this.emailService = service;
        }

        [HttpPost("SendMails")]
        public async Task<IActionResult> SendMail()
        {
            try
            {
                MailRequest mailrequest = new MailRequest();
                mailrequest.ToEmail = "anidnetabebe@gmail.com";
                mailrequest.Subject = "Welcome to Crazy Prog Code";
                mailrequest.Body = GetHtmlcontent();
                await emailService.SendEmailAsync(mailrequest);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private string GetHtmlcontent()
        {
            string Response = "<div style=\"width:100%;background-color:lightblue;text-align:center;margin:10px\">";
            Response += "<h1>Welcome to Fasil Geties</h1>";
            Response += "<h2>Thanks for subscribed us</h2>";
            Response += "<div><h1> Contact us : fasilgetie12@gmail.com</h1></div>";
            Response += "</div>";
            return Response;
        }
    }
}
