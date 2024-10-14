namespace OnlineGrocery.Models
{
    public class UpdateDetialsModel
    {
        public string filter { get; set; }
        public DeliveryExecutives? updateData { get; set; }
        public Customer? updateCustomer { get; set; }
        
        public string? role { get; set; }
    }
    public class DeliveryDetails
    {
        public object? _id { get; set; }
        public string orderId { set; get; }
        public string deliveryExecutiveId { set; get; }
    }
    public class Order
    {
        public object _id { get; set; }
        public string customerId { get; set; }
        public string orderDate { get; set; }
        public string deliveryAddress { get; set; }
        public string orderStatus { get; set; }
    }

   
}
