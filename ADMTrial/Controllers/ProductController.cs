using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Serialization;
using ADMTrial.Models;

namespace ADMTrial.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            string xmlLocation = AppDomain.CurrentDomain.BaseDirectory + "/App_Data/List.xml";
            Type[] types = { typeof(ProductModel) };
            ProductList models = new ProductList();
            XmlSerializer serializer = new XmlSerializer(typeof(ProductList), types);

            FileStream fs = new FileStream(xmlLocation, FileMode.Open);
            models = (ProductList)serializer.Deserialize(fs);

            return View(models);
        }

        // GET: Product/Details/5
        public ActionResult Details(int id)
        {
            // TODO
            return View();
        }
    }
}
