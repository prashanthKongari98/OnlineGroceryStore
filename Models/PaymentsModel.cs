namespace OnlineGrocery.Models
{
    public class PaymentsModel
    {
        public object? _id { get; set; }
        public string? orderId { get; set; } 
        public string paymentMethod { get; set; }
        public string amount { get; set; }
        public string? paymentDate { get; set; } = DateTime.Now.ToString();
        public string CustomerId { get; set; }
        public string CardHolderName { get; set; }
        public string CustomerName { get; set;}
        public string CardNumber { get;set; }
        public int Cvv { get; set; }
        public string expiryDate { get; set; }

    }
}
