using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace ADMTrial.Models
{
    public class ProductModel
    {
        [XmlAttribute("id")]
        public string Id { get; set; }

        [XmlElement("Title")]
        public string Title { get; set; }

        [XmlElement("Description")]
        public string Description { get; set; }

        [XmlElement("Image")]
        public string Image { get; set; }

        private List<string> specs = new List<string>();

        [XmlArray("Specs")]
        [XmlArrayItem("Spec")]
        public List<string> Specs {
            get {
                return specs;
            }
            set {
                if(value != null)
                {
                    specs = value;
                }
            }
        }

        [XmlElement("Availability")]
        public string Availability { get; set; }

        [XmlElement("Price")]
        public double Price { get; set; }

        [XmlElement("Popular")]
        public int Popularity { get; set; }
    }
}