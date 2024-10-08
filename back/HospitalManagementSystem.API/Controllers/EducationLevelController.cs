using AutoMapper;
using HospitalManagementSystem.API.Dtos.EducationLevels;
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
    public class EducationLevelController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<EducationLevelController> _logger;
        private readonly IMapper _mapper;

        public EducationLevelController(
            IUnitOfWork unitOfWork,
            ILogger<EducationLevelController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetEducationLevels")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEducationLevels()
        {
            try
            {
                var educationLevels = await _unitOfWork.EducationLevels.GetAll();
                var result = _mapper.Map<IList<EducationLevelDisplayDto>>(educationLevels);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Someting went wrong in {nameof(GetEducationLevels)}");

                return StatusCode(500);
            }
        }
            [HttpGet("{id:int}", Name = "GetEducationLevel")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status500InternalServerError)]
            public async Task<IActionResult> GetEducationLevels(int id)
            {
                try
                {
                    var educationLevel = await _unitOfWork.EducationLevels.Get(at => at.Id == id);
                    var result = _mapper.Map<EducationLevelDisplayDto>(educationLevel);

                    return Ok(result);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Something went wrong in {nameof(GetEducationLevels)}");

                    return StatusCode(500);
                }
            }

            [HttpPost(Name = "CreateEducationLevel")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status500InternalServerError)]
            public async Task<IActionResult> CreateEducationLevel([FromBody] EducationLevelFormDto educationLevelFormDto)
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogError($"Invalid Post attempt made at {nameof(CreateEducationLevel)}");

                    return BadRequest(ModelState);
                }
                try
                {
                    var educationLevel = _mapper.Map<EducationLevel>(educationLevelFormDto);
                    await _unitOfWork.EducationLevels.Insert(educationLevel);
                    await _unitOfWork.Save();

                    return CreatedAtRoute("GetEducationLevel", new { id = educationLevel.Id }, educationLevel);

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Something went wrong in {nameof(CreateEducationLevel)}");

                    return StatusCode(500);

                }
            }

            [HttpPut("{id:int}", Name = "UpdateEducationLevel")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status500InternalServerError)]
            public async Task<IActionResult> UpdateEducationLevel(int id, [FromBody] EducationLevelFormDto educationLevelFormDto)
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogError($"Invalid Update attempt at {nameof(UpdateEducationLevel)}");

                    return BadRequest(ModelState);
                }
                try
                {
                    var educationLevel = await _unitOfWork.EducationLevels.Get(at => at.Id == id);

                    if (educationLevel == null)
                    {
                        _logger.LogError($"Invalid Update attempt at {nameof(UpdateEducationLevel)}");

                        return BadRequest("EducationLevel not found");
                    }

                    _mapper.Map(educationLevelFormDto, educationLevel);

                    _unitOfWork.EducationLevels.Update(educationLevel);

                    await _unitOfWork.Save();

                    return NoContent();

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Something went wrong at {nameof(UpdateEducationLevel)}");

                    return StatusCode(500);
                }
            }

            [HttpDelete("{id:int}", Name = "DeleteEducationLevel")]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status500InternalServerError)]
            public async Task<IActionResult> DeleteEducationLevel(int id)
            {
                if (id < 1)
                {
                    _logger.LogError($"Invalid DELETE request attempt made in {nameof(DeleteEducationLevel)}");

                    return BadRequest();
                }

                try
                {
                    var educationLevel = await _unitOfWork.EducationLevels.Get(at => at.Id == id);

                    if (educationLevel == null)
                    {
                        _logger.LogError($"Invalid Delete attempt at {nameof(DeleteEducationLevel)}");

                        return BadRequest("EducationLevel not found");
                    }

                    await _unitOfWork.EducationLevels.Delete(id);

                    await _unitOfWork.Save();

                    return NoContent();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Something went wrong at {nameof(DeleteEducationLevel)}");

                    return StatusCode(500);
                }
            }
        }
    }

