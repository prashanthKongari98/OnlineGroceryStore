using MongoDB.Bson;
using MongoDB.Driver;
using OnlineGrocery.Models;
using System.Collections;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text.Json;

namespace OnlineGrocery.services
{
    public class MongoConnectionService
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoConnectionService()
        {
            string connectionString = "mongodb+srv://pxk23480:Prash%4098490@cluster0.byhj77c.mongodb.net/"; 
            string databaseName = "OnlineGroceryStore"; 

            _client = new MongoClient(connectionString);
            _database = _client.GetDatabase(databaseName);
        }


        public async Task InsertDocumentAsync(string collectionName, BsonDocument document)
        {
            document.Remove("_id");
            var collection = _database.GetCollection<BsonDocument>(collectionName);
            collection.InsertOne(document);
        }
        public async Task UpdateDeliveryExecutiveAsync(BsonDocument document)
        {
            document.Remove("_id");
            var collection = _database.GetCollection<BsonDocument>("DeliveryExecutive");
            collection.InsertOne(document);
        }
        public async Task ApproveDeliveryExecutive(string email, int approve)
        {
            var updateDetails = Builders<BsonDocument>.Update.Set("isApprovedByAdmin", approve);
            var filter = "{ email: " + "\"" + email + "\"" + "}";
            var collection = _database.GetCollection<BsonDocument>("DeliveryExecutives");
            collection.UpdateOne(filter, updateDetails);
        }
        public async Task AddToCart( BsonDocument document)
        {
            document.Remove("_id");
            var collection = _database.GetCollection<BsonDocument>("Cart");
            collection.InsertOne(document);
        }
        public async Task AddProduct(BsonDocument document)
        {
            document.Remove("_id");
            var collection = _database.GetCollection<BsonDocument>("Products");
            collection.InsertOne(document);
        }

        public async Task AddCategory(BsonDocument document)
        {
            document.Remove("_id");
            var collection = _database.GetCollection<BsonDocument>("Categories");
            collection.InsertOne(document);
        }

        public List<GetCartModel> GetAllCartDetails(String UserEmail)
        {
            
            var filter = "{ CustomerEmail: " + "\"" + UserEmail + "\"" + "}";
            var collection = _database.GetCollection<GetCartModel>("Cart");
            var details = collection.Find<GetCartModel>(filter).ToList();
            foreach (var product in details)
            {
                product._id = product._id.ToString();
            }
            return details;
        }
        public List<DeliveryExecutives> GetAllExecutives()
        {

            var filter = Builders<DeliveryExecutives>.Filter.Empty;
            var collection = _database.GetCollection<DeliveryExecutives>("DeliveryExecutives");
            var details = collection.Find<DeliveryExecutives>(filter).ToList();
            foreach (var product in details)
            {
                product._id = product._id.ToString();
            }
            return details;
        }


        public async Task UpdateDocumentAsync(string collectionName, string filter, object document)
        {
            var collection = _database.GetCollection<BsonDocument>(collectionName);
            await collection.UpdateOneAsync(filter, document.ToBsonDocument());
        }

