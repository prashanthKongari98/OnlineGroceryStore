namespace OnlineGrocery.Models
{
    public class ProductsModel
    {
        public object? _id { get; set; }
        public string Name { get; set; }   
        public string Price_Per_Each { get; set; }
        public string Category { get; set; }
        public string Product_URL { get; set; }
        public string? Availability { get; set; } = "Yes";


    }
    public class ProductsModelUpdate
    {
        public string? _id { get; set; }
        public string Name { get; set; }
        public string Price_Per_Each { get; set; }
        public string Category { get; set; }
        public string Product_URL { get; set; }
        public string? Availability { get; set; } = "Yes";


    }
    public class Categories
    {
        public object? _id { get; set; }
        public string categoryName { get; set; }

        public string isReturnable { get; set; }
    }
}
