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
        public string id { get; set; }

        [XmlElement("Title")]
        public string title { get; set; }

        [XmlElement("Description")]
        public string description { get; set; }

        [XmlElement("Image")]
        public string image { get; set; }

        [XmlElement("Specs")]
        public List<string> specs { get; set; }

        [XmlElement("Availability")]
        public string availability { get; set; }

        [XmlElement("Price")]
        public double price { get; set; }

        [XmlElement("Popular")]
        public int popularity { get; set; }
    }
}