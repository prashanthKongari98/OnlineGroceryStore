namespace OnlineGrocery.Models
{
    public class OrdersModel
    {
        public object? Id { get; set; }
        public string? customerId { get; set; }
        public string? orderDate { get; set; } = DateTime.Now.ToString();
        
        public string? deliveryAddress {get;set; }
        public string deliveryType { get; set; } 
        public string orderStatus { get; set; }

    }
    public class GetOrdersModel
    {
        
        public string orderDate { get; set; }
        public string? deliveryAddress { get; set; }
        public string deliveryType { get; set; }
        public string orderStatus { get; set; }
        public string productName { get; set; }
        public string product_URL { get; set; }
        public int quantity { get; set; }
        public string pricePerQuantity { get; set; }
        public string totalPrice { get; set; }

    }
    public class UpdateOrderStatus
    {
        
        public string orderId { get; set; }
        public string orderStatus { get; set; }

        public string? selectedDeliveryExecutiveName { get; set; }

        public string? selectedDeliveryExecutivePhoneNumber { get; set; }
    }

    public class OrderDetails
    {
        public object? _id { get; set; }
        public string orderId { get; set; }
        public string productName { get; set; }
        public string ProductId { get; set; }
        public int quantity { get; set; }
        public string pricePerQuantity { get; set; }
        public string totalAmount { get; set; }
    }

    public class PlaceOrder
    {
        public OrdersModel orderDetails { get; set; }
        public List<CartModel> cartDetails { get; set; }

        public PaymentsModel paymentDetails { get; set; }
    }
    public class ReturnedOrder
    {
        public object? _id { get; set; }
        public OrdersModel orderDetails { get; set; }
        public List<CartModel> cartDetails { get; set; }

        public PaymentsModel paymentDetails { get; set; }

        public string orderId { get; set; }



        public string? selectedDeliveryExecutiveName { get; set; }

        public string? selectedDeliveryExecutivePhoneNumber { get; set; }
    }


}
