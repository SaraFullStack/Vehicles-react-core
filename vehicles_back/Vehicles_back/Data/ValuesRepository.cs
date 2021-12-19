using Microsoft.AspNetCore.Cors;
using MySql.Data.MySqlClient;
using System.Globalization;
using Vehicles_back.Models;

namespace Vehicles_back.Data
{
    [EnableCors("*")]
    public class ValuesRepository
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValuesRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration["ConnectionStrings:con"];
        }

        public async Task<List<Vehicle>> GetAll()
        {
            using (MySqlConnection con = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("SELECT orderNum, vin, model, card, delivery FROM db.vehicle", con))
                {
                    var response = new List<Vehicle>();
                    await con.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToValue(reader));
                        }
                    }
                    con.Close();
                    return response;
                }
            }
        }

        public async Task<Vehicle?> GetId(int order)
        {
            using (MySqlConnection con = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand($"SELECT orderNum, vin, model, card, delivery FROM db.vehicle Where orderNum = {order}", con))
                {
                    await con.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            return MapToValue(reader);
                        }
                    }
                    cmd.Dispose();
                    con.Close();
                    return null;
                }
            }
        }

        private Vehicle MapToValue(System.Data.Common.DbDataReader reader)
        {
            return new Vehicle()
            {
                Order = (int)reader["ordernum"],
                Vin = reader["vin"].ToString(),
                Model = reader["model"].ToString(),
                Card = reader["card"].ToString(),
                Delivery = Convert.ToDateTime(reader["delivery"], CultureInfo.InvariantCulture)
            };
        }
        
        public void Insert(VehicleDto vehicle )
        {
            using (MySqlConnection con = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("INSERT INTO db.vehicle ( vin, model, card, delivery) VALUES ( @vin, @model, @card, @delivery)", con))
                {
                    cmd.Parameters.Add(new MySqlParameter("@vin", vehicle.Vin));
                    cmd.Parameters.Add(new MySqlParameter("@model", vehicle.Model));
                    cmd.Parameters.Add(new MySqlParameter("@card", vehicle.Card));
                    cmd.Parameters.Add(new MySqlParameter("@delivery", vehicle.Delivery));
                    con.Open();
                    cmd.ExecuteNonQuery();
                    cmd.Dispose();
                    con.Close();
                }
            }
        }

        public void Update(int order, VehicleDto vehicle)
        {
            using (MySqlConnection con = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("UPDATE db.vehicle SET vin = @vin, model = @model, card = @card, delivery = @delivery WHERE orderNum = @orderNum", con))
                {
                    cmd.Parameters.Add(new MySqlParameter("@vin", vehicle.Vin));
                    cmd.Parameters.Add(new MySqlParameter("@model", vehicle.Model));
                    cmd.Parameters.Add(new MySqlParameter("@card", vehicle.Card));
                    cmd.Parameters.Add(new MySqlParameter("@delivery", vehicle.Delivery));
                    cmd.Parameters.Add(new MySqlParameter("@orderNum", order));
                    con.OpenAsync();
                    cmd.ExecuteNonQuery();
                    cmd.Dispose();
                    con.Close();
                }
            }
        }

        public void Delete( int order)
        {
            using (MySqlConnection con = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("DELETE FROM db.vehicle WHERE orderNum = @orderNum", con))
                {
                    cmd.Parameters.Add(new MySqlParameter("@orderNum", order));
                    con.OpenAsync();
                    cmd.ExecuteNonQuery();
                    cmd.Dispose();
                    con.Close();
                }
            }
        }
    }
 }
