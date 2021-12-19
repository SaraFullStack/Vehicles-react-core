namespace Vehicles_back.Models
{
    public class Vehicle
    {
        public int Order { get; set; }
        public string Vin { get; set; }
        public string Model { get; set; }
        public string Card { get; set; }
        public DateTime Delivery { get; set; }
    }
}
