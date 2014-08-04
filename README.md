JDate
=====

A Jalali to Gregorian converter in Java-script with support of formatting output

## Usage

The prefered way of using the lib is throw `componentjs`, but you can also use it with adding the script to your webpage. Just grab the minified or full version of lib from [build directory](https://github.com/arashm/JDate/tree/master/build) and use it as usual:

```html
<head>
  <script src="jdate.js" type="text/javascript" charset="utf-8"></script>
  // <script src="jdate.min.js" type="text/javascript" charset="utf-8"></script>
</head>
```

### API

```javascript
var JDate = require('jdate');
jdate = new JDate;
jdate.date //=> [1393,5,13] An Array of Jalali Date
jdate._d // => Gregorian Date Object

// Getters
jdate.getFullYear() // => 1393
jdate.getMonth() // => 5
jdate.getDate() // => 13
jdate.getDay() // => 1

// Setters
jdate.setFullYear(1394)
jdate.setMonth(6)
jdate.setDate(12)

// Formatting output
jdate.format('dddd DD MMMM YYYY') // => پنج‌شنبه 12 شهریور 1394

// Static functions
JDate.isLeapYear(1393) // => false
JDate.daysInMonth(1393, 5) // => 31
JDate.to_gregorian(1393,12,11) // => Gregorian Date object
JDate.to_jalali(new Date) // => JDate object
```

## Formatting output
Use `format()` and following conversion identifiers as follows:

```javascript
date.format('dddd DD MMMM YYYY') //=> دوشنبه 6 امرداد 1393
```

The conversion identifiers are as follows:

| Identifier        | Description           | Example  |
| ------------- | ------------- | ---------- |
| `YYY` or `YYYY`      | Full Year (4 digits) | 1393 |
| `YY`      | Year (2 digits)      |   93 |
| `M` or `MM` | Month in number      |  returns `5` for `امرداد`   |
| `MMM` or `MMMM` | Month in string | `امرداد` |
| `D` or `DD` | Day in number | 26 |
| `d` or `dd` | Abbreviation of day name in string | `۱ش` (for یکشنبه) |
| `ddd` or `dddd` | Full day name in string | `یکشنبه` |


## Contribute

Report bugs and suggest feature in [issue tracker](https://github.com/arashm/Jalali-Calendar/issues). Feel free to `Fork` and send `Pull Requests`.

## License

[MIT](https://github.com/arashm/Jalali-Calendar/blob/master/LICENSE)
