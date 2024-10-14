namespace OnlineGrocery.Models
{
    public class CartModel
    {
        public string? _id { get; set; }
        public string Name { get; set; }

        public string Price_Per_Each { get; set; }
        public string Category { get; set; }
        public string Product_URL { get; set; }
        public string CustomerEmail { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
    public class GetCartModel
    {
        public object? _id { get; set; }
        public string Name { get; set; }
        public string Price_Per_Each { get; set; }
        public string Category { get; set; }
        public string Product_URL { get; set; }
        public string CustomerEmail { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }

}
