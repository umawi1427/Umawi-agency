import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const apiKey = 'ed1304843962073c5e2bc08f';
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  const currencyNames = {
    USD: 'United States Dollar',
    EUR: 'Euro',
    GBP: 'British Pound Sterling',
    AED: 'United Arab Emirates Dirham',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
    ANG: 'Netherlands Antillean Guilder',
    AOA: 'Angolan Kwanza',
    ARS: 'Argentine Peso',
    AUD: 'Australian Dollar',
    AWG: 'Aruban Florin',
    AZN: 'Azerbaijani Manat',
    BAM: 'Bosnia-Herzegovina Convertible Mark',
    BBD: 'Barbadian Dollar',
    BDT: 'Bangladeshi Taka',
    BGN: 'Bulgarian Lev',
    BHD: 'Bahraini Dinar',
    BIF: 'Burundian Franc',
    BMD: 'Bermudian Dollar',
    BND: 'Brunei Dollar',
    BOB: 'Bolivian Boliviano',
    BRL: 'Brazilian Real',
    BSD: 'Bahamian Dollar',
    BTN: 'Bhutanese Ngultrum',
    BWP: 'Botswana Pula',
    BYN: 'Belarusian Ruble',
    BZD: 'Belize Dollar',
    CAD: 'Canadian Dollar',
    CDF: 'Congolese Franc',
    CHF: 'Swiss Franc',
    CLP: 'Chilean Peso',
    CNY: 'Chinese Yuan',
    COP: 'Colombian Peso',
    CRC: 'Costa Rican Colón',
    CUP: 'Cuban Peso',
    CVE: 'Cape Verdean Escudo',
    CZK: 'Czech Koruna',
    DJF: 'Djiboutian Franc',
    DKK: 'Danish Krone',
    DOP: 'Dominican Peso',
    DZD: 'Algerian Dinar',
    EGP: 'Egyptian Pound',
    ERN: 'Eritrean Nakfa',
    ETB: 'Ethiopian Birr',
    FJD: 'Fijian Dollar',
    FKP: 'Falkland Islands Pound',
    FOK: 'Faroese Króna',
    GEL: 'Georgian Lari',
    GGP: 'Guernsey Pound',
    GHS: 'Ghanaian Cedi',
    GIP: 'Gibraltar Pound',
    GMD: 'Gambian Dalasi',
    GNF: 'Guinean Franc',
    GTQ: 'Guatemalan Quetzal',
    GYD: 'Guyanese Dollar',
    HKD: 'Hong Kong Dollar',
    HNL: 'Honduran Lempira',
    HRK: 'Croatian Kuna',
    HTG: 'Haitian Gourde',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Shekel',
    IMP: 'Isle of Man Pound',
    INR: 'Indian Rupee',
    IQD: 'Iraqi Dinar',
    IRR: 'Iranian Rial',
    ISK: 'Icelandic Króna',
    JEP: 'Jersey Pound',
    JMD: 'Jamaican Dollar',
    JOD: 'Jordanian Dinar',
    JPY: 'Japanese Yen',
    KES: 'Kenyan Shilling',
    KGS: 'Kyrgyzstani Som',
    KHR: 'Cambodian Riel',
    KID: 'Kiribati Dollar',
    KMF: 'Comorian Franc',
    KRW: 'South Korean Won',
    KWD: 'Kuwaiti Dinar',
    KYD: 'Cayman Islands Dollar',
    KZT: 'Kazakhstani Tenge',
    LAK: 'Lao Kip',
    LBP: 'Lebanese Pound',
    LKR: 'Sri Lankan Rupee',
    LRD: 'Liberian Dollar',
    LSL: 'Lesotho Loti',
    LYD: 'Libyan Dinar',
    MAD: 'Moroccan Dirham',
    MDL: 'Moldovan Leu',
    MGA: 'Malagasy Ariary',
    MKD: 'Macedonian Denar',
    MMK: 'Myanmar Kyat',
    MNT: 'Mongolian Tögrög',
    MOP: 'Macanese Pataca',
    MRU: 'Mauritanian Ouguiya',
    MUR: 'Mauritian Rupee',
    MVR: 'Maldivian Rufiyaa',
    MWK: 'Malawian Kwacha',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    MZN: 'Mozambican Metical',
    NAD: 'Namibian Dollar',
    NGN: 'Nigerian Naira',
    NIO: 'Nicaraguan Córdoba',
    NOK: 'Norwegian Krone',
    NPR: 'Nepalese Rupee',
    NZD: 'New Zealand Dollar',
    OMR: 'Omani Rial',
    PAB: 'Panamanian Balboa',
    PEN: 'Peruvian Sol',
    PGK: 'Papua New Guinean Kina',
    PHP: 'Philippine Peso',
    PKR: 'Pakistani Rupee',
    PLN: 'Polish Złoty',
    PYG: 'Paraguayan Guarani',
    QAR: 'Qatari Riyal',
    RON: 'Romanian Leu',
    RSD: 'Serbian Dinar',
    RUB: 'Russian Ruble',
    RWF: 'Rwandan Franc',
    SAR: 'Saudi Riyal',
    SBD: 'Solomon Islands Dollar',
    SCR: 'Seychellois Rupee',
    SDG: 'Sudanese Pound',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    SHP: 'Saint Helena Pound',
    SLL: 'Sierra Leonean Leone',
    SOS: 'Somali Shilling',
    SRD: 'Surinamese Dollar',
    SSP: 'South Sudanese Pound',
    STN: 'São Tomé and Príncipe Dobra',
    SYP: 'Syrian Pound',
    SZL: 'Eswatini Lilangeni',
    THB: 'Thai Baht',
    TJS: 'Tajikistani Somoni',
    TMT: 'Turkmenistani Manat',
    TND: 'Tunisian Dinar',
    TOP: 'Tongan Paʻanga',
    TRY: 'Turkish Lira',
    TTD: 'Trinidad and Tobago Dollar',
    TVD: 'Tuvaluan Dollar',
    TWD: 'New Taiwan Dollar',
    TZS: 'Tanzanian Shilling',
    UAH: 'Ukrainian Hryvnia',
    UGX: 'Ugandan Shilling',
    UYU: 'Uruguayan Peso',
    UZS: 'Uzbekistani Soʻm',
    VES: 'Venezuelan Bolívar',
    VND: 'Vietnamese đồng',
    VUV: 'Vanuatu Vatu',
    WST: 'Samoan Tala',
    XAF: 'Central African CFA Franc',
    XCD: 'East Caribbean Dollar',
    XOF: 'West African CFA Franc',
    XPF: 'CFP Franc',
    YER: 'Yemeni Rial',
    ZAR: 'South African Rand',
    ZMW: 'Zambian Kwacha',
    ZWL: 'Zimbabwean Dollar',
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(apiUrl);
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchRates();
  }, [fromCurrency, apiUrl]);

  const handleConvert = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      setAmount(value);
      if (rates[toCurrency]) {
        const result = value * rates[toCurrency];
        setConvertedAmount(result.toFixed(2));
      }
    } else if (name === 'convertedAmount') {
      setConvertedAmount(value);
      if (rates[toCurrency]) {
        const result = value / rates[toCurrency];
        setAmount(result.toFixed(2));
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-10">
          <div className="card p-4 shadow">
            <h1 className="mt-4 mb-4">Currency Converter</h1>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Amount ({fromCurrency} - {currencyNames[fromCurrency]}):</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={amount}
                    onChange={handleConvert}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>From:</label>
                  <select
                    className="form-control"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency} - {currencyNames[currency]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Converted Amount ({toCurrency} - {currencyNames[toCurrency]}):</label>
                  <input
                    type="number"
                    className="form-control"
                    name="convertedAmount"
                    value={convertedAmount || ''}
                    onChange={handleConvert}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>To:</label>
                  <select
                    className="form-control"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency} - {currencyNames[currency]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CurrencyConverter;