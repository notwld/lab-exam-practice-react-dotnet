using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using StudentRegisteration.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace StudentRegisteration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public RegisterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("StudentConn")))
            {
                conn.Open();
                using (SqlCommand sc= new SqlCommand("r_getAll", conn))
                {
                    sc.CommandType = CommandType.StoredProcedure;
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    conn.Close();
                }

            }
            return new JsonResult(dt);
        }
        [HttpPost]
        public JsonResult Post(Registration reg)
        {
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("StudentConn")))
            {
                conn.Open();
                using (SqlCommand sc = new SqlCommand("r_Post", conn))
                {
                    sc.CommandType = CommandType.StoredProcedure;
                    sc.Parameters.AddWithValue("@SName", reg.SName);
                    sc.Parameters.AddWithValue("@NIC",reg.NIC);
                    sc.Parameters.AddWithValue("@PNumber",reg.PNumber);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    conn.Close();
                }

            }
            return new JsonResult("New Student Registered!");
        }
        [HttpPut]
        public JsonResult Put(Registration reg)
        {
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("StudentConn")))
            {
                conn.Open();
                using (SqlCommand sc = new SqlCommand("r_Update", conn))
                {
                    sc.CommandType = CommandType.StoredProcedure;
                    sc.Parameters.AddWithValue("@RId", reg.RId);
                    sc.Parameters.AddWithValue("@SName", reg.SName);
                    sc.Parameters.AddWithValue("@NIC", reg.NIC);
                    sc.Parameters.AddWithValue("@PNumber", reg.PNumber);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    conn.Close();
                }

            }
            return new JsonResult("New Student Updated!");
        }[HttpDelete]
        public JsonResult Delete(Registration reg)
        {
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("StudentConn")))
            {
                conn.Open();
                using (SqlCommand sc = new SqlCommand("r_Delete", conn))
                {
                    sc.CommandType = CommandType.StoredProcedure;
                    sc.Parameters.AddWithValue("@RId", reg.RId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    conn.Close();
                }

            }
            return new JsonResult("Student Deleted!");
        }
    }
}
