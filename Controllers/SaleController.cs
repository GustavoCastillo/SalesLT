using Newtonsoft.Json.Linq;
using SalesLT.dbData;
using SalesLT.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SalesLT.Controllers
{
    public class SaleController : ApiController
    {


        private prodigiousEntities db = new prodigiousEntities();

        // GET api/values
        public IHttpActionResult   GetProducts()
        {
            var products = from b in db.Products
                        select b;

            return Json(products);
        }

        // GET api/values/5
        public IHttpActionResult GetProduct(int id)
        {
            
            var product = db.Products.Where(x => x.ProductID == id);
            if (product == null)
            {
                return NotFound();
            }
            return Json(product);
        }



        // POST api/values
        public IHttpActionResult Product(Product product)
        {
            try
            {
                product.rowguid = Guid.NewGuid();
                product.ModifiedDate = DateTime.Now;

                    db.Products.Add(product);
                    db.SaveChanges();
                    return CreatedAtRoute("DefaultApi", new { id = product.ProductID }, product);

            }
            catch (Exception ex)
            {
                return BadRequest(ModelState);
            }
           
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, Product product)
        {
            product.ProductID = id;
            product.ModifiedDate = DateTime.Now;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductID)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductID == id) > 0;
        }

    }


}