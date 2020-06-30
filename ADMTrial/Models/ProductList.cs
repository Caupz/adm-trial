using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace ADMTrial.Models
{
    [XmlRoot("Store")]
    [XmlInclude(typeof(ProductModel))]
    public class ProductList
    {
        [XmlArray("Products")]
        [XmlArrayItem("Product")]
        public List<ProductModel> ProductModels = new List<ProductModel>();
        
        public ProductList() { }

        public void AddProductModel(ProductModel Model)
        {
            ProductModels.Add(Model);
        }
    }
}