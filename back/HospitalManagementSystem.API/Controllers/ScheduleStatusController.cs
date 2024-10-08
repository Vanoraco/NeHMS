using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using Microsoft.AspNetCore.Authorization;
using HospitalManagementSystem.API.Models;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ScheduleStatusController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ScheduleStatusController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ScheduleStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleStatus>>> GetScheduleStatuses()
        {
            return await _context.ScheduleStatuses.ToListAsync();
        }

        // GET: api/ScheduleStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleStatus>> GetScheduleStatus(int id)
        {
            var scheduleStatus = await _context.ScheduleStatuses.FindAsync(id);

            if (scheduleStatus == null)
            {
                return NotFound();
            }

            return scheduleStatus;
        }

       
    }
}
