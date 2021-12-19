using Microsoft.AspNetCore.Mvc;
using Vehicles_back.Data;
using Vehicles_back.Models;

namespace Vehicles_back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase  
    {
        private readonly ValuesRepository _repository;

        private readonly ILogger<VehicleController> _logger;
        public VehicleController(ILogger<VehicleController> logger, IConfiguration configuration)
        {
            _repository = new ValuesRepository(configuration);
            _logger = logger;
        }

        [HttpGet(Name = "GetVehicle")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Vehicle>))]
        public async Task<ActionResult<IEnumerable<Vehicle>>> Get()
        {
            try {
                return await _repository.GetAll();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                          $"Error: {e.Message}");
            }
        }

        [HttpGet, Route("order")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Vehicle))]
        public async Task<ActionResult<Vehicle?>> GetId([FromQuery(Name = "order")] int order)
        {
            try 
            {
               return await _repository.GetId(order);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                          $"Error: {e.Message}");
            }
        }

        [HttpPost(Name = "InsertVehicle")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult Post([FromBody]VehicleDto vehicle)
        {
            try
            {
                _repository.Insert(vehicle);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest($"Error not save: {e.Message}");
            }
        }

        [HttpPut(Name = "UpdateVehicle")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public IActionResult Put([FromQuery(Name = "order")] int order, [FromBody] VehicleDto vehicle)
        {
            try
            {
                _repository.Update(order, vehicle);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest($"Error not edit: {e.Message}");
            }
        }

        [HttpDelete(Name = "DeleteVehicle")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public IActionResult Delete([FromQuery(Name = "order")] int order)
        {
            try
            {
                _repository.Delete(order);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest($"Error not delete: {e.Message}");
            }
        }
    }
}