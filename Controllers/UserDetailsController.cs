using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using OnlineGrocery.Models;
using OnlineGrocery.services;

namespace OnlineGrocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : Controller
    {
        
        
        private readonly MongoConnectionService _mongoConnService;

        public UserDetailsController(MongoConnectionService mongoConnService)
        {
            _mongoConnService = mongoConnService;
        }

        [HttpGet("get")]
        public String GetUsers (String UserEmail )
        {
            try
            {

                var user = _mongoConnService.GetUserByUseremail(UserEmail);
                return user;
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }
        [HttpGet("getCartItems")]
        public String getCartDetails(String UserEmail)
        {
            try
            {
                var details = _mongoConnService.GetCartDetails(UserEmail);
                return details.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
            
        }
        [HttpPost("removeFromCart")]
        public async Task<String> removeFromCart(String id)
        {
            try
            {
                object _id = ObjectId.Parse(id);

                await _mongoConnService.RemoveFromCart(_id);
                var result = new BsonDocument("success", "Removed");
                return result.ToString();

            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }

        }
        [HttpGet("getDeliveredOrders")]
        public string getDeliveredOrders(String UserEmail)
        {
            try
            {
                 _mongoConnService.GetDeliveredDetails(UserEmail);
                //return details.ToString();
                var result = new BsonDocument("success", "Added");
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }
        [HttpGet("getAllProducts")]
        public List<ProductsModel> GetAllProducts()
        {
            try
            {
                var details = _mongoConnService.GetAllProducts();
                return details;
                 

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        
    }
}
