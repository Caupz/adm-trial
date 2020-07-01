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
        public static ProductList GetAllProducts(string filename)
        {
            string xmlLocation = AppDomain.CurrentDomain.BaseDirectory + "/App_Data/"+ filename;
            Type[] types = { typeof(ProductModel) };
            ProductList models = new ProductList();
            XmlSerializer serializer = new XmlSerializer(typeof(ProductList), types);

            FileStream fs = null;
            try
            {
                fs = new FileStream(xmlLocation, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                using (TextReader tr = new StreamReader(fs))
                {
                    fs = null;
                    models = (ProductList)serializer.Deserialize(tr);
                }
            }
            finally
            {
                if (fs != null)
                {
                    fs.Dispose();
                }
            }

            return models;
        }

        // GET: Product
        public ActionResult Index()
        {
            ProductList models = GetAllProducts("List.xml");
            return View(models);
        }

        // GET: Product/Details/PROD11
        public ActionResult Details(string id)
        {
            ProductList models = GetAllProducts("Detail.xml");
            ProductModel model = models.ProductModels.Where(p => (p.Id == id)).SingleOrDefault();
            return View(model);
        }
    }
}
