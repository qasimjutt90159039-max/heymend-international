// Heymand International - Leather Goods Manufacturer Configuration & Business Details

export interface SiteConfig {
  businessName: string;
  shortName: string;
  tagline: string;
  category: string;
  contactNumber: string;
  phoneRaw: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    landmark: string;
    mohalla: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    plusCode: string;
    googleMapsLink: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    sunday: string;
  };
  currency: string;
  freeShippingThreshold: number; // in PKR
  shippingRates: {
    standard: number;
    expressMultan: number;
    storePickup: number;
  };
  announcementText: string;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  operatingHours: {
    weekdays: string;
    sunday: string;
    display: string;
  };
}

export const siteConfig: SiteConfig = {
  businessName: 'Heymand International',
  shortName: 'Heymand',
  tagline: 'Premium Leather Goods, Crafted for the World',
  category: 'Leather Goods Manufacturer',
  contactNumber: '03226685582',
  phoneRaw: '03226685582',
  phoneFormatted: '+92 322 6685582',
  whatsappNumber: '923226685582',
  email: 'info@heymandinternational.com',
  address: {
    street: 'Tareen Rd',
    landmark: 'near DCS Office',
    mohalla: 'Mohalla Qadirabad',
    city: 'Multan',
    province: 'Punjab',
    postalCode: '60000',
    country: 'Pakistan',
    fullAddress: 'Tareen Rd, near DCS Office, Mohalla Qadirabad, Multan, 60000, Pakistan',
    plusCode: '6F87+V2 Multan, Pakistan',
    googleMapsLink: 'https://maps.google.com/?q=Tareen+Rd+near+DCS+Office+Mohalla+Qadirabad+Multan+Pakistan'
  },
  geo: {
    lat: 30.1983,
    lng: 71.4687
  },
  hours: {
    weekdays: '09:00 AM – 08:00 PM (Mon – Sat)',
    sunday: 'Closed / By B2B Appointment'
  },
  currency: 'PKR',
  freeShippingThreshold: 5000,
  shippingRates: {
    standard: 250,
    expressMultan: 350,
    storePickup: 0
  },
  announcementText: 'Premium Leather Goods Manufacturing • Multan, Pakistan',
  bankDetails: {
    bankName: 'Meezan Bank Limited',
    accountTitle: 'Heymand International Commercial Account',
    accountNumber: '0281-0108876421',
    iban: 'PK14MEZN0002810108876421',
    branch: 'Qadirabad / Tareen Road Branch, Multan'
  },
  socialLinks: {
    facebook: 'https://facebook.com/heymandinternational',
    instagram: 'https://instagram.com/heymandinternational',
    linkedin: 'https://linkedin.com/company/heymand-international'
  },
  openingHours: {
    weekdays: '09:00 AM – 08:00 PM (Mon – Sat)',
    sunday: 'Closed / By B2B Appointment'
  },
  operatingHours: {
    weekdays: '09:00 AM – 08:00 PM (Mon – Sat)',
    sunday: 'Closed / By B2B Appointment',
    display: 'Mon - Sat: 9:00 AM - 8:00 PM (PKT)'
  }
};

export const getWhatsAppLink = (message?: string): string => {
  const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(
    message || 'Hello Heymand International, I would like to inquire about your leather manufacturing, custom products, and B2B wholesale catalog.'
  );
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
};

export const getWhatsAppUrl = getWhatsAppLink;

export const formatPKR = (amount: number): string => {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
};
