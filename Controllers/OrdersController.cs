using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using OnlineGrocery.Models;
using OnlineGrocery.services;

namespace OnlineGrocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : Controller
    {
        private readonly MongoConnectionService _mongoConnService;

        public OrdersController(MongoConnectionService mongoConnService)
        {
            _mongoConnService = mongoConnService;
        }
        [HttpGet("getAllOrders")]
        public List<ReturnedOrder> GetAllOders()
        {
            try
            {

                var user = _mongoConnService.GetAllOrders();
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet("getAllCustomerOrders")]
        public List<ReturnedOrder> getAllCustomerOrders(string customerId)
        {
            try
            {
                
                var user = _mongoConnService.GetAllCustomerOrders(customerId);
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


            [HttpGet("getAllDeliveredOrders")]
        public List<GetOrdersModel> getAllDeliveredOrders(string deliveryExecutiveId)
        {
            try
            {

                var user = _mongoConnService.GetAllDeliveredOrders(deliveryExecutiveId);
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet("getAllCategories")]
        public List<Categories> getAllCategories()
        {
            try
            {

                var categories = _mongoConnService.GetAllCategories();
                return categories;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost("getProductsByCategory")]
        public List<ProductsModel> getAllProductsByCategories([FromBody]List<String> Category)
        {
            try
            {

                var categories = _mongoConnService.GetAllProductsByCategories(Category);
                return categories;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost("addToCart")]
        public async Task<String> addtocart(CartModel cartDetails)
        {
            try
            {

                await _mongoConnService.AddToCart(cartDetails.ToBsonDocument());
                var result = new BsonDocument("success", "Added");
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
            
            
            
        }

       
        [HttpPost("placeOrder")]
        public async Task<String> placeOrder(PlaceOrder details,string useremail)
        {
            try
            {

                await _mongoConnService.PlaceOrder(details,useremail);
                var result = new BsonDocument("success", "Added");
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }



        }

        [HttpPost("addProduct")]
        public async Task<String> addProduct(ProductsModel productDetails)
        {
            try
            {


                await _mongoConnService.AddProduct(productDetails.ToBsonDocument());
                var result = new BsonDocument("success", "Added");
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }



        [HttpPost("addCategory")]
        public async Task<String> addCategory(Categories categoryDetails)
        {
            try
            {


                await _mongoConnService.AddCategory(categoryDetails.ToBsonDocument());
                var result = new BsonDocument("success", "Added");
                return result.ToString();
            }
            catch (Exception ex)
            {
                var result = new BsonDocument("error", ex.Message);
                return result.ToString();
            }
        }


        [HttpGet("getCart")]
        public List<GetCartModel> getAllCartDetails(String UserEmail)
        {
            try
            {

                var details =  _mongoConnService.GetAllCartDetails(UserEmail);
                return details;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
