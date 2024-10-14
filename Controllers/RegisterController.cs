using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using OnlineGrocery.Models;
using OnlineGrocery.services;

namespace OnlineGrocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly MongoConnectionService _mongoConnService;

        public RegisterController(MongoConnectionService mongoConnService)
        {
            _mongoConnService = mongoConnService;
        }

        [HttpPost("newUser/deliveryExec")]
        public async Task<String> AddDeliveryExecutive([FromBody]InsertDeliveryExecutives  deliveryExcData)
        {
            try
            {
              
                await _mongoConnService.InsertDocumentAsync("DeliveryExecutives", deliveryExcData.ToBsonDocument());
                var result = new BsonDocument("success", "Added");
                return result.ToString();
                
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }

        [HttpPost("newUser/customer")]  
        public async Task<String> AddCustomer([FromBody] InsertCustomer customerData)
        {
            try
            {
                // Example: Inserting a document into MongoDB
                
                await _mongoConnService.InsertDocumentAsync("Customers", customerData.ToBsonDocument());
                var result = new BsonDocument("success", "Added");
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }
        [HttpGet("getAllExecutives")]
        public List<DeliveryExecutives> getAllExecutives()
        {
            try
            {
                // Example: Inserting a document into MongoDB

                var details =  _mongoConnService.GetAllExecutives();
               
                return details;
            }
            catch (Exception ex)
            {
                
                return null;
            }
        }
        [HttpPost("approveExecutive")]
        public async Task<String> approveDeliveryExecutive(string executiveEmail, int approve)
        {
            try
            {
                // Example: Inserting a document into MongoDB

                await _mongoConnService.ApproveDeliveryExecutive(executiveEmail,approve);
                string status = null;
                if (approve == 0)
                    status = "Not Approved";
                else if (approve == 1)
                    status = "Approved";
                else
                    status = "Rejected";
                var result = new BsonDocument("success", status);
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }


    }
}
