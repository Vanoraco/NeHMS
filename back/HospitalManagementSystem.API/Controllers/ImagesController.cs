using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImagesController : ControllerBase
    {
        private const long MaxUploadBytes = 5 * 1024 * 1024;
        private static readonly HashSet<string> AllowedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg",
            ".jpeg",
            ".png",
            ".gif"
        };
        private static readonly HashSet<string> AllowedContentTypes = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg",
            "image/png",
            "image/gif"
        };
        // GET: api/<ImagesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ImagesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ImagesController>
        [HttpPost]
        public IActionResult Post()
        {
            try
            {
                if (!Request.HasFormContentType || Request.Form.Files.Count == 0)
                {
                    return BadRequest("No file uploaded");
                }

                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length <= 0 || file.Length > MaxUploadBytes)
                {
                    return BadRequest("Invalid file size");
                }

                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var extension = Path.GetExtension(fileName);
                if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
                {
                    return BadRequest("Invalid file type");
                }

                if (!AllowedContentTypes.Contains(file.ContentType))
                {
                    return BadRequest("Invalid content type");
                }

                var safeFileName = $"{Guid.NewGuid():N}{extension}";
                Directory.CreateDirectory(pathToSave);

                var fullPath = Path.Combine(pathToSave, safeFileName);
                var dbPath = Path.Combine(folderName, safeFileName);
                string message = "Successfully  Uploaded!!";
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return Ok(new { dbPath, message });
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        // PUT api/<ImagesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ImagesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            }
            catch
            {

            }
        }
    }
}
