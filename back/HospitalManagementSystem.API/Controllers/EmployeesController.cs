using AutoMapper;
using HospitalManagementSystem.API.Dtos.Employees;
using HospitalManagementSystem.API.IRepositories;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<EmployeesController> _logger;
        private readonly IMapper _mapper;

        public EmployeesController(IMapper mapper, ILogger<EmployeesController> logger, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
        }
        [HttpGet(Name = "GetEmployees")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEmployees([FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            try
            {
                page = page < 1 ? 1 : page;
                pageSize = pageSize < 1 ? 25 : pageSize;
                pageSize = pageSize > 100 ? 100 : pageSize;

                var total = await _unitOfWork.Employees.Count();
                var employees = await _unitOfWork.Employees.GetAll(
                    orderBy: q => q.OrderBy(e => e.Id),
                    page: page,
                    pageSize: pageSize
                );
                var items = _mapper.Map<IList<EmployeeDisplayDto>>(employees);

                return Ok(new { items, page, pageSize, total });
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, $"Something went wrong in {nameof(GetEmployees)}");
                return StatusCode(500);
            }
        }

        [HttpGet("{id:int}", Name = "GetEmployee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEmployee(int id)
        {
            try
            {
                var employee = await _unitOfWork.Employees.Get(e => e.Id == id);
                var result = _mapper.Map<EmployeeDisplayDto>(employee);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(GetEmployee)}");
                return StatusCode(500);
            }
        }

        [HttpPost(Name = "CreateEmployee")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeFormDto employeeFormDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid POST request attempt made in {nameof(CreateEmployee)}");
                return BadRequest(ModelState);
            }

            try
            {
                var employee = _mapper.Map<Employee>(employeeFormDto);
                await _unitOfWork.Employees.Insert(employee);
                await _unitOfWork.Save();

                return CreatedAtRoute("GetEmployee", new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(CreateEmployee)}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id:int}", Name = "UpdateEmployee")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeeFormDto employeeFormDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid UPDATE request attempt made in { nameof(UpdateEmployee)}");
                return BadRequest(ModelState);
            }

            try
            {
                var employee = await _unitOfWork.Employees.Get(e => e.Id == id);
                if (employee == null)
                {
                    _logger.LogError($"Invalid UPDATE request attempt in { nameof(UpdateEmployee)}");

                    return BadRequest("Employee not found");
                }

                _mapper.Map(employeeFormDto, employee);

                _unitOfWork.Employees.Update(employee);

                await _unitOfWork.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in { nameof(UpdateEmployee)}");

                return StatusCode(500);
            }
        }

        [HttpDelete("{id:int}", Name = "DeleteEmployee")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid DELETE request attempt made in { nameof(DeleteEmployee)}");
                return BadRequest();
            }
            try
            {
                var employee = await _unitOfWork.Employees.Get(e => e.Id == id);

                if (employee == null)
                {
                    _logger.LogError($"Invalid Delete attempt at { nameof(DeleteEmployee)}");

                    return BadRequest("Employee not found");
                }

                await _unitOfWork.Employees.Delete(id);

                await _unitOfWork.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong at { nameof(DeleteEmployee)}");

                return StatusCode(500);
            }
        }
    }
}