        public async Task UpdateDocumentsAsync(string collectionName, string filter, object document)
        {
            var collection = _database.GetCollection<BsonDocument>(collectionName);
            await collection.UpdateManyAsync(filter, document.ToBsonDocument());
        }
        public async Task UpdateCart(object id, int quantity)
        {
            var updateDetails = Builders<BsonDocument>.Update
                        .Set("Quantity", quantity);
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            var collection = _database.GetCollection<BsonDocument>("Cart");
            await collection.UpdateOneAsync(filter, updateDetails);
        }
        public async Task UpdateProductDetails(ProductsModelUpdate ProductDetails)
        {
            var updateDetails = Builders<BsonDocument>.Update
                        .Set("Availability", ProductDetails.Availability)
                        .Set("Price_Per_Each", ProductDetails.Price_Per_Each);


            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(ProductDetails._id));
            var collection = _database.GetCollection<BsonDocument>("Products");
            await collection.UpdateOneAsync(filter, updateDetails);
        }

        public async Task UpdateOrderStatus(string orderId,string status, string selectedDeliveryExcName, string selectedDeliveryExecPhone)
        {
            var updateDetails = Builders<BsonDocument>.Update
                            .Set("orderStatus", status)
                            .Set("selectedDeliveryExecutiveName", selectedDeliveryExcName)
                            .Set("selectedDeliveryExecutivePhoneNumber", selectedDeliveryExecPhone);
            var finalUpdateDetails = Builders<BsonDocument>.Update
                            .Set("orderDetails.orderStatus", status)
                            .Set("selectedDeliveryExecutiveName", selectedDeliveryExcName)
                            .Set("selectedDeliveryExecutivePhoneNumber", selectedDeliveryExecPhone);


            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(orderId));
            var collection = _database.GetCollection<BsonDocument>("Orders");
            await collection.UpdateOneAsync(filter, updateDetails);


            var finalfilter = Builders<BsonDocument>.Filter.Eq("orderId", orderId);
            var updatefinaltable = _database.GetCollection<BsonDocument>("FinalOrderDetails");
            await updatefinaltable.UpdateOneAsync(finalfilter, finalUpdateDetails);

        }

        public async Task GetDocumentsAsync(string collectionName, string filter)
        {
            var collection = _database.GetCollection<BsonDocument>(collectionName);
            await collection.FindAsync(filter);
        }
        public  String GetUserByUseremail(string useremail)
        {
            String CollectionName = "Customers";
            
            var filter = "{ email: " + "\"" +useremail + "\"" + "}";
            var details = _database.GetCollection<BsonDocument>("Customers").Find(filter).FirstOrDefault();
            if(details == null)
            {
                details = _database.GetCollection<BsonDocument>("Admins").Find(filter).FirstOrDefault();
                CollectionName = "Admins";
            }
            if(details == null)
            {
                details = _database.GetCollection<BsonDocument>("DeliveryExecutives").Find(filter).FirstOrDefault();
                CollectionName = "DeliveryExecutives";

            }

            if (details != null) {
                details["_id"] = details["_id"].ToString();
                details.Add("isAdmin", CollectionName == "Admins" ? true : false);
                details.Add("isCustomer", CollectionName == "Customers" ? true : false);
                details.Add("isDeliveryExec", CollectionName == "DeliveryExecutives" ? true : false);
                return details.ToString();
            }
            var result = new BsonDocument("error", "No Data Found");
            return result.ToString();

        }
        public List<ReturnedOrder> GetAllOrders()
        {
            var filter = Builders<ReturnedOrder>.Filter.Empty;
            var collection = _database.GetCollection<ReturnedOrder>("FinalOrderDetails").Find(filter).ToList();
            return collection;
        }

        public List<ReturnedOrder> GetAllCustomerOrders(string customerid)
        {
            var filter = Builders<ReturnedOrder>.Filter.Eq("orderDetails.customerId", customerid);
            var collection = _database.GetCollection<ReturnedOrder>("FinalOrderDetails").Find(filter).ToList();
            return collection;
        }

        public List<GetOrdersModel> GetAllDeliveredOrders(string deliveryExecutiveId)
        {
            var pipeline = new BsonDocument[]
       {
            BsonDocument.Parse(@"
            {
                $match: {
                    deliveryExecutiveId: '" + deliveryExecutiveId + @"'
                }
            }"),
            BsonDocument.Parse(@"
            {
                $lookup: {
                    from: 'Orders',
                    let: { orderId: '$orderId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$orderId']
                                }
                            }
                        }
                    ],
                    as: 'order'
                }
            }"),
            BsonDocument.Parse(@"
            {
                $unwind: '$order'
            }"),
            BsonDocument.Parse(@"
            {
                $match: {
                    'order.orderStatus': 'Delivered'
                }
            }"),
            BsonDocument.Parse(@"
            {
                $lookup: {
                    from: 'OrderDetails',
                    let: { orderId: '$orderId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$orderId', '$$orderId']
                                }
                            }
                        }
                    ],
                    as: 'orderDetails'
                }
            }"),
            BsonDocument.Parse(@"
            {
                $lookup: {
                    from: 'Products',
                    let: { productId: '$orderDetails.productId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$productId']
                                }
                            }
                        }
                    ],
                    as: 'product'
                }
            }"),
            BsonDocument.Parse(@"
            {
                $unwind: '$product'
            }"),
            BsonDocument.Parse(@"
            {
                $project: {
                    deliveryAddress: '$order.deliveryAddress',
                    deliveryType: '$order.deliveryType',
                    orderStatus: '$order.orderStatus',
                    productName: '$product.Name',
                    product_URL: '$product.Product_URL',
                    quantity: '$orderDetails.quantity',
                    pricePerQuantity: '$orderDetails.pricePerQuantity',
                    totalPrice: '$orderDetails.totalAmount'
                }
            }")
       };
            var collection = _database.GetCollection<GetOrdersModel>("DeliveryOrderDetails").Aggregate<GetOrdersModel>(pipeline).ToList();


            return collection;
        }

        public async Task RemoveFromCart(object id)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            var collection = _database.GetCollection<BsonDocument>("Cart");
            await collection.DeleteOneAsync(filter);
        }

        public List<Categories> GetAllCategories()
        {
            var filter = Builders<Categories>.Filter.Empty;
            var collection = _database.GetCollection<Categories>("Categories");
            var details = collection.Find<Categories>(filter).ToList();
            foreach (var product in details)
            {
                product._id = product._id.ToString();
            }
            return details;
        }


        public async Task UpdateCustomerDetails(string email, Customer updateDetails, string type)
        {
            var updateDetails1 = Builders<BsonDocument>.Update
                        .Set("name", updateDetails.name)
                        .Set("email", updateDetails.email)
                        .Set("password", updateDetails.password)
                        .Set("phoneNumber", updateDetails.phoneNumber);
                        
            var filter = "{ email: " + "\"" + email + "\"" + "}";
            var collection = _database.GetCollection<BsonDocument>(type);
            await collection.UpdateManyAsync(filter, updateDetails1);
        }

        public async Task PlaceOrder(PlaceOrder details,string useremail)
        {

            var document = details.orderDetails.ToBsonDocument();
            document.Remove("_id");

            var collection = _database.GetCollection<BsonDocument>("Orders");
            collection.InsertOne(document);
            var insertId = document["_id"].ToString();

            var filter = Builders<BsonDocument>.Filter.Empty;
            var Execuitves = _database.GetCollection<BsonDocument>("DeliveryExecutives").Find(filter).FirstOrDefault();
            var ExeId = Execuitves["_id"].ToString();
            var deliveryOrderDetails = new BsonDocument
                            {
                                { "OrderId", insertId },
                                { "deliveryExecutiveId", ExeId }
                            };
            _database.GetCollection<BsonDocument>("DeliveryOrderDetails").InsertOne(deliveryOrderDetails);
            List<BsonDocument> orderDetailsObject = new List<BsonDocument>();

            foreach(var orderDetails in details.cartDetails)
            {
                var _d = new OrderDetails()
                {
                    orderId = insertId,
                    ProductId = orderDetails.ProductId,
                    productName = orderDetails.Name,
                    quantity = orderDetails.Quantity,
                    pricePerQuantity = orderDetails.Price_Per_Each,
                    totalAmount = details.paymentDetails.amount

                };
                var _dd = _d.ToBsonDocument();
                _dd.Remove("_id");
                orderDetailsObject.Add(_dd);      
            }
            _database.GetCollection<BsonDocument>("OrderDetails").InsertMany(orderDetailsObject);
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("CustomerEmail", useremail);
            details.paymentDetails.orderId = insertId;
            var details1 = details.ToBsonDocument();
            details1.Add("orderId", insertId);
            _database.GetCollection<BsonDocument>("FinalOrderDetails").InsertOne(details1);
            _database.GetCollection<BsonDocument>("Cart").DeleteMany(deleteFilter);

            var paymentDocument = details.paymentDetails.ToBsonDocument();
            paymentDocument.Remove("_id");
            _database.GetCollection<BsonDocument>("Payments").InsertOne(paymentDocument);
            
           
        }
        public async Task UpdateDetails(string email, DeliveryExecutives updateDetails, string type)
        {
            var updateDetails1 = Builders<BsonDocument>.Update
                        .Set("name", updateDetails.name)
                        .Set("email", updateDetails.email)
                        .Set("password", updateDetails.password)
                        .Set("phoneNumber", updateDetails.phoneNumber)
                        .Set("accountNumber", updateDetails.accountNumber)
                        .Set("routingNumber", updateDetails.routingNumber);
            var filter = "{ email: " + "\"" + email + "\"" + "}";
            var collection = _database.GetCollection<BsonDocument>(type);
            await collection.UpdateOneAsync(filter, updateDetails1);

        }
        public BsonDocument GetCartDetails(String email)
        {
            var filter = "{ email: " + "\"" + email + "\"" + ", orderStatus:" + "\"In Cart\"" + "}";
            var collection = _database.GetCollection<BsonDocument>("Orders");
            var details = collection.FindAsync(filter).ToBsonDocument();
            return details;

        }
        public void GetDeliveredDetails(String email)
        {
            var ordersCollection = _database.GetCollection<Order>("Orders");
            var deliveryOrderDetailsCollection = _database.GetCollection<DeliveryExecutives>("DeliveryExecutives");
            var deliveryExecutivesCollection = _database.GetCollection<DeliveryDetails>("DeliveryOrderDetails");

            // Specify the delivery executive's email


            // Query to get delivered order details for a specific delivery executive
            //var filter = Builders<Order>.Filter.Eq("orderStatus", "Delivered");
            //var deliveredOrderDetails = ordersCollection.AsQueryable()
            //    .Join(deliveryOrderDetailsCollection.AsQueryable(),
            //        order => order._id,
            //        deliveryOrderDetail => deliveryOrderDetail.orderId,
            //        (order, deliveryOrderDetail) => new { order, deliveryOrderDetail })
            //    .Join(deliveryExecutivesCollection.AsQueryable(),
            //        combined => combined.deliveryOrderDetail.deliveryExecutiveId,
            //        deliveryExecutive => deliveryExecutive._id,
            //        (combined, deliveryExecutive) => new
            //        {
            //            OrderId = combined.order._id,
            //            DeliveryExecutiveName = deliveryExecutive.name,
            //            // Add more properties as needed
            //        })
            //    .Where(result => result.DeliveryExecutiveName == email)
            //    .ToList();






        }
        public List<ProductsModel> GetAllProducts()
        {
            var filter = Builders<ProductsModel>.Filter.Empty;
            var collection = _database.GetCollection<ProductsModel>("Products");
            var details = collection.Find<ProductsModel>(filter).ToList();
            foreach (var product in details)
            {
                product._id = product._id.ToString();
            }
            return details;
        }

        public List<ProductsModel> GetAllProductsByCategories(List<String> category)
        {
            var filter = Builders<ProductsModel>.Filter.In("Category", category);//"{ Category: " + "\"" + category + "\"" + "}";
            var collection = _database.GetCollection<ProductsModel>("Products");
            var details = collection.Find<ProductsModel>(filter).ToList();
            foreach (var product in details)
            {
                product._id = product._id.ToString();
            }
            return details;
        }



    }
}
