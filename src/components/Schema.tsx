export default function Schema() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://reasons.edu.np/#organization",
      "name": "Reason Education Consultancy",
      "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200&h=630",
      "logo": "https://reasons.edu.np/logo/NEW.png",
      "url": "https://reasons.edu.np",
      "telephone": "+977-15316680",
      "email": "info@reasons.edu.np",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "New Baneshwor, Indreni Complex",
        "addressLocality": "Kathmandu",
        "postalCode": "44600",
        "addressCountry": {
          "@type": "Country",
          "name": "Nepal"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.6915,
        "longitude": 85.3331
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "10:00",
          "closes": "17:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/ReasonEducationNepal",
        "https://www.instagram.com/reasoneducation",
        "https://www.linkedin.com/company/reason-education-consultancy",
        "https://twitter.com/reasoneducation"
      ],
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Nepal"
      },
      "serviceType": ["Education Consultancy", "Study Abroad Services", "IELTS Training", "Visa Assistance"],
      "description": "Leading study abroad consultancy in Nepal helping students achieve their dreams of global education.",
      "foundingDate": "2015",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "25"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://reasons.edu.np/#website",
      "url": "https://reasons.edu.np",
      "name": "Reason Education Consultancy",
      "publisher": {
        "@id": "https://reasons.edu.np/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Education Consultancy",
      "provider": {
        "@id": "https://reasons.edu.np/#organization"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "United States"
        },
        {
          "@type": "Country",
          "name": "Canada"
        },
        {
          "@type": "Country",
          "name": "United Kingdom"
        },
        {
          "@type": "Country",
          "name": "Australia"
        },
        {
          "@type": "Country",
          "name": "New Zealand"
        },
        {
          "@type": "Country",
          "name": "Japan"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Education Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Study Abroad Counseling"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IELTS Training"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Visa Assistance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PTE Preparation"
            }
          }
        ]
      }
    }
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}