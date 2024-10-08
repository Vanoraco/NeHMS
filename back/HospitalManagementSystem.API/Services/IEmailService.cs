using HospitalManagementSystem.API.Models;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailrequest);
    }
}
