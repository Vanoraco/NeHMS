using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Core;
using Twilio.TwiML;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReciveSMSController : TwilioController
    {
        [HttpPost("SendReply")]
        public TwiMLResult SendReply([FromForm] TwilioSMS request)
        {
            var response = new MessagingResponse();
            response.Message("This replying from the api");
            return TwiML(response);
        }
    }
}
