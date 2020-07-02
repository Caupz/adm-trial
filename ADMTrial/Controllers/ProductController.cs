using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using System.Xml.Schema;
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
            string listFileSource = System.IO.File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "/App_Data/List.xml");
            string detailsFileSource = System.IO.File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "/App_Data/Detail.xml");
            IEnumerable<XElement> listXmlElements = XElement.Parse(listFileSource).Element("Products").Elements("Product");
            IEnumerable<XElement> detailXmlElements = XElement.Parse(detailsFileSource).Element("Products").Elements("Product");

            XElement result = new XElement("Store", new XElement("Products",
                          from product in listXmlElements.Where(e => e.Attribute("id").Value.ToString() == id)
                          join detailProduct in detailXmlElements
                          on (string)product.Attribute("id") equals (string)detailProduct.Attribute("id")
                          select new XElement("Product", product.Descendants(), detailProduct.Descendants())));

            ProductList productList;
            XmlSerializer serializer = new XmlSerializer(typeof(ProductList));

            using (StringReader stringReader = new StringReader(result.ToString()))
            {
                productList = (ProductList)serializer.Deserialize(stringReader);
            }

            ProductModel model = productList.ProductModels.FirstOrDefault();

            if(model == null) // NOTE (Caupo 02.07.2020): This occurs randomly sometimes for unknown reasons when starting the application.
            {
                throw new Exception("Page not found");
            }

            return View(model);
        }

        // GET: Product/GetAvailability/PROD11
        [HttpPost]
        public ActionResult GetAvailability(string id)
        {
            ProductList models = GetAllProducts("Detail.xml");
            ProductModel model = models.ProductModels.Where(p => (p.Id == id)).FirstOrDefault();
            return Json(new { availability = model.Availability });
        }
    }
}
