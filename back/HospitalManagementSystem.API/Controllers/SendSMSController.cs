using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.AspNet.Core;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendSMSController : ControllerBase
    {
        private readonly ITwilioRestClient _client;
        public SendSMSController(ITwilioRestClient client)
        {
            _client = client;
        }

        [HttpPost]
        public ActionResult SendText(TwilioSMS model)
        {
            var message = MessageResource.Create(
                client: _client,
                body: model.Message,
                from: new Twilio.Types.PhoneNumber(model.From),
                to: new Twilio.Types.PhoneNumber(model.To));

            return StatusCode(200, new { message = "Success " + message.Sid });
        }
    }
}
